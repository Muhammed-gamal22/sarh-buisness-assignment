const catchAsync = require("../utils/catchAsync");
const Order = require("../models/Order");
const AppError = require("../utils/appError");
const { getOrdersSchema, createOrderSchema } = require("../validations/order.validation")
const crypto = require("crypto");


exports.getOrders = catchAsync(async (req, res, next) => {
    const result = getOrdersSchema.safeParse(req.query);

    if (!result.success) {
        return next(
            new AppError(
                JSON.stringify(result.error.issues),
                400
            )
        );
    }

    const {
        page,
        limit,
        search,
        status,
        sortBy,
        sortOrder,
    } = result.data;

    const queryObj = {};

    if (status) {
        queryObj.status = status;
    }

    if (search) {
        const escapedSearch = search.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        queryObj.$or = [
            {
                customerName: {
                    $regex: escapedSearch,
                    $options: "i",
                },
            },
            {
                customerEmail: {
                    $regex: escapedSearch,
                    $options: "i",
                },
            },
        ];
    }

    const skip = (page - 1) * limit;

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const sortObj = {
        [sortBy]: sortDirection,
        _id: sortDirection,
    };

    const [orders, allOrders] = await Promise.all([
        Order.find(queryObj)
            .sort(sortObj)
            .skip(skip)
            .limit(limit),

        Order.countDocuments(queryObj),
    ]);

    const totalPages = Math.ceil(allOrders / limit);

    return res.status(200).json({
        status: "success",
        orders,
        allOrders,
        page,
        pages: totalPages,
    });
});






exports.createOrder = catchAsync(async (req, res, next) => {
    const result = createOrderSchema.safeParse(req.body);
    if (!result.success) {
        return next(
            new AppError(
                JSON.stringify(result.error.issues),
                400
            )
        );
    }
    const { customerName, customerEmail, items } = result.data;
    const key = req.get("Idempotency-Key");

    if (!key || key.length > 255) {
        return next(
            new AppError("A valid Idempotency-Key is required", 400)
        );
    }

    const requestHash = crypto
        .createHash("sha256")
        .update(JSON.stringify({
            customerName,
            customerEmail,
            items,
        }))
        .digest("hex");

    const existingOrder = await Order.findOne({
        idempotencyKey: key,
    });

    if (existingOrder) {
        if (existingOrder.idempotencyHash !== requestHash) {
            return next(
                new AppError("Idempotency key reused with different data", 409)
            );
        }

        return res.status(201).json({
            status: "success",
            data: { order: existingOrder },
        });
    }

    const amount = items.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0
    );

    try {
        const order = await Order.create({
            customerName,
            customerEmail,
            items,
            amount,
            idempotencyKey: key,
            idempotencyHash: requestHash,
        });

        return res.status(201).json({
            status: "success",
            data: { order },
        });
    } catch (error) {
        if (error.code !== 11000) {
            throw error;
        }

        const duplicate = await Order.findOne({
            idempotencyKey: key,
        });

        if (!duplicate) {
            throw error;
        }

        if (duplicate.idempotencyHash !== requestHash) {
            return next(
                new AppError("Idempotency key reused with different data", 409)
            );
        }

        return res.status(201).json({
            status: "success",
            data: { order: duplicate },
        });
    }
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return next(new AppError("No order found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: order,
    });
});
