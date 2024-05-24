const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ["Owner", "Customer"],
    required: true,
  },
  phone: {
    type:String,
    required: true,
    maxlength: 10, 
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userschema);

module.exports = User;
