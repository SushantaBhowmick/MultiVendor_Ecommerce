const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const path = require("path");
const sendMail = require("../utils/sendMail");
const jwt = require('jsonwebtoken');
const sendToken = require("../utils/jwtToken");

exports.createShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists"));
    }

    const filename = req.file.filename;
    const fileUri = path.join(filename);

    const seller = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      avatar: fileUri,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate Your Shop",
        message: `Hello ${seller.name}, please click on thelin to activae your account:${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate Seller
exports.shopActivation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );
    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      newSeller;
    let seller = await Shop.findOne({ email });

    if (seller) {
      return next(new ErrorHandler("User already exists", 400));
    }
    seller = await Shop.create({
      name,
      email,
      password,
      avatar,
      zipCode,
      address,
      phoneNumber,
    });
    sendToken(seller, 201, res, "Account activated successfully!");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
