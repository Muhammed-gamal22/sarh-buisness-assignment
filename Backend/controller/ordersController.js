const catchAsync = require("../utils/catchAsync");
const Order = require("../models/Order");
const AppError = require("../utils/appError");
const { getOrdersSchema } = require("../validations/order.validation")



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


exports.createOrder = catchAsync(async (req, res) => {

    const order = await Order.create(req.body);
    res.status(201).json({
        status: "success",
        order,
    });
});
