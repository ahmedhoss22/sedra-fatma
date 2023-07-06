const jwt=require('jsonwebtoken')
const User = require("../model/user")

const middlware={
    generateToken:(id)=>{
        return jwt.sign(id,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '3d'})
    },
    authorization:async(req,res,nxt)=>{
        const authorization =req.headers['authorization']
        if(!authorization)return res.status(401).send("Not authorized user")
        const token =authorization.split(' ')[1]
        try{    
            const {user}=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            req.user= user
            nxt()
        }catch(err){
            console.log(err.message);
            res.status(401).send("Not authorized user");
        }
    },
}

module.exports=middlware;