const mongoose=require("mongoose");
const Merchant=require("../models/merchant");
const Item=require("../models/item");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const { uploadFileToCloudinary, deleteImageFromCloudinary ,isFileTypeSupported} = require('../utils/cloudinary');
//Edit Canteen API
exports.editCanteen= async(req,res) =>{
    try{
      const { token } = req.cookies;
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      if (!token) {
        return res.status(200).json({
          sucess: false,
          message: "Your Token is Expired Kindly login first",
        });
      }
    
      const {
        shopid,
        canteenName,
        canteenContact,
        Address,
        openingTime,
        closingTime,
      } = req.body;
      if (!mongoose.Types.ObjectId.isValid(shopid)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID(does not satisfy mongoose criteria)",
        });
      }
      if (!shopid) {
        return res.status.json({
          success: false,
          message: "Please Give Canteen ID",
        });
      }
      //Commented  because in front end we have protected route for owner and customer so if this api route is called then cookie must have authenticated token consiting of role:owner

      //   const existingMerchant = await User.find({ email: payload.email });
      //   console.log(payload.role);
      //   if (!existingMerchant || payload.role != "Owner") {
      //     return res.status(404).json({
      //       success: false,
      //       message: "Merchant is Not Created",
      //     });
      //   }

      const existingCanteen = await Merchant.findOne({ _id: shopid });
      if (!existingCanteen) {
        return res.status(404).json({
          success: false,
          message: "Canteen Is Not Present means your id is not valid",
        });
      }
      //checking if same canteen Name already present in the database
      const existingCanteenName = await Merchant.findOne({
        canteenName,
        _id: { $ne: shopid },
      });
      if (existingCanteenName) {
        return res.status(200).json({
          success: false,
          message: `Canteen: ${canteenName} is already exist`,
        });
      }
      //checking if the same canteen Contact Number is already present in the database

      const existingCanteenContact = await Merchant.findOne({
        canteenContact,
        _id: { $ne: shopid },
      });
      if (existingCanteenContact) {
        return res.status(200).json({
          success: false,
          message: `Canteen Contact Number already exist`,
        });
      }

      if (canteenContact.length != 10) {
        return res
          .status(200)
          .json({
            success: false,
            message: "Phone Number length is not valid",
          });
      }
      // Update the canteen details
      const updatedCanteen = await Merchant.findByIdAndUpdate(
        shopid,
        {
          canteenName,
          canteenContact,
          Address,
          openingTime,
          closingTime,
        },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        data: updatedCanteen,
        success: true,
        message: "Update SuccessFully",
      });
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

//edit Item API
exports.editItem= async(req,res)=>{
  try{
    const { token } = req.cookies;
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (!token) {
      return res.status(200).json({
        sucess: false,
        message: "Your Token is Expired Kindly login first",
      });
    }

    const { itemid, shopid, name, description, category, price } = req.body;
    const file = req.files!=null? req.files.imageFile : null ;

    if (!mongoose.Types.ObjectId.isValid(shopid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Shop ID(does not satisfy mongoose criteria)",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(itemid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Item ID(does not satisfy mongoose criteria)",
      });
    }
    if(!itemid && !shopid){
      return res.status(200).json({
        success:false,
        message:"Please provide Item ID and ShopId",
      })
    }
    const exisitingItem = await Item.findById(itemid);


//Checking if that name is already is exist in our canteen or nor
const existingName = await Item.findOne({ name, _id: { $ne: itemid } ,shopid});
if(existingName){
  return res.status(200).json({success:false,
    message:`${name} is already present in your canteen`
  })
}

    //If image is given 
    let newImageUrl=exisitingItem.imageUrl;
if(file){
  console.log(file);
  const supportedTypes = ["jpg", "jpeg", "png"];
  const fileLength = file.name.split(".");
  const fileType = file.name.split(".")[fileLength.length - 1].toLowerCase();
  //Image size must be less than 100kb
  if (file.size > 1* 1024*1024) {
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
   const imageUrlToBeDeleted=exisitingItem.imageUrl;
   
  deleteImageFromCloudinary(imageUrlToBeDeleted); // previous image is deleted here
  const response = await uploadFileToCloudinary(file, "Hosteleats"); //new image uploaded
  newImageUrl=response.secure_url;
}
    // Update the canteen details
    const updatedItem= await Item.findByIdAndUpdate(
      itemid,
      {
        name,
        description,
        category,
        price,
        imageUrl:newImageUrl
      },
      { new: true } // Return the updated Item
    );

    res.status(200).json({
      data:updatedItem,
      success: true,
      message: "Successfully Edited your Item",
    });
  }
  catch(error){
    console.log(error);
    return res.status(400).json({
      success:false,
      message:"Something went Wrong",

    })
  }
}

//Delte Item API
exports.deleteItem= async(req,res)=>{
  try{
    const {token}=req.cookies;
    const payload= await jwt.verify(token,process.env.JWT_SECRET);
    if(!token)
      {
        return res.status(200).json({
          success:false,
          message:"Your token is expired kindly login first",
        })
      }
        const {itemid,shopid}=req.body;
        if(!mongoose.Types.ObjectId.isValid(itemid)){
          return res.status(400).json({
            success:false,
            message:"Item id is not valid (does not satisfy mongoose criteria)",
          })
        }
        if(!mongoose.Types.ObjectId.isValid(shopid)){
          return res.status(400).json({
            success:false,
            message:"Shop id is not valid(does not satisfy mongoose criteria)",
          })
        }

        if(!itemid || !shopid){
          return res.status(200).json({
            success:false,
            message:"Please Provide itemid and shopid",
          })
        }
const exisitingShop= await Merchant.findById(shopid)
if(!exisitingShop){
  return res.status(200).json({
    success:false,
    message:"Canteen is not registered",
  })
}
if(exisitingShop.ownerEmail!=payload.email){
  return res.status(200).json({
    success:false,
    message:"Owner Email is not matched with the token"
  })
}
        const exisitingItem = await Item.findById(itemid);
     if(!exisitingItem){
       return res.status(200).json({
         success: false,
         message: "Item not found",
       });
     }
   //  console.log("before",exisitingShop.menuitems);
   const imageUrlToBeDeleted=exisitingItem.imageUrl;
  await Item.findByIdAndDelete(itemid); //Deleting from Item collection 
  deleteImageFromCloudinary(imageUrlToBeDeleted) //Deleting from cloudinary
  // Removing the item ID from the menuitems array in the Merchant collection
    const updatedMerchant = await Merchant.findByIdAndUpdate(
      shopid,
      { $pull: { menuitems: itemid } },
      { new: true }
    );
        res.status(200).json({
          data:updatedMerchant,
          success:true,
          message:`${exisitingItem.name} is successfully deleted`,
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

//Delete Canteen API
//main task delete canteen from Merchant section and delete all the items and images from the cloudinary
exports.deleteCanteen= async(req,res) => {
  try{
    const{token}=req.cookies;
    const payload=await jwt.verify(token,process.env.JWT_SECRET);
    if(!token){
      return res.status(200).json({
        success: false,
        message: "Your Token is Expired Kindly login first",
      });
    }
    const {shopid}=req.body;
    if(!mongoose.Types.ObjectId.isValid(shopid)){
      return res.status(200).json({
        success: false,
        message: "Invalid Shop ID(does not satisfy mongoose criteria)",
      });
    }
    if(!shopid){
      return res.status(200).json({
        success:false,
        message:"Please provide shop ID",
      })
    }
   const existingShop=await Merchant.findById(shopid);
   if(!existingShop){
    return res.status(200).json({
      success:false,
      message:"Canteen is not present Please Register Your canteen first",
    })
   }
   if(existingShop.ownerEmail!=payload.email){
    return res.status(200).json({
      success:false,
      message:"Owner Email is not matched with the token",
    })
   }
   if (existingShop.menuitems.length){
   for (const itemid of existingShop.menuitems) {
     const item = await Item.findById(itemid);
     if (item) {
      const imageUrlToBeDeleted=item.imageUrl;
       await deleteImageFromCloudinary(imageUrlToBeDeleted);
       await Item.findByIdAndDelete(itemid);
     }
   }
   }

   await Merchant.findByIdAndDelete(shopid);
   res.status(200).json({
    success:true,
    message:`${existingShop.canteenName} is successfully Deleted`,
   })
  }
  catch(error){
    console.log(error);
    return res.status(400).json({
      success:false,
      message:"SomeThing Went wrong"
    })
  }
}
