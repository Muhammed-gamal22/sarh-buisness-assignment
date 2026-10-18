
const { faker } = require("@faker-js/faker");
const Order = require("../models/Order");
const connectDB = require("../utils/db");
const TOTAL_ORDERS = 50_000;
const BATCH_SIZE = 1_000;

const statuses = [
    "pending",
    "processing",
    "completed",
    "cancelled",
];

const products = [
    "Wireless Keyboard",
    "Gaming Mouse",
    "USB-C Hub",
    "Laptop Stand",
    "Mechanical Keyboard",
    "Webcam",
    "Headphones",
    "Monitor",
    "USB Cable",
    "Power Bank",
    "Mouse Pad",
    "Bluetooth Speaker",
];

function generateOrder() {
    const itemCount = faker.number.int({ min: 1, max: 5 });

    const items = Array.from({ length: itemCount }, () => ({
        productName: faker.helpers.arrayElement(products),
        quantity: faker.number.int({ min: 1, max: 5 }),
        unitPrice: faker.number.int({
            min: 100,
            max: 10_000,
        }),
    }));

    const amount = items.reduce(
        (total, item) => total + item.quantity * item.unitPrice,
        0
    );

    const createdAt = faker.date.between({
        from: new Date("2025-01-01T00:00:00.000Z"),
        to: new Date(),
    });

    return {
        customerName: faker.person.fullName(),
        customerEmail: faker.internet.email().toLowerCase(),
        status: faker.helpers.arrayElement(statuses),
        items,
        amount,
        createdAt,
        updatedAt: createdAt,
    };
}

async function seedOrders() {
    await connectDB();
    const initialCount = await Order.countDocuments();
    let insertedCount = 0;


    while (insertedCount < TOTAL_ORDERS) {
        const batchSize = Math.min(
            BATCH_SIZE,
            TOTAL_ORDERS - insertedCount
        );
        const batch = Array.from(
            { length: batchSize },
            generateOrder
        );
        await Order.insertMany(batch);
        insertedCount += batchSize;
    }

    const finalCount = await Order.countDocuments();
    console.log(`Orders before seed: ${initialCount}`);
    console.log(`Orders inserted: ${insertedCount}`);
    console.log(`Orders now in database: ${finalCount}`);

}

seedOrders()
