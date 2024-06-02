const mongoose = require("mongoose");
const Merchant = require("../models/merchant");
const Item = require("../models/item");
// const cloudinary = require("cloudinary").v2;
const {isFileTypeSupported,uploadFileToCloudinary}=require("../utils/imageUpload")
//Canteen Add
exports.addCanteen = async (req, res) => {
  try {
    const { canteenName, canteenContact, address,ownerContact,ownerName,ownerEmail, licenseNumber } = req.body;
    if (!canteenName || !canteenContact || !address || !ownerContact || !ownerName || !ownerEmail || !licenseNumber) {
      
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }
    const existingShop = await Merchant.findOne({ canteenName });
    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: "Canteen Already Exist",
      });
    }
          const existingCanteenPhone = await Merchant.findOne({ canteenContact });
          if (existingCanteenPhone) {
            return res.status(400).json({
              success: false,
              message: "Canteen Phone Number Already Exist",
            });
          }

            const existingLicenseNumber = await Merchant.findOne({ licenseNumber});
            if (existingLicenseNumber) {
              return res.status(400).json({
                success: false,
                message: "License Number Already Exist",
              });
            }
    

    const merchant = await Merchant.create({
      canteenName,
      canteenContact,
      address,
      ownerContact,
      ownerName,
      ownerEmail,
      licenseNumber,
    });

    return res.status(200).json({
      data: merchant,
      success: true,
      message: "Canteen Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Went Wrong",
    });
  }
};


exports.addItem= async(req,res) =>{

 try {
   const { shopid, name, description, category, price } = req.body;
 
   const file=req.files.imageFile;
   
   console.log(file);
   const supportedTypes=["jpg","jpeg","png"];
   const fileLength=file.name.split('.');
   const fileType=file.name.split('.')[fileLength.length-1].toLowerCase();
  //Image size must be less than 100kb
 if(file.size>100000){
  return res.status(400).json({
    success:false,
    message:"Image File size is more than 100KB",
  })
 }
  

   if (!name || !description || !category || !price) {
     return res.status(400).json({
       status: 400,
       message: "Please fill all fields",
     });
   }
//for checking if it is valid id (satisfying the constraints of mongoose so that no castError would occur)
if (!mongoose.Types.ObjectId.isValid(shopid)) {
  return res.status(400).json({
    success: false,
    message: "Invalid shop ID",
  });
}
   //validate baki hai shop ke through hoga shop id must be  present in DB
  //  console.log(shopid);
   const exisitingShop = await Merchant.findOne({
     _id:shopid
   });
   if (!exisitingShop) {
     return res.status(400).json({
       success: false,
       message: "Merchant Not Exist",
     });
   }
   try {
     // Find items with the specified shop ID and name using for multiple Item validation
     const items = await Item.find({ shopid: shopid, name: name  });

     if (items.length > 0) {
   return res.status(202).json({
    success:false,
    message:"Item is already Present",
   })
     } 
   } catch (error) {
       res.status(400).json({
       success: false,
       message: "Something Went Wrong",
     });
   }



    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Image file Not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Hosteleats");
   const item = new Item({
     shopid,
     name,
     description,
     category,
     price,
     imageUrl:response.secure_url,
   });

   const savedItem = await item.save();

   const updatedMerchant = await Merchant.findByIdAndUpdate(
     shopid,
     { $push: { menuitems: savedItem._id } },
     { new: true }
   ).populate("menuitems");
 //  console.log(updatedMerchant);
   res.status(200).json({
     data: updatedMerchant,
     success: true,
     message: "Item Added Successfully",
   });
 } catch (error) {
   console.log(error);
   res.status(400).json({
     success: false,
     message: "Went Wrong",
   });
 }


}