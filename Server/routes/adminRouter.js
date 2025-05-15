const express=require('express')
const { viewUser, deleteUser, addProducts, viewproduct, viewproductbyid, updateProductbyId,viewOrderbyadmin, updateStatus } = require('../control/adminctrl')
const multer=require('multer')
const adminRouter=express.Router()
const path=require('path')
const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({storage})

adminRouter.get("/adminviewusers",viewUser)
adminRouter.delete("/userdelete",deleteUser)
adminRouter.post("/addproducts",uploads.single('Image'),addProducts)
adminRouter.get("/viewproducts",viewproduct)
adminRouter.get("/editproduct",viewproductbyid)
adminRouter.put("/updateproduct/:id",uploads.single('Image'),updateProductbyId)
adminRouter.get("/adminvieworders",viewOrderbyadmin)
adminRouter.patch("/updatestatus",updateStatus)
module.exports=adminRouter