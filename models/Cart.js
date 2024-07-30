const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    default: 1,
  },
});
const userCart = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  cart: [cartSchema],
});
module.exports = mongoose.model("userCart", userCart);
