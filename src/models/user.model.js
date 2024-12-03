const mongoose=require("mongoose");
const {v4}=require("uuid");


const userLoginSchema=new mongoose.Schema({
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

    },
    mobileNumber:{
        type:String,
    },
    picture:{
        type:String,

    }

},{timestamps:true})

const userModel=mongoose.model("User",userLoginSchema);

module.exports={userModel}