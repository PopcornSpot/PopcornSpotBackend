const banner = require("../models/banner.model");
const fs = require("fs");

const bannerCreate = async (req, res) => {
  try {
    const { body, file, userData } = req;
    let data = { ...body, superAdminId: userData._id };
    if (file) {
      data = {
        ...data,
        filePath: file.destination,
        fileOriginalName: file.originalname,
        fileName: file.filename,
        fileType: file.mimetype,
      };
    }
    let createdData = await banner.bannerModel.create(data);

    res.json({
      createdData,
      Message: "Banner Created Successfully...",
    });
  } catch (err) {
    console.log(err.message);
    
    res.json({
      Error: err.message,
    });
  } 
};

const getAllBanner = async (req, res) => {
  try {
    const allBanner = await banner.bannerModel.find();
    if (allBanner.length == 0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ allBanner });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};



const userGetAllBanner = async (req, res) => {
  try {
    const allBanner = await banner.bannerModel.find();
    if (allBanner.length == 0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ allBanner });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};


const getBannerForUpdate = async (req, res) => {
  try {
    let { _id } = req.query;
    const oneBanner = await banner.bannerModel.findById(_id);
    if (!oneBanner) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ oneBanner });

  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    let { _id } = req.query;
    let newFile = req.file;
    let data = {
      ...req.body,
    };
    if (newFile) {
      const oldFile = await banner.bannerModel.findById(_id);
      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
      data.fileName = newFile.filename;
      data.filePath = newFile.destination;
      data.fileType = newFile.mimetype;
      data.fileOrginalName = newFile.originalname;
    }
    const updatedMovie = await banner.bannerModel.findByIdAndUpdate(
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

const deleteBanner = async (req, res) => {
  try {
    let { _id } = req.query;
    const oldFile = await banner.bannerModel.findById(_id);
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
  bannerCreate,
  deleteBanner,
  updateBanner,
  getAllBanner,
  getBannerForUpdate,
  userGetAllBanner
};
