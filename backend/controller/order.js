const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/Order");
const Product = require("../model/Product");
const ErrorHandler = require("../utils/ErrorHandler");

//create order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const {cart,shippingAddress,user,totalPrice,paymentInfo}=req.body;
    
    const shopItemsMap = new Map();
    for(const item of cart){
        const shopId=item.shopId;
        if(!shopItemsMap.has(shopId)){
            shopItemsMap.set(shopId,[])
        }
        shopItemsMap.get(shopId).push(item)
        console.log(shopItemsMap)
    }
    // create an order for each shop
    const orders = [];
    for(const [shopId,items] of shopItemsMap){
        const order = await Order.create({cart:items,shippingAddress,user,totalPrice,paymentInfo})
        orders.push(order)
    }
   
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      orders

    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
