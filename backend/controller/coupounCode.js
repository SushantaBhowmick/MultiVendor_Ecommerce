const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/Shop");
const Event = require("../model/Event");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const CoupounCode = require("../model/CoupounCode");


//create Coupoun Code
exports.createCoupounCode = catchAsyncErrors(async (req, res, next) => {
    try {
      const coupounCode = await CoupounCode.find({name:req.body.name})
      if (coupounCode.length !==0) return next(new ErrorHandler("Coupoun code is already exists", 400));

        const coupoun = await CoupounCode.create(req.body)

      res.status(201).json({
        success: true,
        message: "Coupon Code created successfully!",
        coupoun,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });
  

//get all Coupouns 
exports.getAllCouponsByShop = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const coupons = await CoupounCode.find({shopId:req.params.id});

      res.status(200).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });
  

//delete Coupoun code
exports.deleteCouponByShop = catchAsyncErrors(async (req, res, next) => {
    try {
        
    await CoupounCode.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message:"Coupon Code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });
  