const mongoose = require("mongoose");

// Define the schema for merchants
const merchantSchema = new mongoose.Schema({
  canteenName: {
    type: String,
    required: true,
    unique: true,
  },
  canteenContact: {
    type: String,
    maxlength: 10,
    minlength: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  ownerContact: {
    type: String,
    required: true,

    maxlength: 10,
    minlength: 10,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,

  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  openingTime:{
    type: String,
    required:true,
  },
  closingTime:{
    type:String,
    required:true,
  },
  monthlyRevenue:{
    type:Number,
    default:0,
  },
  totalRevenue:{
    type:Number,
    default:0,
  },
  onlineMoney:{
    type:Number,
    default:0,
  },
  cashMoney:{
    type:Number,
    default:0,
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
