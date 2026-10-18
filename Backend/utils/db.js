require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      mongoose.disconnect();
      throw err;
    });
};

module.exports = connectDB;