const mongoose=require("mongoose");
const User=require("../models/user");
const Merchant=require("../models/merchant");
const Item=require("../models/item");
const {isFileTypeSupported,uploadFileToCloudinary,deleteImageFromCloudinary} = require("../utils/cloudinary");
require("dotenv").config();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

exports.updateDisplayPicture = async(req,res) =>{
  try{
    const { token } = req.cookies;
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Your token is expired kindly login first",
      });
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

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

    if (file.size > 1 * 1024 * 1024) {
      return res.status(200).json({
        success: false,
        message: "Image File size is more than 1mb",
      });
    }

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(200).json({
        success: false,
        message: "Image file Not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Profile-Photos");
    const userId = payload.id;
    // Check if the existing image URL is from the DiceBear API
    const diceBearUrlPattern =
      /^https:\/\/api\.dicebear\.com\/5\.x\/initials\/svg\?/;
    if (
      exisitingUser.imageUrl &&
      !diceBearUrlPattern.test(exisitingUser.imageUrl)
    ) {
      // Delete the existing image from Cloudinary
      const publicId = exisitingUser.imageUrl
      await deleteImageFromCloudinary(publicId);
    }

    await User.findByIdAndUpdate(
      userId,
      { imageUrl: response.secure_url },
      { new: true }
    );

    res.status(200).json({
      data: response.secure_url,
      success: true,
      message: `${exisitingUser.firstName} ${exisitingUser.lastName} photo updated successfully`,
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
exports.updateProfile = async(req,res) =>{
  try{
    const { token } = req.cookies;
       if (!token) {
         return res.status(200).json({
           success: false,
           message: "Your token is expired kindly login first",
         });
       }
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
 
    const { firstName, lastName,phone, dob, gender } = req.body;

    const exisitingUser = await User.findOne({ email:payload.email});
    if (!exisitingUser) {
      return res.status(200).json({
        success: false,
        message: "Not Registered please signup first",
      });
    }
    const updateData = {};
    const [year, month, day] = dob.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day + 1);

    if (!isNaN(parsedDate.getTime())) {
      updateData.dob = parsedDate;
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid date format",
      });
    }
   
    if (gender) updateData.gender = gender;
    if (dob) updateData.dob = parsedDate;
    if(lastName)updateData.lastName=lastName;
    if(firstName)updateData.firstName=firstName;
    if(phone){
    const existingPhone=await User.findOne({phone, _id : {$ne:exisitingUser._id}})
    //console.log(existingPhone);
    if(existingPhone){
      return res.status(200).json({
        success:false,
        message:`Phone Number: ${phone} already exist in the database`,
      })
    }
    updateData.phone = phone;
  }
    const updatedUser = await User.findByIdAndUpdate(payload.id, updateData, {
      new: true,
      runValidators: true,
    });
    //Only accounts for which role is Owner
    if(payload.role=="Owner"){
      const existingCanteens=await Merchant.find({ownerEmail:payload.email});
   
      for (const canteen of existingCanteens) {
        const canteenUpdateData = {};
        if (firstName || lastName)
          canteenUpdateData.ownerName = `${
            firstName || canteen.ownerName.split(" ")[0]
          } ${lastName || canteen.ownerName.split(" ")[1]}`;
        if (phone) canteenUpdateData.ownerContact = phone;

        await Merchant.findByIdAndUpdate(canteen._id, canteenUpdateData, {
          new: true,
          runValidators: true,
        });
      }
    }
  updatedUser.password=undefined;

    res.status(200).json({
      data:updatedUser,
      success:true,
      message:"Profile Updated successfully",
    })
  }
  catch(error){
    console.log(error);
    return res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}

//update Auth


exports.updateEmail = async(req,res) =>{
  try{
    const { token } = req.cookies;
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Your token is expired kindly login first",
      });
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const { currEmail, newEmail } = req.body;
   const isExist = await User.findOne({ email: currEmail });
   if (!isExist) {
     return res.status(200).json({
       success: false,
       message: "User Not Exist",
     });
   }
    // If same email Entered then there is no need to change
        if (currEmail == newEmail) {
      return res.status(200).json({
        success: true,
        message: "You have Entered the Same email",
      });
    }
 
 //If anyone have same email 
    const existingUser = await User.findOne({
      email: newEmail,
      _id: { $ne: payload.id },
    });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: `${newEmail} already Exist`,
      });
    }
    //If owner then we have ownerEmail in merchant Collection
    if(payload.role=='Owner'){

            const existingCanteens = await Merchant.updateMany(
              { ownerEmail: currEmail },
              { $set: { ownerEmail: newEmail } }
            );

    }
    // Update the user's email
    const updatedUser = await User.findByIdAndUpdate(
      payload.id,
      { email: newEmail },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Email Updated Successfully"
    });
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong"
    })
  }
}