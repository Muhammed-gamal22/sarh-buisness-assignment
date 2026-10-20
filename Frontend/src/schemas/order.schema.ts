
import { z } from "zod";

export const orderStatuses = [
    "pending",
    "processing",
    "completed",
    "cancelled",
] as const;

export const createOrderSchema = z.object({
    customerName: z
        .string()
        .trim()
        .min(2, "Customer name must be at least 2 characters")
        .max(100, "Customer name cannot exceed 100 characters"),

    customerEmail: z
        .string()
        .trim()
        .email("Please provide a valid email address")
        .max(254, "Email cannot exceed 254 characters"),

    items: z
        .array(
            z.object({
                productName: z
                    .string()
                    .trim()
                    .min(1, "Product name is required")
                    .max(100, "Product name cannot exceed 100 characters"),

                quantity: z
                    .number()
                    .int("Quantity must be an integer")
                    .min(1, "Quantity must be at least 1")
                    .max(10000, "Quantity is too large"),

                unitPrice: z
                    .number()
                    .finite()
                    .min(0, "Unit price cannot be negative"),
            })
        )
        .min(1, "An order must contain at least one item")
        .max(100, "An order cannot contain more than 100 items"),
});

export const getOrdersSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20),

    search: z.string().trim().max(100).optional(),

    status: z.enum(orderStatuses).optional(),

    sortBy: z.enum(["createdAt", "amount"]).default("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateOrderFormValues = z.input<
    typeof createOrderSchema
>;

export type CreateOrderInput = z.output<
    typeof createOrderSchema
>;

export type GetOrdersInput = z.output<
    typeof getOrdersSchema
>;

export type OrderStatus = (typeof orderStatuses)[number];
