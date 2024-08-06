const mongoose = require("mongoose");
const User = require("../models/user");
const Item = require("../models/item");
const Cart = require("../models/cart");
const Merchant = require("../models/merchant");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Razorpay = require("razorpay");
const crypto = require("crypto");


exports.orderPayment = async (req, res) => {
  try {
    const payload = req.user;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(200).json({
        success: false,
        message: "Order not created",
      });
    }
    res.status(200).json({
      data: order,
      success: true,
      message: "Order Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

exports.orderVerify = async (req, res) => {
  try {
    // 3 things razorpay_payment_id,order_id,signature;
    const payload = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Transaction is not legit",
      });
    }
    const cart = await Cart.findOne({ userid: payload.id }).populate(
      "items.item"
    );
    //console.log(cart);

    const merchantId = await Merchant.findById({
      _id: cart.items[0].item.shopid,
    });
    const merchant = await User.findOne({ email: merchantId.ownerEmail });
    // console.log(merchant);
    // console.log(cart.items);

    const newOrder = new Order({
      userid: payload.id,
      merchantid: merchant._id,
      shopid: cart.items[0].item.shopid,
      items: cart.items,
      totalAmount: cart.totalPrice,
      razorpayOrderId: razorpay_order_id,
      paymentstatus: "paid",
    });
    //database work and cart empty etc.....

    const expressTime = new Date();
    const currentTime = new Date(
      expressTime.getTime() - expressTime.getTimezoneOffset() * 60000
    );

    newOrder.createdAt = currentTime;
    newOrder.razorpayPaymentId = razorpay_payment_id;
    newOrder.razorpaySignature = razorpay_signature;

    await newOrder.save();
    //Increasing Shop earning

    const canteen = await Merchant.findOne({
      _id: cart.items[0].item.shopid,
    });
        const orderObject = newOrder.toObject();
        orderObject.canteenName = canteen.canteenName;
            orderObject.imageUrl = cart.items[0].item.imageUrl;
    if (canteen) {
      canteen.totalRevenue = canteen.totalRevenue + cart.totalPrice;
      canteen.monthlyRevenue+=canteen.totalRevenue/10;
      canteen.onlineMoney = canteen.onlineMoney + cart.totalPrice;
      await canteen.save();
      
    }


    
    //clearing cart
    await Cart.deleteOne({ userid: payload.id });

    // Emit the order to the owner's room
    const io = req.app.get("io");
    const ownerId = newOrder.merchantid;
    const customerId = newOrder.userid;
    // console.log("SHop ki id",ownerId);
    // console.log("Ab yaha se owner ke page mai jayega");
   // console.log(canteenName);
    io.to(ownerId.toString()).emit("newOrder", orderObject);
  io.to(customerId.toString()).emit("orderUpdate",orderObject);
    res.status(200).json({
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

//cash on Delivery
exports.cashPayment = async (req, res) => {
  try {
    const payload = req.user;
    const { amount } = req.body;
    const cart = await Cart.findOne({ userid: payload.id }).populate(
      "items.item"
    );

    if (!cart) {
      return res.status(200).json({
        success: false,
        message: "Cart Not Found",
      });
    }

    if (cart.totalPrice != amount) {
      return res.status(400).json({
        success: false,
        message: "Amount Does not match cart total",
      });
    }

    const merchantId = await Merchant.findById({
      _id: cart.items[0].item.shopid,
    });
    const merchant = await User.findOne({ email: merchantId.ownerEmail });

    const newOrder = new Order({
      userid: payload.id,
      merchantid: merchant._id,
      shopid: cart.items[0].item.shopid,
      items: cart.items,
      totalAmount: parseInt(amount),
      razorpayOrderId: null,
      paymentstatus: "cash",
    });

    const expressTime = new Date();
    const currentTime = new Date(
      expressTime.getTime() - expressTime.getTimezoneOffset() * 60000
    );

    newOrder.createdAt = currentTime;
    newOrder.razorpayPaymentId = null;
    newOrder.razorpaySignature = null;

    await newOrder.save();
    // Update the merchant's total revenue
    const canteen = await Merchant.findOne({ _id: cart.items[0].item.shopid });

    const orderObject = newOrder.toObject();
    orderObject.canteenName = canteen.canteenName;
    orderObject.imageUrl=cart.items[0].item.imageUrl;

    if (canteen) {
      canteen.totalRevenue += parseInt(amount);
      canteen.monthlyRevenue+=canteen.totalRevenue/10;
      canteen.cashMoney+=parseInt(amount);
      await canteen.save();
    }
  //  console.log(newOrder);

    // Clearing the user's cart
    await Cart.deleteOne({ userid: payload.id });
    // Emit the order to the owner's room
    const io = req.app.get("io");
    const ownerId = newOrder.merchantid;
    const customerId = newOrder.userid;
    io.to(ownerId.toString()).emit("newOrder", orderObject);
 io.to(customerId.toString()).emit("orderUpdate", orderObject);
    res.status(200).json({
      success: true,
      data: newOrder,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
