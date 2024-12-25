const mongoose=require("mongoose");
const {v4}=require("uuid");

const bannerSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    superAdminId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    fileName:{
        type:String    
    },
    filePath:{
        type:String
    },
    fileType:{
        type:String
    },
    fileOriginalName:{
        type:String
    }
   

},{timestamps:true})

const bannerModel=mongoose.model("Banner",bannerSchema);

module.exports={bannerModel}