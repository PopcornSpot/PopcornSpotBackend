const mongoose=require("mongoose");
const {v4}=require("uuid");


const showSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    theatreId:{
        type:String,
        required:true,
    },
    adminId:{
        type:String,
        required:true,
    },
    movie:{
        type:String,
        required:true,
        trim:true,
    },
    showDate:{
        type:String,
        required:true,
    },
    showTime: {
        type: [String],
        default: [],
        required:true,
      },
    screen:{
        type:String,
        required:true,
        trim:true,
    },
    firstClassPrice:{
        type:String,
        required:true,
        trim:true,
    },
    secondClassPrice:{
        type:String,
        required:true,
        trim:true,
    },
    lastDate:{
        type:String,
    },
},{timestamps:true})

const showModel=mongoose.model("Show",showSchema);

module.exports={showModel}