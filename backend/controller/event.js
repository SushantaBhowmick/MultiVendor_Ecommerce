const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/Shop");
const Event = require("../model/Event");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

//create Event
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) return next(new ErrorHandler("Shop is not valid", 400));

    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);
    const eventData = req.body;
    eventData.images = imageUrls;
    eventData.shop = shop;

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get all events by shop
exports.getAllEventsShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get all events by shop
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// delete events of shop
exports.deleteEventShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event)
      return next(new ErrorHandler("Event not found with this id!", 500));

    event.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    
    await Event.findByIdAndDelete(eventId)

    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
