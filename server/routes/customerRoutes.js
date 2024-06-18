const express = require("express");
const customerRouter = express.Router();
const { searchItem, addItemToCart, getItemFromCart, removeItemFromCart, searchItemByCanteen, resetCartItem } = require("../controllers/customer");
const { getCanteenDetails } = require("../controllers/customer");
const {customerCheck}=require("../middlewares/customer");
//Customer Routes
//Routes for Search Item
customerRouter.post("/searchItem",customerCheck,searchItem);
customerRouter.get("/getCanteenDetails",customerCheck,getCanteenDetails);
customerRouter.post("/searchItemByCanteen",customerCheck,searchItemByCanteen);
customerRouter.post("/addCartItem",customerCheck,addItemToCart);
customerRouter.get("/getCartItems",customerCheck,getItemFromCart);
customerRouter.post("/removeCartItem",customerCheck,removeItemFromCart);
customerRouter.get("/resetCartItem",customerCheck,resetCartItem);

module.exports=customerRouter;