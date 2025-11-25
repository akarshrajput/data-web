const express = require("express");
const router = express.Router();
const {
  completePurchase,
  getMyPurchases,
  getPurchaseById,
  getPurchasedData,
} = require("../controllers/purchaseController");
const { protect } = require("../middleware/auth");

router.post("/complete/:id", protect, completePurchase);
router.get("/my-purchases", protect, getMyPurchases);
router.get("/:id", protect, getPurchaseById);
router.get("/:id/data", protect, getPurchasedData);

module.exports = router;
