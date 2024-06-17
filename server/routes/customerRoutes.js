const express = require("express");
const customerRouter = express.Router();
const { searchItem, addItemToCart, getItemFromCart } = require("../controllers/customer");
const { getCanteenDetails } = require("../controllers/customer");
const {customerCheck}=require("../middlewares/customer");
//Customer Routes
//Routes for Search Item
customerRouter.post("/searchItem",customerCheck,searchItem);
customerRouter.get("/getCanteenDetails",customerCheck,getCanteenDetails);
customerRouter.post("/setCartItems",customerCheck,addItemToCart);
customerRouter.get("/getCartItems",customerCheck,getItemFromCart);

module.exports=customerRouter;