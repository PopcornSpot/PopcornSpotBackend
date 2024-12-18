const mongoose=require("mongoose");
const {v4}=require("uuid");


const screenSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    adminID:{
        type:String,
        required:true,
    },
    screenNo:{
        type:String,
        required:true,
        trim:true,
    },
    totalSeats:{
        type:String,
        trim:true,
        required:true,
    },
    firstClassSeats:{
        type:String,
        required:true,
        trim:true,
    },
    secondClassSeats:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true})

const screenModel=mongoose.model("Screen",screenSchema);

module.exports={screenModel}