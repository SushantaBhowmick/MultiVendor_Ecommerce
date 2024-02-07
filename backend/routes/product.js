const express = require('express');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const { createProduct } = require('../controller/product');
const router = express.Router();

router.route('/create-product').post(upload.array("images"),createProduct)

module.exports = router;