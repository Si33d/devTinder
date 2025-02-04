
const mongoose=require('mongoose');
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            minLength:4,
            maxLength:50,
            required:true
        },
        lastName:{
            type:String,
            minLength:4,
            maxLength:50
        },
        emailId:{
            type:String,
            trim:true,
            lowercase:true,
            maxLength:20,
            required:true,
            unique:true,
            validate(value)
            {
                if(!validator.isEmail(value))
                {
                    throw new Error("Invalid Email Address : "+value)
                }
            }
        },
        password:{
            type:String,
            required:true,
            unique:true,
            validate(value)
            {
                if(!validator.isStrongPassword(value))
                {
                    throw new error("Enter a Strong Password : "+value)
                }
            }

        },
        age:{
            type:Number,
            //required:true,
            min:18
        },
        gender:{
            type:String,
            //required:true,
            validate(value)
            {
                if(!["male","female","others"].includes(value))
                {
                    throw new error("Gender Data is Not Valid")
                }
            }
        },
        photoUrl:{
            type:String,
            default:"",
            // validate(value)
            // {
            //     if(!validator.isURL(value))
            //     {
            //         throw new Error("Invalid Photo URL :"+value)
            //     }
            // }
        },
        about:{
            type:String,
            default:"This is A Default About A User",
        },
        skills:{
            type:[String],
        }
    },
    {
        timestamps:true,
    }
);

userSchema.methods.getJWT=async function()
{
    const user=this;

    const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",
                    {expiresIn:"7d"});
                    
    return token;

}
userSchema.methods.verifyPassword=async function(passwordInputByUser)
{
    const user=this;
    const passwordHash=this.password;
    //or const passwordHash=user.password;

    const isValidpassword=bcrypt.compare(passwordInputByUser,passwordHash);
    
    return isValidpassword;
}

const User=mongoose.model("User",userSchema);

module.exports=User;