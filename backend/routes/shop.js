const express = require('express');
const { upload } = require('../multer');
const { createShop, shopActivation, login, loadSeller, logoutSeller, getShopInfo, updateShopInfo, updateShopAvatar } = require('../controller/shop');
const { isSeller } = require('../middleware/auth');
const router = express.Router();

router.route('/create-shop').post(upload.single("file"), createShop)
router.route("/activation").post(shopActivation);
router.route("/login").post(login);
router.route("/getSeller").get(isSeller, loadSeller);
router.route("/logout").get(isSeller, logoutSeller);
router.route("/get-shop-info/:id").get(getShopInfo);
router.route("/update-seller-avatar").put(isSeller,upload.single('image'), updateShopAvatar);
router.route("/update-seller-info").put(isSeller, updateShopInfo);



module.exports = router;