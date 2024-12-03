const mongoose=require("mongoose");
const {v4}=require("uuid");


const superAdminRegisterSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }

},{timestamps:true})

const SuperAdminModel=mongoose.model("SuperAdminRegister",superAdminRegisterSchema);

module.exports={SuperAdminModel}