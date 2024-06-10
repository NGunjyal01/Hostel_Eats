const mongoose=require("mongoose");
const User=require("../models/user");
const Item=require("../models/item");
const Merchant=require("../models/merchant");
const jwt=require("jsonwebtoken");
require("dotenv").config();

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

const currentTimeString = currentTime.toISOString();
const [date, time] = currentTimeString.split("T");
const [year, month, day] = date.split("-");
const [hours, minutes, seconds] = time.split(":");

// console.log("Current hour:", hours);
// console.log("Current minutes:", minutes);
const result = items.map((item) => {
const openingTime = item.shopid.openingTime.toString();
const [openHour, openMinutes] = openingTime.split(":");
  const closingTime = item.shopid.closingTime.toString();
  const [closeHour, closeMinutes] = closingTime.split(":");


const currentHour = parseInt(hours);
const currentMinutes = parseInt(minutes);
const openingHour = parseInt(openHour);
const openingMinutes = parseInt(openMinutes);
const closingHour = parseInt(closeHour);
const closingMinutes = parseInt(closeMinutes);
let status;
if ( currentHour < openingHour || (currentHour === openingHour && currentMinutes < openingMinutes) ||currentHour > closingHour ||(currentHour === closingHour && currentMinutes > closingMinutes)) {
  status = "Closed";
} else {
  status = "Open";
}

  return {
    itemid: item._id,
    shopid: item.shopid._id,
    itemName: item.name,
    description: item.description,
    category: item.category,
    price: item.price,
    canteenName: item.shopid.canteenName,
    status: status,
  };
});
      //shop name add krna hai abhi
      res.status(200).json({
        data: result,
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

//search based on Item and Restaurant