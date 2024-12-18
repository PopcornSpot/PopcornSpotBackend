const { log } = require("console");
const theatre = require("../models/theatre.model");
const fs = require("fs");

const theatreCreate = async (req, res) => {
  try {
    const { body, file, userData } = req;
    const { theatreName } = req.body;

    let data = { ...body, adminId: userData._id };
    if (file) {
      data = {
        ...data,
        filePath: file.destination,
        fileOriginalName: file.originalname,
        fileName: file.filename,
        fileType: file.mimetype,
      };
    }
      const findTheatreName = await theatre.theatreModel.findOne({ theatreName });
         if (findTheatreName)
           return res.status(400).json({ Message: "TheatreName Already Exists" });

    let createdData = await theatre.theatreModel.create(data);

    res.json({
      createdData,
      Message: "Theatre Created Successfully...",
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      Error: err.message,
    });
  } 
};



const getAllForSuperAdmin = async (req, res) => {
  try {
    const theatres = await theatre.theatreModel.find();
    if (theatres.length == 0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ theatres });
  } 
  catch (error) {
    console.log(error.message);
    
    res.json({
      Error: error.message,
    });
  }
};


const getAllTheatres = async (req, res) => {
  try {
    let userData = req.userData;
    const theatres = await theatre.theatreModel.find({
      adminId: userData._id,
    });
    if (theatres.length == 0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ theatres });
  } 
  catch (error) {
    console.log(error.message);
    
    res.json({
      Error: error.message,
    });
  }
};


const getOneTheatre = async (req, res) => {
    try {
      let { _id } = req.query;
      
      const theatres = await theatre.theatreModel.findById(_id);
      if (!theatres) {
        return res.status(404).json({ Message: "Data not found.." });
      }
      res.json({theatres});
    } catch (error) {
      res.json({
        Error: error.message,
      });
    }
  };


  
const getTheatreForUsers = async (req, res) => {
  try {
    let { adminId } = req.query;
  
    let theatres = await theatre.theatreModel.findOne({adminId:adminId});
    if (!theatres) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    theatres = [theatres]
    res.json({theatres});
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};


const getAllTheatreForUsers = async (req, res) => {
  try {
    let theatres = await theatre.theatreModel.find();
    if (theatres.length==0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({theatres});
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};



const updatetheatre = async (req, res) => {
  try {
    let { _id } = req.query;
    let newFile = req.file;
    let data = {
      ...req.body,
    };
    if (newFile) {
      const oldFile = await theatre.theatreModel.findById(_id);
      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
      data.fileName = newFile.filename;
      data.filePath = newFile.destination;
      data.fileType = newFile.mimetype;
      data.fileOrginalName = newFile.originalname;
    }
    const updatedMovie = await theatre.theatreModel.findByIdAndUpdate(
      _id,
      data,
      { new: true }
    );

    res.json({ updatedMovie, Message: "Updated Successfully" });
  } catch (error) {
    console.log(error.message);

    res.json({
      Error: error.message,
    });
  }
};

const deletetheatre = async (req, res) => {
  try {
    let { _id } = req.query;
    const oldFile = await theatre.theatreModel.findById(_id);
    if (oldFile.fileName) {
      fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
    }
    if (!oldFile)
      return res.status(404).json({ Message: "Data Not Found..." });
    await oldFile.deleteOne();
    res.json({ Message: "Deleted successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

module.exports = {
 theatreCreate,
 getAllTheatres,
 getOneTheatre,
 updatetheatre,
 deletetheatre,
 getAllForSuperAdmin,
 getTheatreForUsers,
 getAllTheatreForUsers
};
