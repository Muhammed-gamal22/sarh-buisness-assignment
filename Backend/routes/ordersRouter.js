const express = require("express");
const { getOrders } = require("../controller/ordersController");
const router = express.Router();
router.get("/", getOrders);
module.exports = router;