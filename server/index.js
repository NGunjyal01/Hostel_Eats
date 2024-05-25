const express=require("express");
const app=express();

require("dotenv").config();

const PORT=process.env.PORT||3000;

app.use(express.json());
var cors = require("cors");
app.use(cors());

const db=require("./config/database");
db.connect();

//API Routes

const register=require("./routes/register");
app.use("/",register);

app.listen(PORT,()=>{
console.log(`App is running at ${PORT}`);
})