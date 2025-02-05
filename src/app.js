const express=require('express');
const connectDB=require('./config/database')
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser"); 
const jwt=require("jsonwebtoken");

//create a express js application .This is an instance of express 
const app=express();
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter = require('./routes/user');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);




connectDB()
.then(()=>
{
    console.log("Database Connection Established")
    app.listen(4000,()=>
        {
            console.log("Server is successfully listeing to port 4000....")
        });
})
.catch((err)=>
{
    console.error("Database cannot be connected!!");
})



