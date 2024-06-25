const express=require("express");
const app=express();
const cookieParser=require("cookie-parser"); //for cookie parsing used for getting JWT Token
require("dotenv").config();

const PORT=process.env.PORT||3000;

app.use(express.json()); 

var cors = require("cors");
// //app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:3000","http://192.168.31.158:3000"] ,//front end URL
//     credentials: true,
//   })
// );

const whitelist = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_NETWORK,
];
console.log("Whitelist:", whitelist); 
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
//fileUpload
const fileupload = require("express-fileupload"); //server tak file upload kar paye
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDr: "/tmp/",
  })
);




const db=require("./config/database");
db.connect();
//cloud se connect
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();
//API Routes

const register=require("./routes/register");
const ownerRoutes=require("./routes/ownerRoutes");
const profileRoutes=require("./routes/profileRoutes")
const customerRoutes=require("./routes/customerRoutes");
const paymentRoutes =require("./routes/paymentRoutes");
app.use("/",register);
app.use("/owner",ownerRoutes);
app.use("/customer",customerRoutes);
app.use("/profile",profileRoutes);
app.use("/payment",paymentRoutes);

app.listen(PORT,'0.0.0.0',()=>{
console.log(`App is running at ${PORT}`);
})