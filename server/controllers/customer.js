const mongoose=require("mongoose");
const User=require("../models/user");
const Item=require("../models/item");
const Merchant=require("../models/merchant");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const {getCanteenStatus}=require("../utils/status")


//Search Item means Explore Page

exports.searchItem= async(req,res) =>{
    try{

      const { token } = req.cookies;

      if (!token) {
        return res.status(200).json({
          success: false,
          message: "Your Token is Expired Kindly login first",
        });
      }

      const payload=await jwt.verify(token,process.env.JWT_SECRET);

      if(payload.role=="Owner"){
        return res.status(200).json({
            success:false,
            message:"Owner Account Type is Not valid",
        })
      }

      const { itemName } = req.body;

      if (!itemName) {
        return res.status(200).json({
          success: false,
          message: "Please provide Item Name",
        });
      }

      const items = await Item.find({
        name: { $regex: itemName, $options: "i" },
      }).populate("shopid");

      //all the regular expression contains itemName will be fetched

      if (items.length == 0) {
        return res.status(200).json({
          success: false,
          message: `${itemName} is not found`,
        });
      }


const expressTime = new Date();
const currentTime = new Date(
  expressTime.getTime() - expressTime.getTimezoneOffset() * 60000
);
//console.log("Current time Here:", currentTime); //Modified according to time zone




const result = items.map((item) => {

const openingTime = item.shopid.openingTime.toString();
  const closingTime = item.shopid.closingTime.toString();
  //Open or closed
  const status=getCanteenStatus(openingTime,closingTime,currentTime);



  return {
    itemid: item._id,
    shopid: item.shopid._id,
    itemName: item.name,
    description: item.description,
    category: item.category,
    price: item.price,
    canteenName: item.shopid.canteenName,
    imageUrl:item.imageUrl,
    status: status,
  };
});

   const canteenResults = [
     ...new Set(items.map((item) => item.shopid)),
   ].map((canteenId) => {
     const canteen = items.find(
       (item) => item.shopid === canteenId
     ).shopid;
     const openingTime = canteen.openingTime.toString();
     const closingTime = canteen.closingTime.toString();
     const status = getCanteenStatus(openingTime, closingTime, currentTime);
     const itemImage = items.find(
       (item) => item.shopid=== canteenId
     ).imageUrl;

     return {
       shopid: canteen._id,
       canteenName: canteen.canteenName,
       openingTime:canteen.openingTime,
       closingTime:canteen.closingTime,
       status: status,
       imageUrl: itemImage, 
     };
   });
      
      res.status(200).json({
        items: result,
        canteens:canteenResults,
        success: true,
        message: `${itemName} is found successfully`,
      });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        })
    }
}


//Canteen Page fetch on click

exports.getCanteenDetails = async(req,res) =>{
  try{
         const { token } = req.cookies;

       if (!token) {
       return res.status(200).json({
         success: false,
         message: "Your Token is Expired Kindly login first",
       });
      }

const payload = await jwt.verify(token, process.env.JWT_SECRET);

       if (payload.role == "Owner") {
        return res.status(200).json({
       success: false,
       message: "Owner Account Type is Not valid",
      });
       }

       const {id}=req.query;

       if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({
           success: false,
           message: "Invalid ID does not satisfy mongoose criteria",
         });
       }

         const specificCanteen = await Merchant.findOne({ _id: id })
           .populate("menuitems")
           .select(
             "-ownerContact -ownerName -ownerEmail -monthlyRevenue -totalRevenue"
           );;

         if(!specificCanteen){
          return res.status(200).json({
            success:false,
            message:"Canteen Not present",
          })
         }
 
   res.status(200).json({
     data: specificCanteen,
     success: true,
     message: `${specificCanteen.canteenName} full Details`,
   });

         
  }
  catch(error){
     console.log(error);
     return res.status(400).json({
       success: false,
       message: "Something Went Wrong",
     });
  }
}
