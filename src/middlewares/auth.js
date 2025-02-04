const jwt =require("jsonwebtoken");
const  User=require("../models/user")

// const userAuth=async (req,res,next)=>
// {
//     try
//     {
//         //read the token from the req cookies
//         const {token}=req.cookies;
//         if(!token)
//         {
//             throw new Error("Token Is Not Valid!!!!");
//         }

//     //verify the token
//     const decodedObj=await jwt.verify(token,"DEV@Tinder$790");

//     const {_id}=decodedObj;

//     //Find the User
//     const user=await User.findById(_id)
//     if(!user)
//     {
//         throw new Error("User Not Found");
//     }
//     req.user=user;
//     next();
//     }
//     catch(err)
//     {
//         res.status(400).send("ERROR: "+err.message)
//     }

// }

const userAuth=async(req,res,next)=>
{
    try{
        const {token}=req.cookies;
        if(!token)
        {
            throw new Error("Token is Not Valid ");
        }

        const decodedObj=await jwt.verify(token,"DEV@Tinder$790")

        const {_id}=decodedObj;
        const user=await User.findById(_id)
        if(!user)
        {
            throw new Error("User Not Present");
        }
        req.user=user;
        next();
    }
    catch(err)
    { 
        res.status(400).send("ERROR: "+err.message)
    }
}




module.exports={userAuth,}