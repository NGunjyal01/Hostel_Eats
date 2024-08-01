const express=require("express");
const paymentRouter=express.Router();
const { customerCheck } = require("../middlewares/customer");
const { orderPayment, orderVerify ,cashPayment} = require("../controllers/payment");



paymentRouter.post("/order",customerCheck,orderPayment);
paymentRouter.post("/verify",customerCheck,orderVerify);
paymentRouter.post("/cash",customerCheck, cashPayment);
module.exports=paymentRouter;