const express=require("express");
const app=express();
const cookieParser=require("cookie-parser"); //for cookie parsing used for getting JWT Token
require("dotenv").config();

const PORT=process.env.PORT||3000;

app.use(express.json()); 
var cors = require("cors");
app.use(cors());
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
app.use("/",register);

app.listen(PORT,()=>{
console.log(`App is running at ${PORT}`);
})