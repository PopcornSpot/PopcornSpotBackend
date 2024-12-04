const mongoose=require("mongoose");
const {v4}=require("uuid");


const createAdminSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    superAdminId:{
        type:String,
        required:true,
    },
    adminName:{
        type:String,
        required:true,
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
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    noOfTheatres:{
        type:String,
        required:true
    },
    theatreName:{
        type:String,
        required:true
    },
    theatreID:{
        type:String,
        required:true,
        unique:true,
    },
    location:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },

},{timestamps:true})

const createAdminModel=mongoose.model("Admin",createAdminSchema);

module.exports={createAdminModel}