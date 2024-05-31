const express = require("express");
const router = express.Router();
const { userSignup } = require("../controllers/signup"); //For both customer and owner
const {userLogin}=require("../controllers/login");
const {auth,isCustomer,isOwner}=require("../middlewares/auth");
const {addCanteen,addItem}=require("../controllers/addCanteen");
const {profileDetails}=require("../controllers/profileDetails");

//Signup Part
router.post("/signup", userSignup);
//login Part
router.post("/login",userLogin);
//addCanteen
router.post("/addCanteen",addCanteen);

router.post("/addCanteen/menuItem",addItem);
router.post("/dashboard/settings",profileDetails)
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