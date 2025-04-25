const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    Username:{type:String},
    Email:{type:String},
    Password:{type:String}
},{timestamps:true})
const User=mongoose.model("user_tbl",userSchema)
module.exports=User