const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/Product");
const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");


exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) return next(new ErrorHandler("Shop is not valid", 400));
    
    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    const productData = req.body;
    productData.images = imageUrls;
    productData.shop= shop;

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
