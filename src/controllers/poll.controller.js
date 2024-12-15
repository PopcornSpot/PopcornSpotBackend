const poll=require("../models/poll.model");
const createPoll =async(req,res)=>{
    try{  
        const { pollName, movies } = req.body;
       let userData = req.userData;
        const newPoll={
            pollName: pollName,
            movies: movies,
            adminId:userData._id
          };
        console.log(newPoll);

       const createdPoll = await poll.pollModel.create(newPoll)
       res.json({
        Message:"Created Sucessfully..."
      })   
    }
    catch(error){
        console.log(error.message); 
      res.json({Message:error.Message})
    }
}


const getAllPoll = async (req, res) => {
    let userData = req.userData;
    
    try {
      const allPolls = await poll.pollModel.find({
        adminId: userData._id,
      });
  
      if (allPolls.length===0) {
        return res.status(404).json({ Message: "Data not found..." });
      }
      res.json({ allPolls, Message: "Success..." }); 
      
    } catch (err) {
    console.log(err.message);
    
      res.json({ Error:err.message });
    }
  };


const getSinglePoll = async (req, res) => {
    let { _id } = req.query;

    try {
      const getpoll = await poll.pollModel.findById(_id);
  
      if (!getpoll) {
        return res.status(404).json({ Message: "Details Not Found..." });
      }
      res.json({ getpoll, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  
const updatePoll=async(req,res)=>{
    try{
    let {_id}=req.query;
    let data =req.body; 
    console.log(data);
    
  const updatedPoll = await poll.pollModel.findByIdAndUpdate(_id, data, { new: true })
  if(!updatedPoll){
    return res.status(404).json({ Message: "Data not found" });
  }
  res.json({updatedPoll,Message:"Updated Successfully..."})
  }
  catch(err){
    console.log(err.message);
    
  res.json({Error:err.message})
  }
  }


  



module.exports = {
    createPoll,
    getSinglePoll,
    updatePoll,
    getAllPoll
   
};