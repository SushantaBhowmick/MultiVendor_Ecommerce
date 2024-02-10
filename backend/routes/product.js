const express = require('express');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const { createProduct, getAllProductsShop } = require('../controller/product');
const router = express.Router();

router.route('/create-product').post(upload.array("images"),createProduct)
router.route('/get-all-products-shop/:id').get(getAllProductsShop)

module.exports = router;