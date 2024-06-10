const mongoose=require("mongoose");
const User=require("../models/user");
const {isFileTypeSupported,uploadFileToCloudinary,} = require("../utils/cloudinary");
require("dotenv").config();
const jwt=require("jsonwebtoken");

exports.updateDisplayPicture = async(req,res) =>{
  try{
    const { token }= req.cookies;
        if (!token) {
          return res.status(200).json({
            success: false,
            message: "Your token is expired kindly login first",
          });
        }
    const payload=await jwt.verify(token,process.env.JWT_SECRET);

      const exisitingUser = await User.findOne({
        email: payload.email,
      });
      if (!exisitingUser) {
        return res.status(200).json({
          success: false,
          message: "User Not Exist Kindy Signup First",
        });
      }

    if (!req.files) {
      return res.status(200).json({
        success: false,
        message: "Image is not provided properly",
      });
    }
    const file = req.files.imageFile;
    console.log(file);
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileLength = file.name.split(".");
    const fileType = file.name.split(".")[fileLength.length - 1].toLowerCase();
    //Image size must be less than 100kb

    if (file.size > 1*1024*1024) {
      return res.status(400).json({
        success: false,
        message: "Image File size is more than 1mb",
      });
    }
   
  
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Image file Not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Profile-Photos");
    const userId=payload.id;
await User.findByIdAndUpdate(
  userId,{imageUrl:response.secure_url},{new:true
})
   

    res.status(200).json({
      data:response.secure_url,
      success: true,
      message: `${exisitingUser.firstName} ${exisitingUser.lastName
      } photo updated successfully`,
    });
  }catch(error){
       console.log(error);
    res.status(400).json({
      success: false,
      message: "Went Wrong",
    });
  }


}

//Update Profile API
