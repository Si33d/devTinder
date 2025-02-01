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

//getUserById
app.get('/getUserById',async(req,res)=>
{
    const userId=req.body._id;
    try{
        const user=await User.find({_id:userId})
        if(!user)
        {
            res.status(404).send("User Not Found")
        }
        else{
            res.send(user);
        }
    }
    catch(err)
    {
        res.status(404).send("User Not Found")
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

//delete a user from database
app.delete("/user",async(req,res)=>
{
    const userId=req.body.userId ;
    try{
        //this will also work
        const user=await User.findByIdAndDelete({_id:userId})
        //shorthand for below line
        //const user=await User.findByIdAndDelete(userId)
        res.send("User Deleted Successfully")
    }
    catch(err)
    {
        res.status(400).send("Something Went Wrong")
    }
})

//Update a user from the database by id
app.patch("/user/:userId",async(req,res)=>
{
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed)
        {
            throw new Error("Update Not Allowed");
        }
        if(data?.skills.length>10)
        {
            throw new Error("Skills Cannot be More Than 10")
        }

        await User.findByIdAndUpdate({_id:userId},data,{
                returnDocument:"after",
                runValidators:true,
            });
        res.send("User Updated Successfully");
    }
    catch(err)
    {
        res.status(404).send("Something Went Wrong")
    }
}) 
//Update a user from the database by email
app.patch("/userbyEmail",async(req,res)=>
{
    const userMailId=req.body.emailId;
    const data=req.body;

    const query={emailId:userMailId}
    try{
        await User.findOneAndUpdate(query,data)
        res.send("User Updated Successfully")
    }
    catch{
        res.status(404).send("Something Went Wrong");
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



