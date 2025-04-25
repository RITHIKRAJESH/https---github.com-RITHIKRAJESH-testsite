const User=require('../model/userModel')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=>{
try{
   const {username,email,password} =req.body
   console.log(req.body)
   const data=await User({
    Username:username,
     Email:email,
     Password:password
   })
   await data.save()
   res.json("Data received successfully")
}catch(err){
console.log(err)
}
}

const loginUser=async(req,res)=>{
   try{
      const {email,password}=req.body
      const loggeduser=await User.findOne({Email:email})
      console.log(loggeduser)
     if(loggeduser){
      if(loggeduser.Password == password){
         const token=jwt.sign({id:loggeduser._id},"jwtsecretkey123",{expiresIn:"1h"})
         res.json({msg:"User Logged In Successfull",status:200,token:token})
      }else{
         res.json({msg:"Password is incorrect",status:400})
      }
     }else{
         res.json({msg:"User not found",status:400})
      }
   }catch(err){
      console.log(err)
   }
}


module.exports={registerUser,loginUser}