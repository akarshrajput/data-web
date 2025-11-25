const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getRazorpayKey,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.get("/key", protect, getRazorpayKey);

module.exports = router;
