const express=require('express');

//create a express js application .This is an instance of express 
const app=express();

//This will only handle GET call to /user
app.use
("/user",[
         (req,res,next)=>
   {
    //res.send("Route Handler 1 ");
    console.log("Handling the Route User1!! ");
    next(); 
    //res.send("Response!!");
   },
     (req,res,next)=>
   {
    //route handler2
    console.log("Handling the Route User2");
   // res.send("2nd Response!!");
     next();
   },
   (req,res,next)=>
    {
     //route handler3
     console.log("Handling the Route User3");
     //res.send("2nd Response!!");
     next();
    }],[
    (req,res,next)=>
        {
         //route handler2
         console.log("Handling the Route User4");
         res.send("4th Response!!");
         next();
        } ]
); 


app.listen(4000,()=>
{
    console.log("Server is successfully listeing t o port 4000....")
});

 