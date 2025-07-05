const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        return res.json({msg:"token is missing"})
    }
    jwt.verify(token,process.env.JWT_Secret_Key,(err,user)=>{
        if(err){
            return res.json({msg:"Invalid token"})
        }else{
            next()
        }
    })
}
module.exports=verifyToken;