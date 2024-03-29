const express = require('express');
const { paymentProcess, getStripeApiKey } = require('../controller/payment');
const router = express.Router();

router.route('/process').post(paymentProcess)
router.route('/stripeapikey').get(getStripeApiKey)

module.exports = router;