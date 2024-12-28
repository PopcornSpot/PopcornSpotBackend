const mongoose=require("mongoose");
const {v4}=require("uuid");


const friendSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    userName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    friendId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        trim:true,
        lowercase:true
    },
    mobileNumber:{
        type:String,
    },
    gender:{
        type:String,
    },
    fileName:{
        type:String    
    },

},{timestamps:true})

const friendModel=mongoose.model("Friend",friendSchema);

module.exports={friendModel}