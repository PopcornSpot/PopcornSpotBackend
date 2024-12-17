const Razorpay = require("razorpay");
const crypto = require("crypto");

// Razorpay API keys (for local development)
const RAZORPAY_KEY_ID = "your_key_id"; // Razorpay Key ID
const RAZORPAY_KEY_SECRET = "your_key_secret"; //Razorpay Key Secret

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Create Order
const CreatePayment = async (req, res) => {
  const { amount } = req.body; // Amount in INR

  try {
    const options = {
      amount: amount * 100, // Convert amount 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Verify Payment
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

module.exports = {
  CreatePayment,
  VerifyPayment,
};
