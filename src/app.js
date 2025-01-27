const express=require('express');

//create a express js application .This is an instance of express 
const app=express();

//Handle Auth middleware for All request(GET, POST,PATCH,..) 
//app.all() also can be used
const { adminAuth, userAuth }=require("./middlewares/auth.js")


app.use("/admin",adminAuth)
app.use("/user",userAuth)

app.get("/getUserData",(req,res)=>
{
    try{
        //Logic of DB call and get user data
        throw new Error("dgsww");
        res.send("User Data Sent");

    }catch(err)
    {
        res.status(500).send("Something went Wrong  !!!!!");
    }
    
})

app.use("/",(err,req,res,next)=>{
    //if we get error it can be handle here
    //log your error message
    if(err)
    {
        res.status(500).send("Something went Wrong");
    }
})


app.listen(4000,()=>
{
    console.log("Server is successfully listeing to port 4000....")
});

