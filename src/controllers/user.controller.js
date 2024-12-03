const sendMailToUser = require("../utils/emailSend");
const {passwordGenerator}=require("../utils/generator")
const bcrypt = require("bcrypt")
const generateToken=require("../middlewares/authToken");
const { userModel } = require("../models/user.model");


const googleRegister =async(req,res)=>{
    try{  
       const { email,userName } = req.body; 
       const findEmail = await userModel.findOne({email});
       if(findEmail) {
       const savedUser=findEmail
       const token = generateToken.generateToken(findEmail);
       return res.json({savedUser,token,Message: "Login Sucessfully...."});
       }
       const password = passwordGenerator(8);
       const hash=await bcrypt.hash(password,10);
       let data = {
        ...req.body,
        password:hash 
       }
       const savedUser= await userModel.create(data)
       await sendMailToUser.sendMailToUser(email,password,userName); 
       const token = generateToken.generateToken(findEmail);
       res.json({savedUser,token,
       Message:"Login Sucessfully......"
      })

    }
    catch(error){
      res.json({Message:error.Message})
    }
}












module.exports={googleRegister}