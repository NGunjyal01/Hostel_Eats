const express = require("express");
const router = express.Router();
const { userSignup } = require("../controllers/signup"); //For both customer and owner
const {userLogin, getPopularDishes, forgotPassword, verifyOtp}=require("../controllers/login");
const {auth,isCustomer,isOwner}=require("../middlewares/auth");

const {updateDisplayPicture, updateProfile,updateEmail,updatePassword}=require("../controllers/profileSettings");

const { searchItem, searchItemCanteen } = require("../controllers/customer");
const { route } = require("express/lib/router");
//Signup Part
router.post("/signup", userSignup);
//login Part
router.post("/login",userLogin);
//popular dishes
router.get("/getPopularDishes",getPopularDishes)
//forget Password
router.post("/forgetPassword",forgotPassword);
//Verify OTP
router.post("/verifyOtp",verifyOtp);



//Protected Route
router.get("/customer",auth,isCustomer,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Protected Route for Customer",
    })
})

router.get("/owner", auth, isOwner, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route for Owner",
  });
});
module.exports = router;