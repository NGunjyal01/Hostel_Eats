const express=require("express");
const app=express();
const cookieParser=require("cookie-parser"); //for cookie parsing used for getting JWT Token
require("dotenv").config();

const PORT=process.env.PORT||3000;

app.use(express.json()); 

var cors = require("cors");
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", //clien URL
    credentials: true,
  })
);
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
app.use("/",register);
app.use("/owner",ownerRoutes);
app.use("/customer",customerRoutes);
app.use("/profile",profileRoutes)

app.listen(PORT,()=>{
console.log(`App is running at ${PORT}`);
})