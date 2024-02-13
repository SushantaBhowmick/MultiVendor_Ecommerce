const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/Shop");
const Event = require("../model/Event");
const ErrorHandler = require("../utils/ErrorHandler");

//create Event
exports.createEvent= catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) return next(new ErrorHandler("Shop is not valid", 400));
    
    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    const eventData = req.body;
    eventData.images = imageUrls;
    eventData.shop= shop;

    const event = await Event.create(productData);

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
