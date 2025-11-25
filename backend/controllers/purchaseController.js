const Purchase = require("../models/Purchase");
const Data = require("../models/Data");

// @desc    Complete purchase and create data snapshot
// @route   POST /api/purchase/complete/:id
// @access  Private
exports.completePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

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

    // Check if payment is completed
    if (purchase.paymentStatus !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // Check if already completed
    if (purchase.dataSnapshot && purchase.dataSnapshot.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Purchase already completed",
      });
    }

    // Build query from filter criteria
    const query = { isActive: true };
    const fc = purchase.filterCriteria;

    if (fc.type) query.type = fc.type;
    if (fc.category) query.category = new RegExp(fc.category, "i");
    if (fc.industry) query.industry = new RegExp(fc.industry, "i");
    if (fc.city) query["address.city"] = new RegExp(fc.city, "i");
    if (fc.state) query["address.state"] = new RegExp(fc.state, "i");
    if (fc.country) query["address.country"] = new RegExp(fc.country, "i");
    if (fc.employeeCount) query.employeeCount = fc.employeeCount;

    if (fc.establishedYearFrom || fc.establishedYearTo) {
      query.establishedYear = {};
      if (fc.establishedYearFrom)
        query.establishedYear.$gte = parseInt(fc.establishedYearFrom);
      if (fc.establishedYearTo)
        query.establishedYear.$lte = parseInt(fc.establishedYearTo);
    }

    if (fc.searchTerm) {
      query.$text = { $search: fc.searchTerm };
    }

    // Fetch the exact quantity of data
    const data = await Data.find(query)
      .limit(purchase.quantity)
      .sort({ createdAt: -1 });

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found matching criteria",
      });
    }

    // Create snapshot of purchased data
    const dataSnapshot = data.map((item) => item.toObject());
    const purchasedDataIds = data.map((item) => item._id);

    // Update purchase with snapshot
    purchase.purchasedData = purchasedDataIds;
    purchase.dataSnapshot = dataSnapshot;
    purchase.status = "active";

    await purchase.save();

    res.json({
      success: true,
      message: "Purchase completed successfully",
      data: {
        purchaseId: purchase._id,
        quantity: data.length,
        purchaseDate: purchase.purchaseDate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error completing purchase",
      error: error.message,
    });
  }
};

// @desc    Get user's purchases
// @route   GET /api/purchase/my-purchases
// @access  Private
exports.getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({
      user: req.user._id,
      paymentStatus: "completed",
    })
      .sort({ purchaseDate: -1 })
      .select("-dataSnapshot"); // Don't send full snapshot in list

    res.json({
      success: true,
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching purchases",
      error: error.message,
    });
  }
};

// @desc    Get single purchase with data snapshot
// @route   GET /api/purchase/:id
// @access  Private
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

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

    res.json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching purchase",
      error: error.message,
    });
  }
};

// @desc    Get purchased data (snapshot)
// @route   GET /api/purchase/:id/data
// @access  Private
exports.getPurchasedData = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);

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

    // Check if payment is completed
    if (purchase.paymentStatus !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    res.json({
      success: true,
      count: purchase.dataSnapshot.length,
      purchaseDate: purchase.purchaseDate,
      data: purchase.dataSnapshot,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching purchased data",
      error: error.message,
    });
  }
};
