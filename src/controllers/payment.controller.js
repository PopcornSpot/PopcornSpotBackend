const Razorpay = require("razorpay");
const crypto = require("crypto");
const payment=require("../models/payment.model");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
require('dotenv').config();

const RAZORPAY_KEY_ID =process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET =process.env.RAZORPAY_KEY_SECRET ; 

const razorpay = new Razorpay({
  key_id:RAZORPAY_KEY_ID,
  key_secret:RAZORPAY_KEY_SECRET,
});

const CreatePayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      orderId: order.id,
      paymentOptions: order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

const VerifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

const paymentHistory =async(req,res)=>{
    try{  
       let data = req.body; 
       let userData = req.userData;
       data={
        ...data ,
        userName:userData.userName,
        userId:userData._id,
       } 
      const storagePath = path.join(__dirname, "../fileStorage");

      if (!fs.existsSync(storagePath)) {
         fs.mkdirSync(storagePath, { recursive: true });
       }
       const qrFilePath = path.join(storagePath, `${Date.now()}-qrcode.png`);
       const fileName = `${Date.now()}-qrcode.png`;
       await QRCode.toFile(qrFilePath, JSON.stringify(data));
       
             data = {
                 ...data,
                 qrCodePath: qrFilePath,
                 fileName:fileName,
                 bookingStatus:"Confirmed",
             }; 
      
       const createdScreen = await payment.paymentModel.create(data);      
       res.json({
        createdScreen,
        Message:"Created Sucessfully..."
      })   
    }
    catch(error){
        console.log(error.message); 
      res.json({Message:error.Message})
    }
}

const getBookedSeats = async (req, res) => {
  const { movieId, showId, selectedDate,showTime } = req.query;
  
  
  if (!movieId || !showId || !selectedDate || !showTime) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }
    try {
      let bookedSeats = await payment.paymentModel.find({
        movieId:movieId,showId:showId,showDate:selectedDate,showTime:showTime
      });
     bookedSeats = bookedSeats.flatMap((booking) => booking.seatNumbers);
     
      res.json({ bookedSeats, Message: "Success..." }); 
    } catch (err) {
      console.log(err.message);
      res.json({ Error:err.message });
    }
  };


  
  const getPaymentDetails = async (req, res) => {
      let { _id } = req.query;
      try {
        const ticketDetails = await payment.paymentModel.findById(_id);
    
        if (!ticketDetails) {
          return res.status(404).json({ Message: "Details Not Found..." });
        }
        res.json({ ticketDetails, Message: "Success..." }); 
      } catch (err) {
        res.json({ Error:err.message });
      }
    };


  const getAllTickets = async (req, res) => {
       let userData = req.userData
      try {
        const tickets = await payment.paymentModel.find({userId:userData._id});
        if (tickets.length===0) {
          return res.status(404).json({ Message: "Details Not Found..." });
        }
        res.json({ tickets, Message: "Success..." }); 
      } catch (err) {
        res.json({ Error:err.message });
      }
    };

    const getAllTicketsforDash = async (req, res) => {
     try {
       const allTickets = await payment.paymentModel.find();
       if (allTickets.length===0) {
         return res.status(404).json({ Message: "Details Not Found..." });
       }
       res.json({ allTickets, Message: "Success..." }); 
     } catch (err) {
       res.json({ Error:err.message });
     }
   };

   const getAllTicketsforAdmin = async (req, res) => {
    let { _id } = req.query;
    try {
      const allTickets = await payment.paymentModel.find({theatreId:_id});
      if (allTickets.length===0) {
        return res.status(404).json({ Message: "Details Not Found..." });
      }
      res.json({ allTickets, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };


  const getAllTicketsforUserProfile = async (req, res) => {
    let { _id } = req.query;
    try {
      const allTickets = await payment.paymentModel.find({userId:_id});
      if (allTickets.length===0) {
        return res.status(404).json({ Message: "Details Not Found..." });
      }
      res.json({ allTickets, Message: "Success..." }); 
    } catch (err) {
      res.json({ Error:err.message });
    }
  };
  



module.exports = {
  CreatePayment,
  VerifyPayment,
  paymentHistory,
  getBookedSeats,
  getPaymentDetails,
  getAllTickets,
  getAllTicketsforDash,
  getAllTicketsforAdmin,
  getAllTicketsforUserProfile
};
