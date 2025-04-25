const express=require('express')
const { registerUser, loginUser } = require('../control/userctrl')
const userRouter=express.Router()



userRouter.post('/registeruser',registerUser)
userRouter.post('/userlogin',loginUser)

module.exports=userRouter;