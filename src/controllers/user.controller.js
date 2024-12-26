const sendMailToUser = require("../utils/emailSend");
const {passwordGenerator}=require("../utils/generator")
const bcrypt = require("bcrypt")
const generateToken=require("../middlewares/genarateToken");
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


const userRegister =async(req,res)=>{
    try{ 
       const { email,userName } = req.body; 
       const findEmail = await userModel.findOne({email});
      
       if(findEmail) return res.status(400).json({Message: "Email Already Exists"});
       const password = passwordGenerator(8)
       console.log(password);
       const hash=await bcrypt.hash(password,10);
       let data = {
        ...req.body,
        password:hash  
       }
       await userModel.create(data)
       await sendMailToUser.sendMailToUser(email,password,userName); 
      res.json({
        Message:"Registered Sucessfully......"
      })
    }
    catch(error){
      res.json({Message:error.Message})
    }
}


const userLogin=async(req,res)=>{
  try{
    const { email, password } = req.body;
    const findEmail = await userModel.findOne({ email });
    if (!findEmail) return res.status(400).json({ Message: "Email Not Register..." });
    const findPassword = await bcrypt.compare(password, findEmail.password);
    if (!findPassword) return res.status(400).json({ Message: "Incorrect password.." });
    const token = generateToken.generateToken(findEmail);
    res.json({ token, Message: "SignIn successfully..." });
  }
catch(err){
res.json({Error:err.message}); 
}
}




const userResetPassword=async(req,res)=>{
  try{

    const { email, password,conformPassword } = req.body;
    if(password!==conformPassword) return res.status(400).json({ Message: "Password does not matched..." });
    const findEmail = await userModel.findOne({ email });
    if (!findEmail) return res.status(400).json({ Message: "Email Not Register..." });
    const hash=await bcrypt.hash(password,10);
       let data = {
        ...req.body,
        password:hash  
       }
       await userModel.updateOne({email:findEmail.email}, data)
      res.json({
        Message:"Password Updated Sucessfully......"
      })
    }
    catch(error){
      res.json({Message:error.Message})
    }
}




const getUserDetails = async (req, res) => {
  try {
    let userData = req.userData;
    const details = await userModel.findById({_id:userData._id});

    if (!details) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    res.json({ details, Message: "Success....." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};



const getAllUser = async (req, res) => {
    try {
      const allUsers = await userModel.find();
      if (allUsers.length===0) {
        return res.status(404).json({ Message: "Data not found..." });
      }
      res.json({ allUsers, Message: "Success..." }); 
      
    } catch (err) {
    console.log(err.message);
      res.json({ Error:err.message });
    }
  };

 
 const updateUser=async(req,res)=>{
   try {
     let { _id } = req.query;
     let newFile = req.file;
     let file = req.file;
     let data = {
       ...req.body,
     };
     if (newFile) {
       const oldFile = await userModel.findById(_id);
       if (!oldFile) {
         return res.status(404).json({ Message: "Data Not Found.." });
       }
      if(oldFile.fileOrginalName){
       fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
       data.fileName = newFile.filename;
       data.filePath = newFile.destination;
       data.fileType = newFile.mimetype;
       data.fileOrginalName = newFile.originalname;
      }
      else{
       data = {
         ...data,
         filePath: file.destination,
         fileOriginalName: file.originalname,
         fileName: file.filename,
         fileType: file.mimetype,
       };
      }
     }
     const updatedData = await userModel.findByIdAndUpdate(
       _id,
       data,
       { new: true }
     );
 
     res.json({ updatedData, Message: "Updated Successfully" });
   } catch (error) {
     console.log(error.message);
     res.json({
       Error: error.message,
     });
   }
 }





module.exports={
  googleRegister,
  userRegister,
  userLogin,
userResetPassword,
getUserDetails,
getAllUser,
updateUser


}