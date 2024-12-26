const express = require("express");
const {
  CreatePayment,
  VerifyPayment,
  paymentHistory,
  getBookedSeats,
  getPaymentDetails,
  getAllTickets,
  getAllTicketsforDash,
  getAllTicketsforAdmin,
  getAllTicketsforUserProfile,
} = require("../controllers/payment.controller");
const router = express.Router();
const token = require("../middlewares/user.token");

router.get("/getalltickets", getAllTicketsforDash);
router.get("/getallticketsadmin", getAllTicketsforAdmin);
router.get("/getallticketsforUser", getAllTicketsforUserProfile);

router.post("/createorder", CreatePayment);
router.post("/verifypayment", VerifyPayment);
router.post("/save", token.verifyToken, paymentHistory);
router.get("/user/getbookedseats", getBookedSeats);
router.get("/user/getticketdetails", getPaymentDetails);
router.get("/user/getalltickets", token.verifyToken, getAllTickets);

module.exports = router;
