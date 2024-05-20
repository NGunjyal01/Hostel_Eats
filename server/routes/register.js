const express = require("express");
const router = express.Router();
const { userSignup } = require("../controllers/signup");
router.post("/signup/user", userSignup);
module.exports = router;