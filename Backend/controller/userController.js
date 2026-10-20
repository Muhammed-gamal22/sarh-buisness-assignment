const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.requireAuth = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }
    const payload = jwt.verify(token, process.env.SECRET);
    const currentUser = await User.findById(payload.id);
    if (!currentUser) {
        return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }
    req.user = currentUser;
    next();
});
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email }).
        select("+password");
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    if (!user || !(await user.comparePassword(password, user.password))) {
        return next(new AppError("Invalid email or password", 401));
    }
    const token = jwt.sign({ id: user._id },
        process.env.SECRET, {
        expiresIn: process.env.SECRET_EXPIRES_IN
    });

    res.status(200).json({
        status: "success",
        token,
        user
    });
});
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }
        next();
    };
};