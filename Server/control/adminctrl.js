const User =require('../model/userModel')
const Product=require('../model/productModel')
const Order=require('../model/orderModel')
const viewUser=async(req,res)=>{
    try{
    const users=await User.find()
    res.json(users)
    }catch(err){
        console.log(err)
    }
}

const deleteUser=async(req,res)=>{
    try{
     const id=req.headers.userid
     console.log(id)
     await User.findByIdAndDelete({_id:id})
     res.json("User Deleted Successfully")
    }catch(err){
        console.log(err)
    }
}

const addProducts=async(req,res)=>{
    try{
      const {productName,productDescription,productPrice,productQuantity}=req.body
      const image=req.file.filename
      const products=await Product({
        productName,
        productDescription,
        productPrice,
        productQuantity,
        Image:image
      })
      await products.save()
      res.json({message:"Product Added Successfully",status:200})
    }catch(err){
       console.log(err)
    }
}

const viewproduct=async(req,res)=>{
    try{
          const products=await Product.find()
          res.json(products)
    }catch(err){
        console.log(err)
    }
}

const viewproductbyid=async(req,res)=>{
    try{
          const id=req.headers.id
          const products=await Product.findById({_id:id})
          res.json(products)
    }catch(err){
        console.log(err)
    }
}

const updateProductbyId=async(req,res)=>{
    try{
        const id=req.params.id
        const {productName,productDescription,productPrice,productQuantity}=req.body
        const image=req.file.filename
        const product=await Product.findByIdAndUpdate(id,{
            productName,
            productDescription,
            productPrice,
            productQuantity,
            Image:image
        })
        await product.save()
        res.json({message:"Product updated successfully",status:200})
    }catch(err){
        console.log(err)
    }
}

const viewOrderbyadmin=async(req,res)=>{
   try{
        const userId=req.headers.id
        const orders=await Order.find().populate({
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

const updateStatus=async(req,res)=>{
    try{
        const id=req.headers._id
        const {status}=req.body
        const order=await Order.findById(id)
        order.status=status
        order.save()
        res.json("Order status updated successfully")
    }catch(err){
        console.log(err)
    }
}

module.exports={viewUser,deleteUser,addProducts,viewproduct,viewproductbyid,updateProductbyId,viewOrderbyadmin,updateStatus}