const express=require('express')
const app=express()
const cors=require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const dbConnect=require('./model/dbconnection')
dbConnect()

const userRouter=require('./routes/userRouter')
app.use('/api/user',userRouter)

app.listen(9000,()=>{
    console.log("Server Started Successfully")
})