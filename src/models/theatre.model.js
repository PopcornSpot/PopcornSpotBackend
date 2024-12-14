const mongoose = require("mongoose");
const { v4 } = require("uuid");

const theatreSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    adminId: {
      type: String,
      required: true,
    },
    theatreName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    screens: {
      type: String,
      required: true,
      trim: true,
    },
    facilities: {
      type: [String],
      default: [],
    },
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    fileType: {
      type: String,
    },
    fileOriginalName: {
      type: String,
    },
  },
  { timestamps: true }
);

const theatreModel = mongoose.model("Theatre", theatreSchema);

module.exports = { theatreModel };
