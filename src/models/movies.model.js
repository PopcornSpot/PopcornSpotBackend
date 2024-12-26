const mongoose=require("mongoose");
const {v4}=require("uuid");


const movieSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    adminId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    title:{
        type:String,
        required:true, 
        trim:true,
    },
    genre:{
        type:String,
        required:true, 
        trim:true,
    },
    language:{
        type:String,
        required:true, 
        trim:true,
    },
    duration:{
        type:String,
        required:true, 
        trim:true,
    },
    releaseDate:{
        type:String,
        required:true, 
        trim:true,
    },
    certificate:{
        type:String,
        required:true, 
        trim:true,
    },
    synopsis:{
        type:String,
        required:true, 
        trim:true,
    },
    director:{
        type:String,
        required:true, 
        trim:true,
    },
    trailerUrl:{
        type:String,
        required:true, 
        trim:true,
    },
    producer:{
        type:String, 
        trim:true,
    },
    hero:{
        type:String,
        required:true, 
        trim:true,
    },
    heroine:{
        type:String,
        required:true, 
        trim:true,
    },
    music:{
        type:String,
        required:true, 
        trim:true,
    },
    format:{
        type:String,
        required:true, 
        trim:true,
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

const movieModel=mongoose.model("Movie",movieSchema);

module.exports={movieModel}