const Razorpay = require("razorpay");
const crypto = require("crypto");
const Purchase = require("../models/Purchase");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { quantity, filterCriteria } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // Price calculation: 0.5 rupee per data record
    const pricePerUnit = 0.5;
    const totalAmount = quantity * pricePerUnit;

    // Create Razorpay order
    const options = {
      amount: Math.round(totalAmount * 100), // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        quantity: quantity.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    // Create purchase record with pending status
    const purchase = await Purchase.create({
      user: req.user._id,
      quantity,
      pricePerUnit,
      totalAmount,
      filterCriteria: filterCriteria || {},
      razorpayOrderId: order.id,
      paymentStatus: "pending",
    });

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: totalAmount,
        currency: "INR",
        purchaseId: purchase._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// @desc    Verify payment and complete purchase
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update purchase with payment details
      const purchase = await Purchase.findById(purchaseId);

      if (!purchase) {
        return res.status(404).json({
          success: false,
          message: "Purchase not found",
        });
      }

      // Verify user owns this purchase
      if (purchase.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        });
      }

      purchase.razorpayPaymentId = razorpay_payment_id;
      purchase.razorpaySignature = razorpay_signature;
      purchase.paymentStatus = "completed";

      await purchase.save();

      res.json({
        success: true,
        message: "Payment verified successfully",
        data: purchase,
      });
    } else {
      // Payment failed
      const purchase = await Purchase.findById(purchaseId);
      if (purchase) {
        purchase.paymentStatus = "failed";
        await purchase.save();
      }

      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

// @desc    Get Razorpay key
// @route   GET /api/payment/key
// @access  Private
exports.getRazorpayKey = async (req, res) => {
  res.json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
  });
};
