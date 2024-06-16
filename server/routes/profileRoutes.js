const express = require("express");
const profileRouter = express.Router();


const {updateDisplayPicture, updateProfile,updateEmail,updatePassword}=require("../controllers/profileSettings");


profileRouter.post("/updateDisplayPicture", updateDisplayPicture);
profileRouter.post("/updateProfile", updateProfile);
profileRouter.post("/updateEmail", updateEmail);
profileRouter.post("/updatePassword", updatePassword);
module.exports=profileRouter;