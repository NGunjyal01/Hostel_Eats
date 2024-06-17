const express = require("express");
const customerRouter = express.Router();
const { searchItem, addItemToCart, getItemFromCart, removeItemFromCart } = require("../controllers/customer");
const { getCanteenDetails } = require("../controllers/customer");
const {customerCheck}=require("../middlewares/customer");
//Customer Routes
//Routes for Search Item
customerRouter.post("/searchItem",customerCheck,searchItem);
customerRouter.get("/getCanteenDetails",customerCheck,getCanteenDetails);
customerRouter.post("/addCartItem",customerCheck,addItemToCart);
customerRouter.get("/getCartItems",customerCheck,getItemFromCart);
customerRouter.post("/removeCartItem",customerCheck,removeItemFromCart);

module.exports=customerRouter;