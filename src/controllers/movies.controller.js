const movieModel = require("../models/movies.model");
const fs = require("fs");

const movieCreate = async (req, res) => {
  try {
    const { body, file, userData } = req;
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
    let createdData = await movieModel.movieModel.create(data);
    console.log(createdData, "create");

    res.json({
      createdData,
      Message: "Movie Created Successfully...",
    });
  } catch (err) {
    res.json({
      Error: err.message,
    });
  } 
};

const getAllMovies = async (req, res) => {
  try {
    const findAllMovies = await movieModel.movieModel.find();
    if (findAllMovies.length == 0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ findAllMovies });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};



const userGetAllMovies = async (req, res) => {
  try {
    const findAllMovies = await movieModel.movieModel.find();
    if (findAllMovies.length == 0) {
      return res.status(404).json({ Message: "Data not found.." });
    }
    res.json({ findAllMovies });
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};





const getMovieForUpdate = async (req, res) => {
  try {
    let { _id } = req.query;

    const movie = await movieModel.movieModel.findById(_id);

    if (!movie) {
      return res.status(404).json({ Message: "Data not found.." });
    }

    res.json({ movie });
  } catch (error) {
    console.log(error.message);

    res.json({
      Error: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    let { _id } = req.query;
    let newFile = req.file;
    let data = {
      ...req.body,
    };
    if (newFile) {
      const oldFile = await movieModel.movieModel.findById(_id);
      if (!oldFile) {
        return res.status(404).json({ Message: "Data Not Found.." });
      }
      fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
      data.fileName = newFile.filename;
      data.filePath = newFile.destination;
      data.fileType = newFile.mimetype;
      data.fileOrginalName = newFile.originalname;
    }
    const updatedMovie = await movieModel.movieModel.findByIdAndUpdate(
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

const deleteMovie = async (req, res) => {
  try {
    let { _id } = req.query;
    const oldFile = await movieModel.movieModel.findById(_id);
    if (oldFile.fileName) {
      fs.unlinkSync(`${oldFile.filePath}/${oldFile.fileName}`);
    }
    if (!oldFile)
      return res.status(404).json({ Message: "Movie Not Found..." });
    await oldFile.deleteOne();
    res.json({ Message: "Movie deleted successfully..." });
  } catch (err) {
    res.json({ Error: err.message });
  }
};

module.exports = {
  movieCreate,
  deleteMovie,
  getAllMovies,
  getMovieForUpdate,
  updateMovie,
  userGetAllMovies,
};
