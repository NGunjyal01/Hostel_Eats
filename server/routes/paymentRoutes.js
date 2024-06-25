const express=require("express");
const paymentRouter=express.Router();
const { customerCheck } = require("../middlewares/customer");
const { orderPayment, orderVerify } = require("../controllers/payment");



paymentRouter.post("/order",customerCheck,orderPayment);
paymentRouter.post("/verify",customerCheck,orderVerify);

module.exports=paymentRouter;