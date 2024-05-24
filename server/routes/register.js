const express = require("express");
const router = express.Router();
const { userSignup } = require("../controllers/signup"); //For both customer and owner

//Signup Part
router.post("/signup", userSignup);
module.exports = router;