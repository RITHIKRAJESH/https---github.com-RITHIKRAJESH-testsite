const mongoose=require('mongoose')

const dbConnect=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/testsite")
        console.log("Database connected sucessfully")
    }catch(err){
        console.log("Error occured",err)
    }
}

module.exports=dbConnect