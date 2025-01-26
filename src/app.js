const express=require('express');

//create a express js application .This is an instance of express 
const app=express();

//This will only handle GET call to /user
app.get("/user",(req,res)=>
{
    res.send({firstName:"Siddharth",lastName:"Kumbhar"})
})

app.post("/user",(req,res)=>
{
    //save data to DB
   // console.log("Save Data to Database")
    res.send("Data Successfully saved to the Database")
})

app.delete("/user",(req,res)=>
{
    res.send("Deleted Successfully  ")
})

//handle the request
//TGis will match all the Http method API calls to /test
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

