const mongoose=require("mongoose");
const {v4}=require("uuid");


const pollSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    adminId:{
        type:String,
        required:true,
    },
    pollName:{
        type:String,
        trim:true,
        required:true,
    },
    movies:[{
        movieName: String,
        votes:String,
      }],
},{timestamps:true})

const pollModel=mongoose.model("Poll",pollSchema);

module.exports={pollModel}