const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/Order");
const Product = require("../model/Product");
const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) return next(new ErrorHandler("Shop is not valid", 400));

    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    const productData = req.body;
    productData.images = imageUrls;
    productData.shop = shop;

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

// Get all produts by shop
exports.getAllProductsShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// delete produts of shop
exports.deleteProductShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product)
      return next(new ErrorHandler("Product not found with this id!", 500));

    product.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get all produts
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Review of a product
exports.createNewReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };
    const isReviewd = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewd) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review send successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
