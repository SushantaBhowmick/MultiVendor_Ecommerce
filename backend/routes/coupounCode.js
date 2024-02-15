const express = require('express');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const { createCoupounCode, getAllCouponsByShop, deleteCouponByShop } = require('../controller/coupounCode');
const router = express.Router();

router.route('/create-coupon-code').post(isSeller,createCoupounCode )
router.route('/get-coupons/:id').get(isSeller,getAllCouponsByShop )
router.route('/delete-coupon/:id').delete(isSeller,deleteCouponByShop )


module.exports = router;