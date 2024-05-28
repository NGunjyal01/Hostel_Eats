const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  shopid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Chinese", "Main Course", "Dessert", "Beverage"],
    required: true,
  },
  imageUrl:{
        type:String,
    },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
