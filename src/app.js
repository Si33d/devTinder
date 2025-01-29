const express=require('express');
const connectDB=require('./config/database')

const User=require('./models/user')
//create a express js application .This is an instance of express 
const app=express();
app.use(express.json())

app.post('/signup',async (req,res)=>
{
    console.log(req.body)
    const user=new User(req.body)
    // const user=new User(
    //     {
    //         firstName:"Siddharth",
    //         lastName:"Kumbhar",
    //         email:"sidkumbhar1703@gmail.com",
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



