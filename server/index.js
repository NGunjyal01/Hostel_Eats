const express=require("express");
const app=express();

require("dotenv").config();

const PORT=process.env.PORT||4000;

app.use(express.json());

const db=require("./config/database");
db.connect();

//API Routes

const register=require("./routes/register");
app.use("/api/v1",register);

app.listen(PORT,()=>{
console.log(`App is running at ${PORT}`);
})