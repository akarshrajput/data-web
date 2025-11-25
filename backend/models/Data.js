const mongoose = require("mongoose");

// Flexible schema to handle all types of business/organization data
const dataSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    index: true,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: [
      "company",
      "business",
      "industry",
      "shop",
      "startup",
      "organization",
      "other",
    ],
    index: true,
  },

  // Contact Information
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
  },
  alternatePhone: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  fax: {
    type: String,
    trim: true,
  },

  // Location Details
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    landmark: String,
  },

  // Business Details
  category: {
    type: String,
    trim: true,
    index: true,
  },
  subCategory: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
    index: true,
  },
  establishedYear: {
    type: Number,
  },
  employeeCount: {
    type: String,
    enum: [
      "1-10",
      "11-50",
      "51-200",
      "201-500",
      "501-1000",
      "1000+",
      "unknown",
    ],
  },
  revenue: {
    type: String,
  },
  annualTurnover: {
    type: String,
  },
  gstNumber: {
    type: String,
    trim: true,
  },
  panNumber: {
    type: String,
    trim: true,
  },
  cinNumber: {
    type: String,
    trim: true,
  },
  companyType: {
    type: String,
    enum: [
      "Private Limited",
      "Public Limited",
      "LLP",
      "Partnership",
      "Proprietorship",
      "Other",
    ],
  },

  // Additional Information
  description: {
    type: String,
    trim: true,
  },
  services: [
    {
      type: String,
      trim: true,
    },
  ],
  products: [
    {
      type: String,
      trim: true,
    },
  ],
  certifications: [
    {
      type: String,
      trim: true,
    },
  ],
  awards: [
    {
      type: String,
      trim: true,
    },
  ],

  // Social Media & Links
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String,
    youtube: String,
  },

  // Embedded Person documents
  people: [
    {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      alternatePhone: {
        type: String,
        trim: true,
      },
      designation: {
        type: String,
        trim: true,
      },
      department: {
        type: String,
        trim: true,
      },
      linkedIn: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      role: {
        type: String,
        enum: [
          "CEO",
          "Managing Director",
          "Director",
          "CFO",
          "CTO",
          "COO",
          "Manager",
          "Sales Manager",
          "Marketing Manager",
          "HR Manager",
          "Operations Manager",
          "Purchase Manager",
          "Finance Manager",
          "IT Manager",
          "Business Development Manager",
          "Key Account Manager",
          "Owner",
          "Partner",
          "Proprietor",
          "Contact Person",
          "Other",
        ],
      },
    },
  ],

  // Additional flexible data
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },

  // Tracking
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for efficient filtering
dataSchema.index({ name: "text", description: "text" });
dataSchema.index({ "address.city": 1, "address.state": 1 });
dataSchema.index({ type: 1, category: 1, industry: 1 });
dataSchema.index({ createdAt: -1 });

// Update timestamp on save
dataSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Data", dataSchema);
