const jwt=require("jsonwebtoken");

require("dotenv").config();

exports.auth=(req,res,next)=>{

//next for multiple authorization
try{
//extract JWT Token

const token=req.body.token;
if(!token){
    return res.status(401).json({
        success:false,
        message:'Token is missing',
    })
}

//verify the token

try{
    const payload=jwt.verify(token,process.env.JWT_SECRET);
  //  console.log(payload);
    req.user=payload;
}
catch(error){
return res.status(401).json({
  success: false,
  message: "Token is Invalid",
});

}
next();
}catch(error){
return res.status(401).json({
  success: false,
  message: "Something went wrong while verifying",
});
}

}


exports.isCustomer= (req,res,next)=>{
 try{
       if(req.user.role!="Customer"){
return res.status(401).json({
  success: false,
  message: "This is Protected route for Customer",
});

       }
       next();
     }
 catch(error){
return res.status(500).json({
  success: false,
  message: "User Role not matching",
});
 }

}


exports.isOwner=(req,res,next)=>{
    try {
      if (req.user.role != "Owner") {
        return res.status(401).json({
          success: false,
          message: "This is Protected route for Owner",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User Role not matching",
      });
    }

}