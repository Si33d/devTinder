
 const validator=require("validator")

const validateSignUpData=(req)=>
{
    const{firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Enter A Valid Name : ");
    }
    else if(firstName.length<4 || firstName.length>50)
    {
        throw new Error("First Name should be 4-50 characters")
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is NOt Valid")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Enter A Strong Password")
    }
    
}

const validateEditProfileData=(req)=>
{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ]
    const isEditAllowed=Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field));

    //isEditAllowed is return a boolean value
    return isEditAllowed;
}

module.exports={validateSignUpData,validateEditProfileData,}