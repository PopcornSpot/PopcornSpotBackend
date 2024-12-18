const screen=require("../models/screen.model");


const createScreen =async(req,res)=>{
    try{  
       let data = req.body;
       let {screenNo} = req.body 
       let userData = req.userData;
       data={
        ...data,
        adminID:userData._id 
       }
       const findScreenNo = await screen.screenModel.findOne({ screenNo });
        if (!findScreenNo)
        return res.status(400).json({ Message: "ScreenNo Already Exists" });
       
       const createdScreen = await screen.screenModel.create(data)
       res.json({
        Message:"Created Sucessfully..."
      })   
    }
    catch(error){
        console.log(error.message); 
      res.json({Message:error.Message})
    }
}


const getScreen = async (req, res) => {
    let userData = req.userData;
    
    try {
      const allScreens = await screen.screenModel.find({
        adminID: userData._id,
      });
  
      if (allScreens.length===0) {
        return res.status(404).json({ Message: "Data not found..." });
      }
      res.json({ allScreens, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


const getSingleScreen = async (req, res) => {
    let { _id } = req.query;

    try {
      const getsingleScreen = await screen.screenModel.findById(_id);
  
      if (!getsingleScreen) {
        return res.status(404).json({ Message: "Details Not Found..." });
      }
      res.json({ getsingleScreen, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  
const updateScreen=async(req,res)=>{
    try{
    let {_id}=req.query;
    let data =req.body; 
  const updatedcreen = await screen.screenModel.findByIdAndUpdate(_id, data, { new: true })
  if(!updatedcreen){
    return res.status(404).json({ Message: "Data not found" });
  }
  res.json({Message:"Updated Successfully..."})
  }
  catch(err){
    console.log(err.message);
    
  res.json({Error:err.message})
  }
  }


  
  const deleteScreen = async (req, res) => {
    try {
      let { _id } = req.query;
      const deleted = await screen.screenModel.findByIdAndDelete(_id);
      if (!deleted) {
        return res.json({ Message: "Data Not Found..." });
      }
      res.json({ Message: "Deleted successfully..." });
    } catch (err) {
      res.json({ Error: err.message });
    }
  };



module.exports = {
    createScreen,
    getScreen,
    getSingleScreen,
    updateScreen,
    deleteScreen
};