const mongoose = require("mongoose");
const Merchant = require("../models/merchant");
const User=require("../models/user");
const Item = require("../models/item");
const jwt=require("jsonwebtoken");
const Order=require("../models/order");
require("dotenv").config();

// const cloudinary = require("cloudinary").v2;
const {isFileTypeSupported,uploadFileToCloudinary}=require("../utils/cloudinary")
//Canteen Add
exports.addCanteen = async (req, res) => {
  try {
    const { canteenName, canteenContact, address,ownerContact,ownerName,ownerEmail, licenseNumber,openingTime,closingTime } = req.body;
    if (!canteenName || !canteenContact || !address || !ownerContact || !ownerName || !ownerEmail || !licenseNumber ||!openingTime || !closingTime) {
      
      return res.status(200).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const existingShop = await Merchant.findOne({ canteenName });
    if (existingShop) {
      return res.status(200).json({
        success: false,
        message: "Canteen Already Exist",
      });
    }
          const existingCanteenPhone = await Merchant.findOne({ canteenContact });
          if (existingCanteenPhone) {
            return res.status(200).json({
              success: false,
              message: "Canteen Phone Number Already Exist",
            });
          }

            const existingLicenseNumber = await Merchant.findOne({ licenseNumber});
            if (existingLicenseNumber) {
              return res.status(200).json({
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
      openingTime,
      closingTime,
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

//Only Single Item
exports.addItem= async(req,res) =>{

 try {

   const {shopid,name, description, category, price } = req.body;
  console.log(req.body);
  const file=req.files.imageFile;
  
 console.log(file);
   const supportedTypes=["jpg","jpeg","png"];
   const fileLength=file.name.split('.');
   const fileType=file.name.split('.')[fileLength.length-1].toLowerCase();
  //Image size must be less than 1mb
 if (file.size > 3 * 1024 * 1024) {
   return res.status(200).json({
     success: false,
     message: "Image File size is more than 3mb",
   });
 }
  

   if (!name || !description || !category || !price) {
     return res.status(200).json({
       success:false,
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
     return res.status(200).json({
       success: false,
       message: "Merchant Not Exist",
     });
   }
   try {
     // Find items with the specified shop ID and name using for multiple Item validation
     const items = await Item.find({ shopid: shopid, name: name  });

     if (items.length > 0) {
   return res.status(200).json({
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
      return res.status(200).json({
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


//to get all canteen using JWT Token
exports.getAllCanteen= async(req,res) => {
  try{
   //console.log(req);
     const {token}=req.cookies;
      if (!token) {
        return res.status(400).json({
          sucess: false,
          message: "Please provide token",
        });
      }
     const payload=jwt.verify(token,process.env.JWT_SECRET);
   //console.log(payload);
   const canteens = await Merchant.find({ ownerEmail:payload.email});
if(canteens.length==0){
  return res.status(200).json({
    success:false,
    message:"Canteen is not created Yet Please create your canteen first",
  })
}

const owner= await User.findOne({email:payload.email});
//console.log(owner);
const responseData = canteens.map((canteen) => ({
  id: canteen._id,
  canteenName: canteen.canteenName,
  canteenContact: canteen.canteenContact,
  address: canteen.address,
  licenseNumber: canteen.licenseNumber,
  openingTime:canteen.openingTime,
  closingTime:canteen.closingTime,
  monthlyRevenue:canteen.monthlyRevenue,
  totalRevenue:canteen.totalRevenue,
  onlineMoney:canteen.onlineMoney,
  cashMoney:canteen.cashMoney,
}));


     res.status(200).json({
      OwnerName: owner.firstName + " "+owner.lastName,
      Email:owner.email,
      Phone:owner.phone,
      data:responseData,
      success:true,
      message:"You Can view Your Canteen",
     })


  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",

    })
  }
}

//to get all canteen details using JWT Token
exports.getCanteenDetails = async(req,res) => {
  try{
      //taking token from request
      const {token}=req.cookies;
     // console.log(req);
      const {id}=req.query;
      if(!token || !id){
         return res.status(400).json({
           sucess:false,
           message: "Token is Expired please Login first",
         });
      }
      const payload=jwt.verify(token,process.env.JWT_SECRET);
      const canteens = await Merchant.find({
        ownerEmail:payload.email
      })
      if (canteens.length == 0) {
        return res.status(400).json({
          success: false,
          message:
            "Canteen is not created yet Please create Your canteen first ",
        });
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID",
        });
      }
      const specificCanteen = await Merchant.findOne({ _id: id }).populate(
        "menuitems"
      );
      //console.log(specificCanteen);
      if(!specificCanteen){
        return res.status(200).json({
          success:false,
          message:"Canteen is not present",
        })
      }
      res.status(200).json({
        data: specificCanteen,
        success: true,
        message: "You Can view Your Canteen Full details",
      });



  }
  catch(error){
    console.log(error);
    res.status(400).json (
      {
        success:false,
        message:"Something Went Wroong",
      }
    )
  }
}


//multiple Items Register 
exports.addItems = async (req, res) => {
    try {
      const { shopid, name, description, price, category } = req.body;
      console.log(req.body);
      console.log(req.files.imageFile);
      const files = req.files ? req.files.imageFile : null;

      // Checking if SHOP ID is Valid or not
      if (!mongoose.Types.ObjectId.isValid(shopid)) {
        return res.status(400).json({
          success: false,
          message: "Invalid shop ID means does not satisfy Mongoose criteria",
        });
      }

      // Checking if Shop Exist or not based on shopid
      const existingShop = await Merchant.findById(shopid);
      if (!existingShop) {
        return res.status(400).json({
          success: false,
          message: "Merchant does not exist please register your canteen first",
        });
      }

      const items = [];
      for (let i = 0; i < name.length; i++) {
        //Validation of empty fields
        if (!name[i] || !description[i] || !price[i] || !category[i]) {
          return res.status(400).json({
            success: false,
            message: `Please fill all fields for item at index ${i}`,
          });
        }

        // Checking if item already exists We have to make sure Item name must be unique 
        const existingItem = await Item.findOne({ shopid, name: name[i] });
        if (existingItem) {
          return res.status(400).json({
            success: false,
            message: `Item '${name[i]}' already exists`,
          });
        }

        // Validate image file if present
        let imageUrl = null;
        if (files && files[i]) {
          const file =  files[i];
          const supportedTypes = ["jpg", "jpeg", "png"];
          const fileType = file.name.split(".").pop().toLowerCase();

          if (file.size > 300 * 1024) {
            // 300 KB limit
            return res.status(400).json({
              success: false,
              message: `Image file size for item '${name[i]}' is more than 300KB`,
            });
          }

          if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
              success: false,
              message: `Image file type for item '${name[i]}' is not supported`,
            });
          }

          const response = await uploadFileToCloudinary(file, "Hosteleats");
          imageUrl = response.secure_url;
        }

        // Create new item
        const item = new Item({
          shopid,
          name: name[i],
          description: description[i],
          category: category[i],
          price: price[i],
          imageUrl,
        });

        items.push(item); //pushing in the items array required for populating
      }

      // Save all items
      const savedItems = await Item.insertMany(items);
     //console.log(savedItems);
      // Update merchant with new items
      const itemIds = savedItems.map((item) => item._id); //getting ids so we can use in merchant menuItems
    //  console.log(itemIds);
      const updatedMerchant = await Merchant.findByIdAndUpdate(
        shopid,
        { $push: { menuitems: { $each: itemIds } } },
        { new: true }
      ).populate("menuitems");

      res.status(200).json({
        data: updatedMerchant,
        success: true,
        message: "Items added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
};


//Get Order For specific Canteen

exports.getOrders=async(req,res)=>{
  try{
    //taking token from request
    const { token } = req.cookies;
       if (!token) {
         return res.status(400).json({
           sucess: false,
           message: "Token is Expired please Login first",
         });
       }
       const payload = jwt.verify(token, process.env.JWT_SECRET);
       const canteens = await Merchant.find({
         ownerEmail: payload.email,
       });
       if (canteens.length == 0) {
         return res.status(400).json({
           success: false,
           message:
             "Canteen is not created yet Please create Your canteen first ",
         });
       }
      

       const {shopid}=req.body;
        const orders = await Order.find({ shopid:shopid})
          .populate({
            path: "items.item",
            select: "_id shopid name description price category imageUrl",
          })
          .sort({ createdAt: -1 })
          .select("_id userid items totalAmount paymentstatus status createdAt");

        if (orders.length === 0) {
          return res.status(200).json({
            success: false,
            message: "No orders found",
          });
        }
        res.status(200).json({
          success: true,
          data: orders,
          message: " Orders Fetched successfully",
        });
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}

//Accept or Reject Order

exports.acceptRejectOrder=async(req,res) =>{
  try{
    const { orderid, status } = req.body;
    // Validate status
    const validStatuses = ["preparing", "rejected","prepared","completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status it must be preparing , rejected, prepared , completed",
      });
    }
    // Find and update order
    const order = await Order.findById({_id:orderid});
    if (!order) {
      return res.status(200).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();
    // Emit status update to customer
    const io = req.app.get("io");
    io.to(order.userid.toString()).emit("orderStatusUpdate", {
      orderid,
      status,
    });
  

    res.status(200).json({
      success: true,
      message: `Order ${status} successfully`,
      data:order,
    });
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}

//Live orders

exports.liveOrders=async(req,res)=>{
  try{
      const payload=req.user;

      const orders = await Order.find({
        merchantid: payload.id,
        status: { $ne: "completed" },
      })
        .populate({ path: "items.item", select: "name imageUrl shopid" })
        .sort({ createdAt: -1 })
        .select(
          "_id userid merchantid shopid items totalAmount paymentStatus status createdAt"
        );
    const updatedOrder=await Promise.all(
      orders.map(async(order)=>{
        const canteen=await Merchant.findById(order.shopid).select("canteenName");

        //First Item Image URL
        const firstImageUrl=order.items.length>0 ? order.items[0].item.imageUrl:null;
        return {
          ...order.toObject(),
          canteenName:canteen?canteen.canteenName :"Unknown",
          imageUrl:firstImageUrl,
        }
      })
    )


      res.status(200).json({
        success:true,
        data:updatedOrder,
        message:"Succes Ho gya",
      })
  }
  catch(error){
    console.log(error);
    return res.status(200).json({
      message:"Something Went Wrong",
      success:false,
    })
  }
} 