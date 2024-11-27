const mongoose=require("mongoose");
const {v4}=require("uuid");


const authSignInSchema=new mongoose.Schema({
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
    mobileNumber:{
        type:Number,
        required:true
    }

},{timestamps:true})


const authSignIn=mongoose.model("SignIn",authSignInSchema);

module.exports={authSignIn}