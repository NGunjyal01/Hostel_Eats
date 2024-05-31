const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ["Owner", "Customer"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others",''],
    default:'',
  },
  dob: {
    type: Date,
    default: "",
  },
  imageUrl: {
    type: String,
    required:true,

  },
});

const User = mongoose.model("User", userschema);

module.exports = User;
