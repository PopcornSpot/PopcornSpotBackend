const express = require("express");
const {CreatePayment, VerifyPayment} = require("../controllers/payment.controller")
const router = express.Router();

router.post("/createorder", CreatePayment);
router.post("/verifypayment", VerifyPayment);

module.exports = router;
