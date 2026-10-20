const connectDB = require("../utils/db");
const User = require("../models/User");

async function createAgent() {
    await connectDB();
    await User.create({
        email: "agent@gmail.com",
        password: "123456",
        role: "Agent",
    });

    console.log("agent created successfully");
    process.exit();
}

createAgent();