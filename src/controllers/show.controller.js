const show=require("../models/show.model");
const theatre=require("../models/theatre.model");

const createShow =async(req,res)=>{
    try{  
       let data = req.body;
       let userData = req.userData;
       const findTheatre = await theatre.theatreModel.findOne({adminId:userData._id});       
        if (!findTheatre)
        return res.status(400).json({ Message: "Invalid Theatre..." });
        data={
            ...data,
            theatreId:findTheatre._id,
            adminId:userData._id 
           }
       await show.showModel.create(data)
       res.json({
        Message:"Show Created Sucessfully..."
      })   
    }
    catch(error){
        console.log(error.message); 
      res.json({Message:error.Message})
    }
}


const getShow = async (req, res) => {
    let userData = req.userData;
    try {
      const allShows = await show.showModel.find({
        adminId: userData._id,
      });
  
      if (allShows.length===0) {
        return res.status(404).json({ Message: "Show not found..." });
      }
      res.json({ allShows, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


const getSingleShow = async (req, res) => {
    let { _id } = req.query;

    try {
      const getsingleShow = await show.showModel.findById(_id);
  
      if (!getsingleShow) {
        return res.status(404).json({ Message: "Show Not Found..." });
      }
      res.json({ getsingleShow, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };




  const getShowForUser = async (req, res) => {
    try {
      const shows = await show.showModel.find();
      if (shows.length==0) {
        return res.status(404).json({ Message: "Show Not Found..." });
      }
      res.json({ shows, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  const getShowsForTheatreUser = async (req, res) => {
    let { _id } = req.query;
    try {
      const shows = await show.showModel.find({theatreId:_id});
      if (shows.length==0) {
        return res.status(404).json({ Message: "Show Not Found..." });
      }
      res.json({ shows, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  const getShowsForTheatreLayout = async (req, res) => {
    let { _id } = req.query;
    try {
      const shows = await show.showModel.findById(_id);
      if (!shows) {
        return res.status(404).json({ Message: "Show Not Found..." });
      }
      res.json({ shows, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  
const updateShow=async(req,res)=>{
    try{
    let {_id}=req.query;
    let data =req.body; 
    
  const updatedshow = await show.showModel.findByIdAndUpdate(_id, data, { new: true })
  if(!updatedshow){
    return res.status(404).json({ Message: "show not found" });
  }
  res.json({Message:"Updated Successfully..."})
  }
  catch(err){
    console.log(err.message);
    
  res.json({Error:err.message})
  }
  }


  
  const deleteShow = async (req, res) => {
    try {
      let { _id } = req.query;
      const deletedshow = await show.showModel.findByIdAndDelete(_id);
      if (!deletedshow) {
        return res.json({ Message: "Show not found..." });
      }
      res.json({ Message: "Deleted successfully..." });
    } catch (err) {
      res.json({ Error: err.message });
    }
  };



module.exports = {
    createShow,
    getShow,
    getSingleShow,
    updateShow,
    deleteShow,
    getShowForUser,
    getShowsForTheatreUser,
    getShowsForTheatreLayout
};