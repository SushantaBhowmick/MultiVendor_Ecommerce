const express = require("express");
const {
  createOrder,
  getAllOrders,
  getAllOrdersOfSeller,
  updateOrderStatusBySeller,
  orderRefund,
  accessOrderRefund,
} = require("../controller/order");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const router = express.Router();

router.route("/create-order").post(isAuthenticated, createOrder);
router.route("/get-all-orders/:userId").get(isAuthenticated, getAllOrders);
router
  .route("/get-seller-all-orders/:shopId")
  .get(isAuthenticated, getAllOrdersOfSeller);
router
  .route("/update-order-status/:id")
  .put(isSeller, updateOrderStatusBySeller);
router.route("/order-refund/:id").put(orderRefund);
router.route("/order-refund-success/:id").put(accessOrderRefund);

module.exports = router;
