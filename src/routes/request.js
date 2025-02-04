const express=require("express");

const requestAuth=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")


requestAuth.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];

        //other than ignored and intersted status will not allowed
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status Type"})
        }
         

        
        //the request must send to the valid user that be present in the database
        const toUser=await User.findById(toUserId);
        if(!toUser)
        {
            return res.status(400).json({message:"User Not Found!!!"});
        }
        //if already connection request is present then there will not be another same request
        //if A send to B then there must be seen that B not send to A and viceversa
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).
            send({message:"Connection Request Already Exist"})
        }

        


        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data=await connectionRequest.save();
        res.json({
            message:"Connection Request Sent Successfully",
            data,
        })

    }
    catch(err)
    {
        res.status(400).send("ERROR: "+err.message);
    }
}
    
)
    
module.exports=requestAuth;