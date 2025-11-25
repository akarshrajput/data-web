"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dataAPI } from "@/lib/api";
import { Upload, Plus, X, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ROLE_OPTIONS = [
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
];

export default function AdminUploadPage() {
  const [formData, setFormData] = useState({
    // Required fields
    name: "",
    type: "company",
    email: "",
    phone: "",

    // Optional contact
    alternatePhone: "",
    website: "",
    fax: "",

    // Address
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      landmark: "",
    },

    // Business details
    category: "",
    subCategory: "",
    industry: "",
    establishedYear: "",
    employeeCount: "",
    revenue: "",
    annualTurnover: "",
    companyType: "",

    // Legal
    gstNumber: "",
    panNumber: "",
    cinNumber: "",

    // Additional info
    description: "",
    services: [],
    products: [],
    certifications: [],
    awards: [],

    // Social media
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      youtube: "",
    },

    // People references
    people: [],
  });

  const [currentService, setCurrentService] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentCertification, setCurrentCertification] = useState("");
  const [currentAward, setCurrentAward] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else if (name.startsWith("socialMedia.")) {
      const socialField = name.split(".")[1];
      setFormData({
        ...formData,
        socialMedia: {
          ...formData.socialMedia,
          [socialField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addArrayItem = (field, value, setter) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
      setter("");
    }
  };

  const removeArrayItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const addPerson = () => {
    setFormData({
      ...formData,
      people: [
        ...formData.people,
        {
          name: "",
          email: "",
          phone: "",
          alternatePhone: "",
          designation: "",
          department: "",
          linkedIn: "",
          twitter: "",
          role: "Contact Person",
        },
      ],
    });
  };

  const updatePerson = (index, field, value) => {
    const updatedPeople = [...formData.people];
    updatedPeople[index][field] = value;
    setFormData({ ...formData, people: updatedPeople });
  };

  const removePerson = (index) => {
    setFormData({
      ...formData,
      people: formData.people.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Clean up empty fields
      const cleanData = { ...formData };

      // Remove empty strings and empty arrays
      Object.keys(cleanData).forEach((key) => {
        if (cleanData[key] === "" || cleanData[key] === null) {
          delete cleanData[key];
        }
      });

      if (cleanData.services?.length === 0) delete cleanData.services;
      if (cleanData.products?.length === 0) delete cleanData.products;
      if (cleanData.certifications?.length === 0)
        delete cleanData.certifications;
      if (cleanData.awards?.length === 0) delete cleanData.awards;

      // Clean people array - remove empty fields
      if (cleanData.people?.length > 0) {
        cleanData.people = cleanData.people.map((person) => {
          const cleanPerson = { ...person };
          Object.keys(cleanPerson).forEach((key) => {
            if (cleanPerson[key] === "") delete cleanPerson[key];
          });
          return cleanPerson;
        });
      } else {
        delete cleanData.people;
      }

      // Clean address object
      if (cleanData.address) {
        Object.keys(cleanData.address).forEach((key) => {
          if (cleanData.address[key] === "") delete cleanData.address[key];
        });
        if (Object.keys(cleanData.address).length === 0)
          delete cleanData.address;
      }

      // Clean socialMedia object
      if (cleanData.socialMedia) {
        Object.keys(cleanData.socialMedia).forEach((key) => {
          if (cleanData.socialMedia[key] === "")
            delete cleanData.socialMedia[key];
        });
        if (Object.keys(cleanData.socialMedia).length === 0)
          delete cleanData.socialMedia;
      }

      await dataAPI.uploadData(cleanData);
      setSuccess(true);

      // Reset form
      resetForm();

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert(error.response?.data?.message || "Failed to upload data");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "company",
      email: "",
      phone: "",
      alternatePhone: "",
      website: "",
      fax: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        landmark: "",
      },
      category: "",
      subCategory: "",
      industry: "",
      establishedYear: "",
      employeeCount: "",
      revenue: "",
      annualTurnover: "",
      companyType: "",
      gstNumber: "",
      panNumber: "",
      cinNumber: "",
      description: "",
      services: [],
      products: [],
      certifications: [],
      awards: [],
      socialMedia: {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        youtube: "",
      },
      people: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
          <Building2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Upload Business Data</h1>
          <p className="text-muted-foreground">
            Add new business records to the database
          </p>
        </div>
      </div>

      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-700">
              <Badge variant="outline" className="border-green-200 text-green-700">
                Success
              </Badge>
              <span>Data uploaded successfully!</span>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            {/* Basic Information - Required */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Basic Information</span>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </CardTitle>
                <CardDescription>
                  Essential company details that are required for all entries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="industry">Industry</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input
                  id="alternatePhone"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fax">Fax</Label>
                <Input
                  id="fax"
                  name="fax"
                  value={formData.fax}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address.street">Street Address</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.pincode">Pincode</Label>
                <Input
                  id="address.pincode"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address.landmark">Landmark</Label>
                <Input
                  id="address.landmark"
                  name="address.landmark"
                  value={formData.address.landmark}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub Category</Label>
                <Input
                  id="subCategory"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  name="establishedYear"
                  type="number"
                  value={formData.establishedYear}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue</Label>
                <Input
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  placeholder="e.g., $1M - $5M"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualTurnover">Annual Turnover</Label>
                <Input
                  id="annualTurnover"
                  name="annualTurnover"
                  value={formData.annualTurnover}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyType">Company Type</Label>
                <Select
                  value={formData.companyType}
                  onValueChange={(value) => setFormData({ ...formData, companyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Limited">Private Limited</SelectItem>
                    <SelectItem value="Public Limited">Public Limited</SelectItem>
                    <SelectItem value="LLP">LLP</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Proprietorship">Proprietorship</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cinNumber">CIN Number</Label>
                <Input
                  id="cinNumber"
                  name="cinNumber"
                  value={formData.cinNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services & Products */}
        <Card>
          <CardHeader>
            <CardTitle>Services & Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Services</Label>
              <div className="flex gap-2">
                <Input
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                  placeholder="Add service"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem(
                        "services",
                        currentService,
                        setCurrentService
                      );
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    addArrayItem("services", currentService, setCurrentService)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("services", index)}
                      className="text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Products</Label>
              <div className="flex gap-2">
                <Input
                  value={currentProduct}
                  onChange={(e) => setCurrentProduct(e.target.value)}
                  placeholder="Add product"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem(
                        "products",
                        currentProduct,
                        setCurrentProduct
                      );
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    addArrayItem("products", currentProduct, setCurrentProduct)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.products.map((product, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {product}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("products", index)}
                      className="text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Certifications</Label>
              <div className="flex gap-2">
                <Input
                  value={currentCertification}
                  onChange={(e) => setCurrentCertification(e.target.value)}
                  placeholder="Add certification"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem(
                        "certifications",
                        currentCertification,
                        setCurrentCertification
                      );
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "certifications",
                      currentCertification,
                      setCurrentCertification
                    )
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("certifications", index)}
                      className="text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Awards</Label>
              <div className="flex gap-2">
                <Input
                  value={currentAward}
                  onChange={(e) => setCurrentAward(e.target.value)}
                  placeholder="Add award"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("awards", currentAward, setCurrentAward);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    addArrayItem("awards", currentAward, setCurrentAward)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.awards.map((award, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {award}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("awards", index)}
                      className="text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="socialMedia.facebook">Facebook</Label>
                <Input
                  id="socialMedia.facebook"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMedia.twitter">Twitter</Label>
                <Input
                  id="socialMedia.twitter"
                  name="socialMedia.twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMedia.linkedin">LinkedIn</Label>
                <Input
                  id="socialMedia.linkedin"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMedia.instagram">Instagram</Label>
                <Input
                  id="socialMedia.instagram"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMedia.youtube">YouTube</Label>
                <Input
                  id="socialMedia.youtube"
                  name="socialMedia.youtube"
                  value={formData.socialMedia.youtube}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* People/Contacts */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Associated People</CardTitle>
                <CardDescription>Add key contact persons</CardDescription>
              </div>
              <Button type="button" onClick={addPerson} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Person
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.people.map((personData, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-4 relative"
              >
                <button
                  type="button"
                  onClick={() => removePerson(index)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={personData.name}
                      onChange={(e) =>
                        updatePerson(index, "name", e.target.value)
                      }
                      placeholder="Person name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      value={personData.role}
                      onChange={(e) =>
                        updatePerson(index, "role", e.target.value)
                      }
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={personData.email}
                      onChange={(e) =>
                        updatePerson(index, "email", e.target.value)
                      }
                      placeholder="Email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={personData.phone}
                      onChange={(e) =>
                        updatePerson(index, "phone", e.target.value)
                      }
                      placeholder="Phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Alternate Phone</Label>
                    <Input
                      value={personData.alternatePhone}
                      onChange={(e) =>
                        updatePerson(index, "alternatePhone", e.target.value)
                      }
                      placeholder="Alternate phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input
                      value={personData.designation}
                      onChange={(e) =>
                        updatePerson(index, "designation", e.target.value)
                      }
                      placeholder="Designation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                      value={personData.department}
                      onChange={(e) =>
                        updatePerson(index, "department", e.target.value)
                      }
                      placeholder="Department"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input
                      value={personData.linkedIn}
                      onChange={(e) =>
                        updatePerson(index, "linkedIn", e.target.value)
                      }
                      placeholder="LinkedIn profile"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Twitter</Label>
                    <Input
                      value={personData.twitter}
                      onChange={(e) =>
                        updatePerson(index, "twitter", e.target.value)
                      }
                      placeholder="Twitter handle"
                    />
                  </div>
                </div>
              </div>
            ))}

            {formData.people.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No people added yet. Click "Add Person" to add contact persons.
              </p>
            )}
          </CardContent>
        </Card>

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          <Upload className="h-5 w-5 mr-2" />
          {loading ? "Uploading..." : "Upload Data"}
        </Button>
      </form>
    </div>
  );
}
