const jwt = require("jsonwebtoken")
const superAdmin=require("../models/superAdmin.model")

const key ="qwertyouoipasfghjklzxcvbnm1234567890"

const verifyToken = async(req,res,next)=>{
    const token =req.headers.authorization;
    
    if(!token){
       return res.status(401).json({Message:"User Must Be Signin....."})
    }
    const withoutBearer=token.split(' ')[1];
    try{
        const payload = jwt.verify(withoutBearer,key);
       
        const checkUser =await superAdmin.SuperAdminModel.findById(payload.data._id);
        
        if(!checkUser){
            return res.status(404).json({Message:"Invalid User..."})
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

module.exports={verifyToken}