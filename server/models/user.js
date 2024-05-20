const mongoose = require("mongoose");

// Define the schema for merchants
const userschema = new mongoose.Schema({
  regno: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userschema);

module.exports = User;
