const express=require("express");

const requestAuth=express.Router();
const {userAuth}=require("../middlewares/auth");


requestAuth.post("/sendConnectionRequest",userAuth,(req,res)=>
    {
        const user=req.user;
        //Sending a connection request
        console.log("Sending A connection Request");
    
        res.send(user.firstName+" Send the connection request");
    }
)
    
module.exports=requestAuth;