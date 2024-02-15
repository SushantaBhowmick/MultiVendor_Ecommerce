const mongoose = require("mongoose");

const coupounSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Coupon code name"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  selectedProduct: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Coupoun", coupounSchema);
