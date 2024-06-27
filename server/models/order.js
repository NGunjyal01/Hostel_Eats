const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopid:{
      type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: {
        type: Number,
    required:true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },
  status: {
    type: String,
    enum: ["preparing", "paid", "failed"],
    default: "paid",
  },
  createdAt: { type: Date },
});

module.exports=mongoose.model("Order",orderSchema);