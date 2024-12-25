const mongoose = require("mongoose");
const { v4 } = require("uuid");

const paymentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    userID: {
      type: String,
      //   required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    theatreId: {
      type: String,
      required: true,
    },
    showId: {
      type: String,
      trim: true,
      required: true,
    },
    seatNumbers: {
      type: [String],
      required: true,
      trim: true,
    },
    totalCost: {
      type: String,
      required: true,
      trim: true,
    },
    paymentId: {
      type: String,
      required: true,
      trim: true,
    },
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    bookingDateTime: {
      type: Date,
      default: Date.now,
    },
    seatLockStatus: {
      type: Boolean,
      default: false,
    },
    lockExpiry: {
      type: Date,
      default: null,
    },
    bookingStatus: {
      type: String,
      default: "Pending",
    },
    qrCodePath: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      // required: true,
    },
    showDate: {
      type: String,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = { paymentModel };
