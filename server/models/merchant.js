const mongoose = require("mongoose");

// Define the schema for merchants
const merchantSchema = new mongoose.Schema({
  shopNo: {
    type: Number,
    required: true,
    unique: true,
  },
  shopName: {
    type: String,
    required: true,
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  menuitems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
