const connectDB = require("../utils/db");
const User = require("../models/User");

async function createAdmin() {
    await connectDB();
    await User.create({
        email: "admin@gmail.com",
        password: "123456",
        role: "Admin",
    });

    console.log("Admin created successfully");
    process.exit();
}

createAdmin();