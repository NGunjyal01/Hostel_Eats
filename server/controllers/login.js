const mongoose = require("mongoose");
const User = require("../models/user");
const Merchant=require("../models/merchant");
const Item=require("../models/item");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP=require("../models/otp");
const nodemailer=require("nodemailer");
const crypto=require("crypto");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { reverse } = require("dns");


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

//forgotpassword

exports.forgotPassword =async(req,res)=>{
  try{
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "User Not Exist Signup First",
      });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now();
    const otpRecord = new OTP({
      email,
      otp,
      otpExpires,
    });
    await otpRecord.save();

    const templatePath = path.join(__dirname, "../templates/otpTemplate.html");

    let html = fs.readFileSync(templatePath, "utf8");
    // Replace placeholder with actual OTP
    html = html.replace("{{OTP}}", otp);
    html=html.replace("{{user}}",existingUser.firstName+" "+existingUser.lastName);
    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: html,
      replyTo: process.env.NO_REPLY_EMAIL,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      data:email,
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

exports.verifyOtp= async(req,res) => {
  try{
      const {email,otp}=req.body;

      const existingOtp=await OTP.findOne({
        email
      })
      if(!existingOtp){
        return res.status(200).json({
          success:false,
          message:"OTP is expired",
        })
      }

      if(existingOtp.otp!==otp){


       return res.status(200).json({
        success:false,
        message:"OTP is wrong",
       })
      }
      await OTP.findOneAndDelete({email});
    res.status(200).json({
      success:true,
      message:"OTP is Verified",
      data:email,
    })

  }
  catch(error){
    console.log(error);
    res.status(200).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}

//Password Change
exports.passwordReset=async(req,res)=>{
  try{
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    if (password !== confirmPassword) {
      res.status(200).json({
        success: false,
        message: "Both Passwords are not matched",
      });
    }
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    const existingUser=await User.findOneAndUpdate({ email }, { password: hashedPassword });

    const expressTime = new Date();
    const currentTime = new Date(
      expressTime.getTime() - expressTime.getTimezoneOffset() * 60000
    );
const currentTimeISO = currentTime.toISOString();
const [date, time] = currentTimeISO.split("T");
const [year, month, day] = date.split("-");
const reversedDate = `${day}-${month}-${year}`;
    const templatePath = path.join(__dirname, "../templates/passwordResetTemplate.html");

    let html = fs.readFileSync(templatePath, "utf8");
      html = html.replace(
       "{{user}}",
      existingUser.firstName + " " + existingUser.lastName
      );
           html = html.replace( "{{date}}",reversedDate );

      //Password Reset Mail
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset Successfully",
          html: html,
          replyTo: process.env.NO_REPLY_EMAIL,
        };
        await transporter.sendMail(mailOptions);
     res.status(200).json({
          success: true,
          message: "Password reset successfully",
        });
  }catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something Went Wrong",
    })
  }
}

//popular Canteens
exports.popularCanteens=async(req,res)=>{
  try{
    const topCanteens = await Merchant.find({ totalRevenue: { $gt: 0 } })
      .sort({ totalRevenue: -1 })
      .limit(10)
      .select(
        "_id canteenName canteenContact address ownerContact ownerName openingTime closingTime"
      )
      .populate({ path: "menuitems", select: "imageUrl" });

       const result=topCanteens.map(canteen=>{
        const firstImageUrl=canteen.menuitems.length>0 ? canteen.menuitems[0].imageUrl : null;
        return {
          _id: canteen._id,
          canteenName: canteen.canteenName,
          canteenContact: canteen.canteenContact,
          address: canteen.address,
          ownerContact: canteen.ownerContact,
          ownerName: canteen.ownerName,
          openingTime: canteen.openingTime,
          closingTime: canteen.closingTime,
          imageUrl: firstImageUrl,
        };
       })
    // Send the response with the top canteens
    res.status(200).json({
      success: true,
      data: result,
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