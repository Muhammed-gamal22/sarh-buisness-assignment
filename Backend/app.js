const express = require('express');
const AppError = require('./utils/appError');
const globalAppError = require("./controller/errorController")
const app = express();
const cors = require("cors")
const orderRouter = require("./routes/ordersRouter")
app.use(express.json());
app.use(cors());
app.use("/orders", orderRouter)
app.use((req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})
app.use(globalAppError)
module.exports = app;