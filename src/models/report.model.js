const mongoose=require("mongoose");
const {v4}=require("uuid");


const reportSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    userID:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Pending"
    },
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true,
    },
    subject:{
        type:String,
        required:true,
        trim:true,
    },
    message:{
        type:String,
        required:true,
        trim:true,
    },
   

},{timestamps:true})

const reportModel=mongoose.model("Report",reportSchema);

module.exports={reportModel}