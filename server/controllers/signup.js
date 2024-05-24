const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.userSignup = async (req, res) => {
  try {
    const { accountType, phone, email, firstName, lastName, password } =
      req.body;

    if (
      !accountType ||
      !phone ||
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    const existingPhone = await User.findOne({ phone});
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone Number Already Exist",
      });
    }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email Already Exist",
        });
      }

    //Hashing Of pAssword
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in Hashing Password",
      });
    }


    const user = await User.create({
      accountType,
      phone,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return res.status(200).json({
      data: user,
      success:true,
      message:"User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Went Wrong",
    });
  }
};
