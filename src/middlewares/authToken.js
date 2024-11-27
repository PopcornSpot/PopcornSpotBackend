const jwt = require("jsonwebtoken")
const signin=require("../models/auth.model")

const key ="qwertyouoipasfghjklzxcvbnm1234567890"

const generateToken= (data)=>{    
const token = jwt.sign({data},key,{expiresIn:"1h"})
return token
}


const verifyToken = async(req,res,next)=>{
    const token =req.headers.authorization;
    
    if(!token){
       return res.status(401).json({Message:"User Must Be Signin....."})
    }
    const withoutBearer=token.split(' ')[1];
    try{
        const payload = jwt.verify(withoutBearer,key);
        const checkUser = await signin.authSignIn.findById(payload.data._id);
        if(!checkUser){
            return res.status(404).json({Message:"User not found for this token...."})
        } 
        req.userData=checkUser;
        next();
    }
    catch(error){        
       res.json({
        Error:error.message
       })
    }

}

module.exports={generateToken,verifyToken}