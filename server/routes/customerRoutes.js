const express = require("express");
const customerRouter = express.Router();
const { searchItem } = require("../controllers/customer");
const { getCanteenDetails } = require("../controllers/customer");

//Customer Routes
//Routes for Search Item
customerRouter.post("/searchItem",searchItem);
customerRouter.get("/getCanteenDetails",getCanteenDetails);

module.exports=customerRouter;