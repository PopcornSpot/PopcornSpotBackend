const authSignIn=require("../models/auth.model");
const sendMailToUser = require("../utils/emailSend");
const {passwordGenerator}=require("../utils/generator")
const bcrypt = require("bcrypt")
const generateToken=require("../middlewares/authToken")


const signUp =async(req,res)=>{
    try{  
       const { email,userName } = req.body; 
       const findEmail = await authSignIn.authSignIn.findOne({email});
      
       if(findEmail) return res.status(400).json({Message: "Email Already Exists"});
       const password = passwordGenerator(8)
       console.log(password);
       const hash=await bcrypt.hash(password,10);
       let data = {
        ...req.body,
        password:hash
        
       }
       await authSignIn.authSignIn.create(data)
       await sendMailToUser.sendMailToUser(email,password,userName); 
      res.json({
        Message:"Registered Sucessfully......"
      })

    }
    catch(error){
      res.json({Message:error.Message})
    }
}



const authsignIn=async(req,res)=>{
  try{
    const { email, password } = req.body;
    const findEmail = await authSignIn.authSignIn.findOne({ email });
    if (!findEmail) return res.status(400).json({ Message: "Email Not Register..." });
    const findPassword = await bcrypt.compare(password, findEmail.password);
    if (!findPassword) return res.status(400).json({ Message: "Incorrect password.." });
    const token = generateToken.generateToken(findEmail);
    res.json({ token, Message: "SignIn successfully..." });
  }
catch(err){
res.json({Error:err.message})
}
}




module.exports={signUp,authsignIn}