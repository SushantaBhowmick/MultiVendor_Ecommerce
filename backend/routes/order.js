const express = require('express');
const { createOrder } = require('../controller/order');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/create-order').post(isAuthenticated, createOrder)

module.exports = router;