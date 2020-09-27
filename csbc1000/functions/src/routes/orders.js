const express = require("express");
const {
  addOrder,
  getAllOrders,
  getOrderByID,
  updateOrderByID,
  deleteOrderByID,
} = require("../controller/order");

// create route handlers
// router will contain the Router instance.
const router = express.Router();

// HTTP POST /orders delegates to addOrders()
router.post("/", addOrder);

// HTTP GET /orders delegates to getAllOrders()
router.get("/", getAllOrders);

// HTTP GET /orders/:id delegates to getOrdersByID()
router.get("/:id", getOrderByID);

// HTTP PUT /orders/:id delegates to updateOrdersByID()
router.put("/:id", updateOrderByID);

// HTTP DELETE /orders/:id delegates to deleteOrdersByID()
router.delete("/:id", deleteOrderByID);

module.exports = router;
