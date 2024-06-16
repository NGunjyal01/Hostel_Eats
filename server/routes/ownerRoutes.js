const express = require("express");
const ownerRouter = express.Router();
const { addCanteen,addItem,getAllCanteen,getCanteenDetails, addItems,} = require("../controllers/canteen");
const {editCanteen,editItem,deleteItem,deleteCanteen}=require("../controllers/modifyCanteen")
//addCanteen
ownerRouter.post("/addCanteen",addCanteen);
//View Canteen
ownerRouter.get("/getAllCanteen",getAllCanteen);
//Canteen Details
ownerRouter.get("/getCanteenDetails",getCanteenDetails)
//Add item
ownerRouter.post("/addItem",addItem);
ownerRouter.post("/addItems",addItems)
//Routes for Edit Canteen
ownerRouter.post("/editCanteen",editCanteen);
//Routes for Edit Item
ownerRouter.post("/editItem",editItem);
//Routes for Delete Item
ownerRouter.post("/deleteItem",deleteItem);
//Routes for Delete canteen
ownerRouter.post("/deleteCanteen",deleteCanteen);


module.exports=ownerRouter;