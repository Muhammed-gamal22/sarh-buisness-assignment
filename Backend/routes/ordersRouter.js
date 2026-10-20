const express = require("express");
const { getOrders, deleteOrder, createOrder } = require("../controller/ordersController");
const { requireAuth, restrictTo } = require("../controller/userController")
const router = express.Router();

router.get("/", getOrders)
router.post("/", createOrder)
router.delete("/:id", requireAuth, restrictTo("Admin"), deleteOrder);
module.exports = router;