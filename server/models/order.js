const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  merchantid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopid: {
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
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: function () {
      return this.paymentstatus === "paid";
    },
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },
  paymentstatus: {
    type: String,
    enum: ["paid", "cash"],
  },
  status: {
    type: String,
    enum: ["preparing", "pending", "prepared", "completed", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date },
});

module.exports=mongoose.model("Order",orderSchema);