
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const orderItemSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 150,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be an integer",
            },
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const orderSchema = new Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 120,
            index: true,
        },
        customerEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 254,
            index: true,
        },
        status: {
            type: String,
            enum: ["pending", "processing", "completed", "cancelled"],
            default: "pending",
            required: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (items) =>
                    items.length >= 1 && items.length <= 5,
                message: "An order must contain between 1 and 5 items",
            },
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        idempotencyKey: {
            type: String,
            default: undefined,
        },

        idempotencyHash: {
            type: String,
            default: undefined,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
orderSchema.index(
    { idempotencyKey: 1 },
    {
        unique: true,
        partialFilterExpression: {
            idempotencyKey: { $type: "string" },
        },
    }
);
orderSchema.index({ createdAt: -1, _id: -1 });
orderSchema.index({ amount: -1, _id: -1 });
orderSchema.index({ status: 1, createdAt: -1, _id: -1 });
orderSchema.index({ status: 1, amount: -1, _id: -1 });

const Order = models.Order || model("Order", orderSchema);
module.exports = Order;
