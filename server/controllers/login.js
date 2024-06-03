const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
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

      let token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h",
      });
      
        existingUser= existingUser.toObject();
       existingUser.token=token;
      existingUser.password=undefined
    

      //cookie create

      //name data options

      const options={
    expires:new Date (Date.now()+3*24*60*60*1000),
    httpOnly:true,  //client side access nahi hoga
    sameSit:'None',
    secure:true,
      }
      res.cookie("token",token,options).status(200).json({
        succes: true,
        token,
        existingUser,
        message: "User Logged in Succesfully",
      });
    } else {
        //Incorrect Situation
      return res.status(403).json({
        succes: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Log In Failure",
    });
  }
};


//Log IN with OTP (Using phone number)