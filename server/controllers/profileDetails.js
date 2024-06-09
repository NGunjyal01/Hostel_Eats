const mongoose=require("mongoose");
const User=require("../models/user");
const {isFileTypeSupported,uploadFileToCloudinary,} = require("../utils/cloudinary");


exports.profileDetails = async(req,res) =>{
  try{
    const { userid, gender, dob } = req.body;
    const file = req.files.imageFile;
    console.log(file);
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileLength = file.name.split(".");
    const fileType = file.name.split(".")[fileLength.length - 1].toLowerCase();
    //Image size must be less than 100kb

    if (file.size > 200000) {
      return res.status(400).json({
        success: false,
        message: "Image File size is more than 200KB",
      });
    }
    if (!userid || !gender || !dob || !file) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    //for checking if it is valid id (satisfying the constraints of mongoose so that no castError would occur)
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    //validate baki hai userid ke through hoga user id must be  present in DB
    //  console.log(userid);
    const exisitingUser = await User.findOne({
      _id: userid,
    });
    if (!exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Exist Kindy Signup First",
      });
    }
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Image file Not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Profile-Photos");

    const updateData = {};
    const [day, month, year] = dob.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day + 1);

    if (!isNaN(parsedDate.getTime())) {
      updateData.dob = parsedDate;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    if (gender) updateData.gender = gender;
    if (dob) updateData.dob = parsedDate;
    if (response.secure_url) updateData.imageUrl = response.secure_url;
    const updatedUser = await User.findByIdAndUpdate(userid, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: updatedUser,
      success: true,
      message: "Item Added Successfully",
    });
  }catch(error){
       console.log(error);
    res.status(400).json({
      success: false,
      message: "Went Wrong",
    });
  }


}