const express=require('express');

//create a express js application .This is an instance of express 
const app=express();


//handle the request
app.use("/test",(req,res)=>
{
    res.send("Hello from the Server")
})

// "/test" is a route
// and callback function is a request handler in res.send()




app.listen(4000,()=>
{
    console.log("Server is successfully listeing o port 4000....")
});

