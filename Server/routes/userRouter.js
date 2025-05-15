const express=require('express')
const { registerUser, loginUser, viewproducts, addCart,fetchCartById,createOrder, viewOrder } = require('../control/userctrl')
const userRouter=express.Router()
const verifyToken=require('../auth/jwtauthentication')


userRouter.post('/registeruser',registerUser)
userRouter.post('/userlogin',loginUser)
userRouter.get('/getProducts',verifyToken,viewproducts)
userRouter.post('/addcart',addCart)
userRouter.get('/viewcartbyid',fetchCartById)
userRouter.post('/addorder',createOrder)
userRouter.get('/vieworders',viewOrder)

module.exports=userRouter;