const express=require('express')
const { registerUser, loginUser, viewproducts, addCart,fetchCartById,createOrder } = require('../control/userctrl')
const userRouter=express.Router()



userRouter.post('/registeruser',registerUser)
userRouter.post('/userlogin',loginUser)
userRouter.get('/getProducts',viewproducts)
userRouter.post('/addcart',addCart)
userRouter.get('/viewcartbyid',fetchCartById)
userRouter.post('/addorder',createOrder)
module.exports=userRouter;