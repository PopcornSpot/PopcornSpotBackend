const adminModel = require("../models/admin.model");
const sendMailToUser = require("../utils/emailSend");
const { passwordGenerator } = require("../utils/generator");
const bcrypt = require("bcrypt");
const fs = require("fs");
const generateToken = require("../middlewares/genarateToken");

const adminRegister = async (req, res) => {
  try {
    const { email, adminName,mobileNumber,theatreID } = req.body;
     
    const findEmail = await adminModel.createAdminModel.findOne({ email });
    if (findEmail)
      return res.status(400).json({ Message: "Email Already Exists" });

    const findNumber = await adminModel.createAdminModel.findOne({ mobileNumber });
    if (findNumber)
      return res.status(400).json({ Message: "MobileNumber Already Exists" });

    const findTheatreID = await adminModel.createAdminModel.findOne({ theatreID });
    if (findTheatreID)
      return res.status(400).json({ Message: "TheatreID Already Exists" });

    const password = passwordGenerator(8);
    const hash = await bcrypt.hash(password, 10);
    let data = {
      ...req.body,
      password: hash,
      superAdminId:req.userData._id,
    };

    const savedAdmin=await adminModel.createAdminModel.create(data);
    if (!savedAdmin)
      return res.status(400).json({ Message: "Admin Not Created" });
    await sendMailToUser.sendMailToUser(email, password, adminName);
    res.json({
      Message: "Registered Sucessfully......",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ Message: error.message });
  }
};

const adminLogin = async  (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await adminModel.createAdminModel.findOne({ email });  
    if (!findEmail)
      return res.status(400).json({ Message: "Email Not Register..." });
    const findPassword = await bcrypt.compare(password, findEmail.password);
    if (!findPassword)
      return res.status(400).json({ Message: "Incorrect password.." });
    const token = generateToken.generateToken(findEmail);  
    res.json({ token, Message: "SignIn successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const  adminResetpass = async (req, res) => {
  try {
    const { email, password, conformPassword } = req.body;
    if (password !== conformPassword)
      return res.status(400).json({ Message: "Password does not matched..." });
    const findEmail = await adminModel.createAdminModel.findOne({ email });
    if (!findEmail)
      return res.status(400).json({ Message: "Email Not Register..." });
    const hash = await bcrypt.hash(password, 10);
    let data = {
      ...req.body,
      password: hash,
    };
    await adminModel.createAdminModel.updateOne(
      { email: findEmail.email },
      data
    );
    res.json({
      Message: "Password Updated Sucessfully......",
    });
  } catch (error) {
    res.json({ Message: error.Message });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const allAdmins = await adminModel.createAdminModel.find();

    if (allAdmins.length === 0) {
      return res.status(404).json({ Message: "Data Not Found" });
    }
    res.json({ allAdmins, Message: "Success....." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

const getSingleAdmin = async (req, res) => {
  try {
    let { _id } = req.query;
    let userData = req.userData;
    
    let singleAdmin
    if(_id){
        singleAdmin = await adminModel.createAdminModel.findById(_id);
    }
    else{
        singleAdmin = await adminModel.createAdminModel.findById(userData._id);
    }

    if (!singleAdmin) {
      return res.status(404).json({ Message: "Admin Not Found" });
    }
    res.json({ singleAdmin, Message: "Success....." });
     
    
  } catch (err) {
    res.json({ Error: err.message });
  }
};



const updateAdmin=async(req,res)=>{
  try {
    let { _id } = req.query;
    let newFile = req.file;
    let file = req.file;
    let data = {
      ...req.body,
    };
    if (newFile) {
      const oldFile = await adminModel.createAdminModel.findById(_id);
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
    const updatedData = await adminModel.createAdminModel.findByIdAndUpdate(
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





const deleteAdmin = async (req, res) => {
  try {
    let { _id } = req.query;

    const deleted = await adminModel.createAdminModel.findByIdAndDelete(_id);
    if (!deleted) {
      return res.json({ Message: "Admin Not Found..." });
    }
    res.json({ Message: "Deleted successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  adminResetpass,
  getAllAdmin,
  deleteAdmin,
  getSingleAdmin,
  updateAdmin
};
