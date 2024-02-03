const express = require('express');
const { upload } = require('../multer');
const { createShop, shopActivation } = require('../controller/shop');
const router = express.Router();

router.route('/create-shop').post(upload.single("file"), createShop)
router.route("/activation").post(shopActivation);



module.exports = router;