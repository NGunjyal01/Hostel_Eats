const mongoose = require("mongoose");
const User = require("../models/user");
const Item=require("../models/item");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     
      return res.status(200).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "User Not Found Please Signup First",
      });
    }

    //verify password and JWT token creation

    const payload = {
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.accountType,
    };

    if (await bcrypt.compare(password, existingUser.password)) {

      let token = jwt.sign(payload,process.env.JWT_SECRET);
      
        existingUser= existingUser.toObject();
       existingUser.token=token;
      existingUser.password=undefined
    

      //cookie create

      //name data options

      const options={
   //expires:new Date (Date.now()+3*24*60*60*1000),
    httpOnly:true,  //client side access nahi hoga
    sameSite:'Lax',   //Local host -> None and for network Lax
    //secure:true,    
      }
      res.cookie("token",token,options).status(200).json({
        success: true,
        token,
        existingUser,
        message: "User Logged in Succesfully",
      });
    } else {
        //Incorrect Situation
      return res.status(200).json({
        succes: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Log In Failure",
    });
  }
};


//popularDishes

exports.getPopularDishes= async(req,res)=>{
  try{
    const items=await Item.aggregate([{$sample:{size:10}}])

    if(items.size==0){
      return res.status(200).json({
        success:false,
        message:"No items present",
      })
    }
    res.status(200).json({
      data:items,
      success:true,
      message:"Items fetched Successfully",
    })
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}