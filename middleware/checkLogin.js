const jwt = require('jsonwebtoken')

const checkLogin=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    try{

        const token= authHeader && authHeader.split(' ')[1]
        if(token==null){
            return res.status(401).json({
                message:'Token error'
            })
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const {username,email,userId}=decode
        req.username=username
        req.email=email
        req.userId=userId
        next()

    }catch(e){
        console.log(e)
        next(e)
    }
}

module.exports=checkLogin