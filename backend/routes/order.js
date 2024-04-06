const express = require('express');
const { createOrder, getAllOrders } = require('../controller/order');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/create-order').post(isAuthenticated, createOrder)
router.route('/get-all-orders/:userId').get(isAuthenticated, getAllOrders)

module.exports = router;