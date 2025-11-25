const Data = require("../models/Data");

// @desc    Upload/Create new data (Admin only)
// @route   POST /api/data/upload
// @access  Private/Admin
exports.uploadData = async (req, res) => {
  try {
    const dataArray = Array.isArray(req.body) ? req.body : [req.body];

    const uploadedData = [];

    for (const dataItem of dataArray) {
      const data = await Data.create({
        ...dataItem,
        uploadedBy: req.user._id,
      });

      uploadedData.push(data);
    }

    res.status(201).json({
      success: true,
      count: uploadedData.length,
      data: uploadedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error uploading data",
      error: error.message,
    });
  }
};

// @desc    Get filtered data with blurred info (top 10)
// @route   POST /api/data/filter
// @access  Private
exports.getFilteredData = async (req, res) => {
  try {
    const {
      type,
      category,
      industry,
      city,
      state,
      country,
      employeeCount,
      establishedYearFrom,
      establishedYearTo,
      searchTerm,
      page = 1,
      limit = 10,
    } = req.body;

    // Build query
    const query = { isActive: true };

    if (type) query.type = type;
    if (category) query.category = new RegExp(category, "i");
    if (industry) query.industry = new RegExp(industry, "i");
    if (city) query["address.city"] = new RegExp(city, "i");
    if (state) query["address.state"] = new RegExp(state, "i");
    if (country) query["address.country"] = new RegExp(country, "i");
    if (employeeCount) query.employeeCount = employeeCount;

    if (establishedYearFrom || establishedYearTo) {
      query.establishedYear = {};
      if (establishedYearFrom)
        query.establishedYear.$gte = parseInt(establishedYearFrom);
      if (establishedYearTo)
        query.establishedYear.$lte = parseInt(establishedYearTo);
    }

    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    // Get total count
    const totalCount = await Data.countDocuments(query);

    // Get paginated data
    const data = await Data.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 })
      .select(
        "name type category industry address.city address.state createdAt"
      );

    // Return blurred data (only name and basic info visible)
    const blurredData = data.map((item) => ({
      _id: item._id,
      name: item.name,
      type: item.type,
      category: item.category,
      industry: item.industry,
      location: `${item.address?.city || "N/A"}, ${
        item.address?.state || "N/A"
      }`,
      // Other fields are intentionally not included (blurred)
    }));

    res.json({
      success: true,
      count: blurredData.length,
      totalCount,
      page: parseInt(page),
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      data: blurredData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching filtered data",
      error: error.message,
    });
  }
};

// @desc    Get available filter options
// @route   GET /api/data/filter-options
// @access  Private
exports.getFilterOptions = async (req, res) => {
  try {
    const types = await Data.distinct("type", { isActive: true });
    const categories = await Data.distinct("category", { isActive: true });
    const industries = await Data.distinct("industry", { isActive: true });
    const cities = await Data.distinct("address.city", { isActive: true });
    const states = await Data.distinct("address.state", { isActive: true });
    const countries = await Data.distinct("address.country", {
      isActive: true,
    });
    const employeeCounts = await Data.distinct("employeeCount", {
      isActive: true,
    });

    res.json({
      success: true,
      data: {
        types: types.filter(Boolean),
        categories: categories.filter(Boolean),
        industries: industries.filter(Boolean),
        cities: cities.filter(Boolean),
        states: states.filter(Boolean),
        countries: countries.filter(Boolean),
        employeeCounts: employeeCounts.filter(Boolean),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching filter options",
      error: error.message,
    });
  }
};

// @desc    Get single data by ID (Admin only - full details)
// @route   GET /api/data/:id
// @access  Private/Admin
exports.getDataById = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message,
    });
  }
};

// @desc    Update data (Admin only)
// @route   PUT /api/data/:id
// @access  Private/Admin
exports.updateData = async (req, res) => {
  try {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating data",
      error: error.message,
    });
  }
};

// @desc    Delete data (Admin only)
// @route   DELETE /api/data/:id
// @access  Private/Admin
exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting data",
      error: error.message,
    });
  }
};

// @desc    Get all data (Admin only)
// @route   GET /api/data/all
// @access  Private/Admin
exports.getAllData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const totalCount = await Data.countDocuments({ isActive: true });

    const data = await Data.find({ isActive: true })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: data.length,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message,
    });
  }
};
