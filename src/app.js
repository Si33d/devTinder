const express=require('express');
const connectDB=require('./config/database')

const User=require('./models/user')
//create a express js application .This is an instance of express 
const app=express();
app.use(express.json())


//get User By email
app.get('/user',async(req,res)=>
{
    const userMail=req.body.emailId;
    try{
        const users=await User.find({emailId:userMail})
        if(!users)
        {
            res.status(404).send("User Not Foound")
        }
        else{
            res.send(users);
        }

    }
    catch(err)
    {
        res.status(404).send("User Not Foound")
    }
})



//Feed API--GET/feed-get all users from the database
app.post('/signup',async (req,res)=>
{
    console.log(req.body)
    const user=new User(req.body)
    // const user=new User(
    //     {
    //         firstName:"Siddharth",
    //         lastName:"Kumbhar",
    //         emailId:"sidkumbhar1703@gmail.com",
    //         password:"Sidhu@123"

    //     }
    // )

    // try{
        await user.save();
        res.send("User Added Successfully")
    // }
    // catch(err)
    // {
    //     res.status(400).send("Error saving the user"+err.message)
    // }
       
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



