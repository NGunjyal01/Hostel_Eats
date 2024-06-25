const mongoose = require("mongoose");
const User = require("../models/user");
const Item = require("../models/item");
const Cart = require("../models/cart");
const Merchant = require("../models/merchant");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Razorpay=require("razorpay");
const crypto=require("crypto");

exports.orderPayment = async(req,res) =>{
  
    try{
  const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET,
  })
     const options=req.body;
     const order=await razorpay.orders.create(options);

     if(!order){
        return res.status(200).json({
            success:false,
            message:"Order not created",
        })
     }
     res.status(200).json({
        data:order,
        success:true,
        message:"Successfull",
     })

    }catch(error){
      console.log(error);
      return res.status(400).json({
        success:false,
        message:"Something Went Wrong"
      })
    }

}

exports.orderVerify = async(req,res)=>{
    try{
  // 3 things razorpay_payment_id,order_id,signature;

  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    
  const sha=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest=sha.digest("hex");


  if(digest!==razorpay_signature){
    return res.status(400).json({
        success:false,
        message:"Transaction is not legit",
    })
  }
   //database work and cart empty etc.....

    res.status(200).json({
        success:true,
        orderId:razorpay_order_id,
        paymentId:razorpay_payment_id,
    })
  
    }catch(error){
   console.log(error);
   return res.status(400).json({
     success: false,
     message: "Something Went Wrong",
   });
    }
}