const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  // Purchase details
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    default: 0.5, // 0.5 rupee per data record
  },
  totalAmount: {
    type: Number,
    required: true,
  },

  // Filter criteria used for this purchase
  filterCriteria: {
    type: {
      type: String,
    },
    category: String,
    industry: String,
    city: String,
    state: String,
    country: String,
    employeeCount: String,
    establishedYearFrom: Number,
    establishedYearTo: Number,
    searchTerm: String,
  },

  // Snapshot of purchased data at the time of purchase
  purchasedData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
  ],

  // Store complete data snapshot to prevent changes from affecting purchased data
  dataSnapshot: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],

  // Payment details
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
    index: true,
  },
  paymentId: {
    type: String,
  },
  razorpayOrderId: {
    type: String,
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },

  purchaseDate: {
    type: Date,
    default: Date.now,
    index: true,
  },

  expiryDate: {
    type: Date, // Optional: if you want data access to expire
  },

  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active",
  },
});

// Index for efficient queries
purchaseSchema.index({ user: 1, purchaseDate: -1 });
purchaseSchema.index({ paymentStatus: 1, status: 1 });

module.exports = mongoose.model("Purchase", purchaseSchema);
