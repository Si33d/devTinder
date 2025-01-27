const express=require('express');

//create a express js application .This is an instance of express 
const app=express();

//Handle Auth middleware for All request(GET, POST,PATCH,..) 
//app.all() also can be used
const { adminAuth, userAuth }=require("./middlewares/auth.js")


app.use("/admin",adminAuth)
app.use("/user",userAuth)

app.get("/user",userAuth,(req,res)=>
{
    res.send("User Data Sent");
})

app.get("/admin/getAllData",(req,res)=>
{ 
        res.send("All Data Sent");
      
});

app.get("/admin/deleteUser",(req,res)=>
{
    res.send("Deleted A User")
});


app.listen(4000,()=>
{
    console.log("Server is successfully listeing to port 4000....")
});

 