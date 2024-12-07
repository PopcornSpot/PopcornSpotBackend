const report=require("../models/report.model");


const createReport =async(req,res)=>{
    try{  
       let data = req.body; 
       let userData = req.userData;

       data={
        ...data,
        userID:userData._id 
       }
       const generatedReport = await report.reportModel.create(data)
       console.log(generatedReport);
       
       if(!generatedReport){
        return res.status(404).json({ Message: "Unable to generate report..." }); 
       }
       res.json({
        Message:"Report generated Sucessfully..."
      }) 
       
    }
    catch(error){
        console.log(error.message);
        
      res.json({Message:error.Message})
    }
}


const getAllReports = async (req, res) => {
    try {
      const allReports = await report.reportModel.find();
  
      if (allReports.length===0) {
        return res.status(404).json({ Message: "Details Not Found" });
      }
      res.json({ allReports, Message: "Success....." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };



  
const getSingleReport = async (req, res) => {
    let { _id } = req.query;

    try {
      const reports = await report.reportModel.findById(_id);
  
      if (!reports) {
        return res.status(404).json({ Message: "Details Not Found" });
      }
      res.json({ reports, Message: "Success....." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  
const updateReport=async(req,res)=>{
    try{
    let {_id}=req.query;
    let data =req.body;
  const updatedReport = await report.reportModel.findByIdAndUpdate(_id, data, { new: true })
  if(!updatedReport){
    return res.status(404).json({ Message: "Report not updated" });
  }
  res.json({Message:"Updated Successfully..."})
  }
  catch(err){
  res.json({Error:err.message})
  }
  }





module.exports = {
    createReport,
    getAllReports,
    getSingleReport,
    updateReport,
};