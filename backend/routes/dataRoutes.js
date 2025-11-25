const express = require("express");
const router = express.Router();
const {
  uploadData,
  getFilteredData,
  getFilterOptions,
  getDataById,
  updateData,
  deleteData,
  getAllData,
} = require("../controllers/dataController");
const { protect, admin } = require("../middleware/auth");

// Public/User routes
router.post("/filter", protect, getFilteredData);
router.get("/filter-options", protect, getFilterOptions);
router.get("/:id", protect, getDataById);

// Admin only routes
router.post("/upload", protect, admin, uploadData);
router.get("/all", protect, admin, getAllData);
router.put("/:id", protect, admin, updateData);
router.delete("/:id", protect, admin, deleteData);

module.exports = router;
