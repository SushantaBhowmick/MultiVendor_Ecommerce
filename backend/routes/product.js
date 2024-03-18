const express = require('express');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const { createProduct, getAllProductsShop, deleteProductShop, getAllProducts } = require('../controller/product');
const router = express.Router();

router.route('/create-product').post(isSeller,upload.array("images"),createProduct)
router.route('/get-all-products-shop/:id').get(getAllProductsShop)
router.route('/delete-shop-product/:id').delete(isSeller, deleteProductShop)
router.route('/get-all-products').get(getAllProducts)

module.exports = router;