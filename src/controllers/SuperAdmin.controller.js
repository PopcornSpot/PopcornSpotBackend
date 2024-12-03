const superAdminModel=require("../models/superAdmin.model");
const sendMailToUser = require("../utils/emailSend");
const {passwordGenerator}=require("../utils/generator")
const bcrypt = require("bcrypt")
const generateToken=require("../middlewares/authToken")


const superAdminRegister =async(req,res)=>{
    try{ 
       const { email,userName } = req.body; 
       const findEmail = await superAdminModel.SuperAdminModel.findOne({email});
      
       if(findEmail) return res.status(400).json({Message: "Email Already Exists"});
       const password = passwordGenerator(8)
       console.log(password);
       const hash=await bcrypt.hash(password,10);
       let data = {
        ...req.body,
        password:hash
        
       }
       await superAdminModel.SuperAdminModel.create(data)
       await sendMailToUser.sendMailToUser(email,password,userName); 
      res.json({
        Message:"Registered Sucessfully......"
      })

    }
    catch(error){
      res.json({Message:error.Message})
    }
}



const superAdminLogin=async(req,res)=>{
  try{
    const { email, password } = req.body;
    const findEmail = await superAdminModel.SuperAdminModel.findOne({ email });
    if (!findEmail) return res.status(400).json({ Message: "Email Not Register..." });
    const findPassword = await bcrypt.compare(password, findEmail.password);
    if (!findPassword) return res.status(400).json({ Message: "Incorrect password.." });
    const token = generateToken.generateToken(findEmail);
    res.json({ token,findEmail, Message: "SignIn successfully..." });
  }
catch(err){
res.json({Error:err.message}); 
}
}



const superAdminResetpass=async(req,res)=>{
  try{

    const { email, password,conformPassword } = req.body;
    if(password!==conformPassword) return res.status(400).json({ Message: "Password does not matched..." });
    const findEmail = await superAdminModel.SuperAdminModel.findOne({ email });
    if (!findEmail) return res.status(400).json({ Message: "Email Not Register..." });
    const hash=await bcrypt.hash(password,10);
       let data = {
        ...req.body,
        password:hash
        
       }
       await superAdminModel.SuperAdminModel.updateOne({email:findEmail.email}, data)
      res.json({
        Message:"Password Updated Sucessfully......"
      })

    }
    catch(error){
      res.json({Message:error.Message})
    }
}


const getSuperAdmin = async (req, res) => {
  try {
    let { _id } = req.query;
    const superAdmin = await superAdminModel.SuperAdminModel.findById(_id);

    if (!superAdmin) {
      return res.status(404).json({ Message: "Details Not Found" });
    }
    res.json({ superAdmin, Message: "Success....." }); 
  } catch (err) {
    res.json({ Error: err.message });
  }
};




const updateSuperAdmin=async(req,res)=>{
  try{
  let {_id}=req.query;
  let data =req.body;
const updatedDetails = await superAdminModel.SuperAdminModel.findByIdAndUpdate(_id, data, { new: true })
if(!updatedDetails){
  return res.status(404).json({ Message: "Admin Not Found" });
}
res.json({Message:"Updated Successfully..."})
}
catch(err){
res.json({Error:err.message})
}
}




module.exports={superAdminRegister,superAdminLogin,superAdminResetpass,getSuperAdmin,updateSuperAdmin}