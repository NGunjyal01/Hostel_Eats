const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.userSignup = async (req, res) => {
  try {
    const { regno, firstname, lastname, phone, email, password } = req.body;

    if (!regno || !firstname || !lastname || !phone || !email || !password) {
      console.log("not all fields...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ regno });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
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

    console.log("s");
    const user = await User.create({
      regno,
      firstname,
      lastname,
      phone,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      data: user,
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Went Wrong",
    });
  }
};
