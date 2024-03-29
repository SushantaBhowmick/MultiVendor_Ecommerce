const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.paymentProcess = catchAsyncErrors(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount:req.body.amount,
      currency: "inr",
      metadata: {
        company: "Shopo",
      },
    });
    res.status(201).json({
      success: true,
      message: "Payment created successfully!",
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
});

exports.getStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
