const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/uploads',express.static('uploads'))
const dbConnect=require('./model/dbconnection')
dbConnect()

const userRouter=require('./routes/userRouter')
app.use('/api/user',userRouter)

const adminRouter=require('./routes/adminRouter')
app.use('/api/admin',adminRouter)


app.listen(9000,()=>{
    console.log("Server Started Successfully")
})