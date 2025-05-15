const User=require('../model/userModel')
const jwt=require('jsonwebtoken')
const Product=require('../model/productModel')
const Cart=require('../model/cartModel')
const Order=require('../model/orderModel')
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
         const token=jwt.sign({id:loggeduser._id},process.env.Jwt_Secret_Key,{expiresIn:"1h"})
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

const viewproducts=async(req,res)=>{
    try{
          const products=await Product.find()
          res.json(products)
    }catch(err){
        console.log(err)
    }
}

const addCart=async(req,res)=>{
   const userId=req.headers.userid
   const {productId,Quantity}=req.body
   try{
     const cart=await Cart.findOne({userId:userId,status:"cart"})
     if(cart){
       const productIndex=cart.product.findIndex(p=>
         p.productId==productId
       )
       if(productIndex > -1){
         cart.product[productIndex].quantity+=Quantity || 1
       }else{
         cart.product.push({productId,quantity:Quantity})
       }
       await cart.save()
     }else{
      const cart=await Cart({
         userId,
         product:[{
            productId,
            quantity:Quantity || 1
         }]
      })
      await cart.save()
     }
     res.json("Product Added to cart successfully")
   }catch(err){
      console.log(err)
   }
}

const fetchCartById=async(req,res)=>{
   try{
    const userId=req.headers.id;
    const cartItems=await Cart.findOne({userId,status:"cart"}).populate('product.productId')
    res.json(cartItems)
   }catch(err){
      console.log(err)
   }
}


const createOrder=async(req,res)=>{
   try{
     const userId=req.headers.userid
     console.log(req.body)
     const {cartId,totalAmount,payment,address}=req.body
     const orders=await Order({
      userId,
      cartId,
      totalAmount,
      payment,
      address,
      status:"Order Placed"
     })
     await orders.save()
     const cartItem=await Cart.findOne({_id:cartId})
     cartItem.status="Ordered"
     cartItem.save()
     res.json({message:"Order placed Successfully",status:200})
   }catch(err){
      console.log(err)
   }
}

const viewOrder=async(req,res)=>{
   try{
        const userId=req.headers.id
        const orders=await Order.findOne({userId}).populate({
         path:"cartId",
         populate:{
            path:"product.productId"
         },
        })
        console.log(orders)
        res.json(orders)
   }catch(err){
      console.log(err)
   }
}

module.exports={registerUser,loginUser,viewproducts,addCart,fetchCartById,createOrder,viewOrder}