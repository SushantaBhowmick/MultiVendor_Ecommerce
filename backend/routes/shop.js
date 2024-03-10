const express = require('express');
const { upload } = require('../multer');
const { createShop, shopActivation, login, loadSeller, logoutSeller, getShopInfo } = require('../controller/shop');
const { isSeller } = require('../middleware/auth');
const router = express.Router();

router.route('/create-shop').post(upload.single("file"), createShop)
router.route("/activation").post(shopActivation);
router.route("/login").post(login);
router.route("/getSeller").get(isSeller, loadSeller);
router.route("/logout").get(isSeller, logoutSeller);
router.route("/get-shop-info/:id").get(getShopInfo);



module.exports = router;