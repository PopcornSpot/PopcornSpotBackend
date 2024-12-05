const movieModel=require("../models/movies.model")
const fs=require("fs")


const movieCreate=async (req,res)=>{
    try{
        const { body ,file,userData} = req;
       let data={...body,
        adminId:userData._id,
       }
       if(file){
        data={
            ...data,
             filePath:file.destination,
             fileOriginalName:file.originalname,
             fileName:file.filename,
             fileType:file.mimetype
         }; 
       }
        let createdData=await movieModel.movieModel.create(data)
        console.log(createdData,"create");
        
        res.json({
            createdData,
            Message:"Movie Created Successfully..."
        })
    }
    catch(err){
          res.json({
            Error:err.message
          })
    }
}















const deleteMovie=async(req,res)=>{
    try{    
    let {_id}=req.query;
    const oldFile = await movieModel.movieModel.findById(_id);
    if (oldFile.fileName) {
        fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
    }
    if (!oldFile) return res.status(404).json({ Message:"Movie Not Found..." });
    await oldFile.deleteOne();
    res.json({ Message: "Movie deleted successfully..." })
    }
    catch(err){
        res.json({Error:err.message})
    }
    
    }
    
    module.exports={movieCreate,deleteMovie};
