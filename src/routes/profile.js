const express=require("express");

const profileAuth=express.Router();
const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation")

profileAuth.get("/profile/view",userAuth,async (req,res)=>
    {
        try{
        const user=req.user;
        res.send(user);
        }
        catch(err)
        {
            res.status(400).send("ERROR : "+err.message)
        }
    })

profileAuth.patch("/profile/edit",userAuth,async(req,res)=>
{
    try{
        if(!validateEditProfileData(req))
            {
                throw new Error("Invalid Edit Request!!!");
            }
            const loggedInUser=req.user;
        
            Object.keys(req.body).every((key)=>(loggedInUser[key]=req.body[key]));
        
            await loggedInUser.save();
        
            res.send(`${loggedInUser.firstName} Profile Updated Successfully`);
        
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+ err.message)
    }
})

profileAuth.patch("/profile/password",async(req,res)=>
{
    try{
        
    }
    catch(err)
    {
        res.status(400).send("Invalid Credentials");
    }
})

module.exports=profileAuth;