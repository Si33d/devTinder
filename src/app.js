const express=require('express');
const connectDB=require('./config/database')
const {validateSignUpData}=require("./utils/validation")

const User=require('./models/user')
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser"); 
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")


//create a express js application .This is an instance of express 
const app=express();
app.use(express.json());
app.use(cookieParser())



app.post("/login",async (req,res)=>
{
    try{
        const {emailId,password}=req.body;
        
        const user=await User.findOne({emailId:emailId})
        if(!user)
        {
            throw new Error("User Not Present")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid)
        {
            throw new Error("Invalid Credentials")
        }
        else
        {
            //Create a JWT Token
            const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",
                {expiresIn:"7d"}
            )

            //Add the token to cookie and send the response back to the User
            res.cookie("token",token,{
                expires:new Date(Date.now()+8+3600000)
            });            
            res.send("Login Successful")
        }
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message)
    }
});

//profileAPI
app.get("/profile",userAuth,async (req,res)=>
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

app.post("/sendConnectionRequest",userAuth,(req,res)=>
{
    const user=req.user;
    //Sending a connection request
    console.log("Sending A connection Request");

    res.send(user.firstName+" Send the connection request")

})

//Feed API--GET/feed-get all users from the database
app.post('/signup',async (req,res)=>
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



