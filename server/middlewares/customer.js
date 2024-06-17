const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.customerCheck=async(req,res,next)=>{

try{
     const { token } = req.cookies;

     if (!token) {
       return res.status(200).json({
         success: false,
         message: "Your Token is Expired Kindly login first",
       });
     }

try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);
     if (payload.role == "Owner") {
       return res.status(200).json({
         success: false,
         message: "Owner Account Type is Not valid",
       });
     }
  req.user = payload;
} catch (error) {
  return res.status(401).json({
    success: false,
    message: "Token is Invalid",
  });
}

  
     next();
}
catch(error){
    console.log(error);
    res.status(400).json({
        success:false,
        message:"Something Went Wrong in Middleware",
    })
}

}