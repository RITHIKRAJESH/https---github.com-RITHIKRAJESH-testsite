const mongoose=require('mongoose')

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.dbConnection_String)
        console.log("Database connected sucessfully")
    }catch(err){
        console.log("Error occured",err)
    }
}

module.exports=dbConnect