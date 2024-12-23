const express = require("express");
const {CreatePayment, VerifyPayment, paymentHistory} = require("../controllers/payment.controller")
const router = express.Router();
const token = require("../middlewares/user.token")

router.post("/createorder", CreatePayment);
router.post("/verifypayment", VerifyPayment);
router.post("/save",token.verifyToken, paymentHistory);

module.exports = router;
