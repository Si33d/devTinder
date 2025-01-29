
const mongoose=require('mongoose')


const connectDB=async()=>
{
    await mongoose.connect("mongodb+srv://sidkumbhar15:Zyq9ByK2kx0KfYca@namastedev.kioku.mongodb.net/devTinder")
}

module.exports=connectDB;

