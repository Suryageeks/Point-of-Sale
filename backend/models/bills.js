const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  customerName: {
    type: String,
    //required: [true, "Customer Name required"],
  },
  customerNumber: {
    type: Number,
    //required: [true, "Customer Mobile Number required"],
    maxlength: 10,
  },
  tax: {
    type: Number,
  },
  grossTotal: {
    type: Number,
  },
  totalAmt: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ["Card", "Cash", "Online Wallet"],
  },
  cart: {
    type: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bills", billSchema);
