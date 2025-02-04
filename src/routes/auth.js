const express=require("express");

const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation");
const User=require('../models/user')

authRouter.post("/login",async (req,res)=>
    {
        try{
            const {emailId,password}=req.body;
            
            const user=await User.findOne({emailId:emailId})
            if(!user)
            {
                throw new Error("User Not Present")
            }
            const isPasswordValid=await user.verifyPassword(password);
    
            if(!isPasswordValid)
            {
                throw new Error("Invalid Credentials")
            }
            else
            {
                //Create a JWT Token
                const token=await user.getJWT();
    
                //Add the token to cookie and send the response back to the User
                res.cookie("token",token,{
                    expires:new Date(Date.now()+8 * 3600000)
                });            
                res.send("Login Successful")
            }
        }
        catch(err)
        {
            res.status(400).send("ERROR : "+err.message)
        }
});

authRouter.post('/signup',async (req,res)=>
    {
        try{
        //Validation Of Data
        validateSignUpData(req);
    
        //Encrypt The Password
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        //console.log(passwordHash);
    
        //creating the instance of the new Model
        console.log(req.body)
        const user=new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
    
            await user.save();
            res.send("User Added Successfully")
        }
        catch(err)
        {
            res.status(400).send("ERROR : "+err.message)
        }
           
})

authRouter.post('/logout',(req,res)=>
{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout Successfully!!!")

})

module.exports=authRouter;
