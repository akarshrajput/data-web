"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dataAPI } from "@/lib/api";
import { Upload, Plus, Minus } from "lucide-react";

export default function AdminUploadPage() {
  const [formData, setFormData] = useState({
    name: "",
    type: "company",
    email: "",
    phone: "",
    alternatePhone: "",
    website: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    category: "",
    subCategory: "",
    industry: "",
    establishedYear: "",
    employeeCount: "",
    description: "",
  });
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await dataAPI.uploadData(formData);
      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        type: "company",
        email: "",
        phone: "",
        alternatePhone: "",
        website: "",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
        category: "",
        subCategory: "",
        industry: "",
        establishedYear: "",
        employeeCount: "",
        description: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Upload Data</h1>
      </div>

      {success && (
        <div className="p-4 bg-green-500/10 text-green-500 rounded-md">
          Data uploaded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter organization details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="company">Company</option>
                  <option value="business">Business</option>
                  <option value="industry">Industry</option>
                  <option value="shop">Shop</option>
                  <option value="startup">Startup</option>
                  <option value="organization">Organization</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
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
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
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
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Select
                  id="employeeCount"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </Select>
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
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address.street">Street</Label>
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
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          disabled={loading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {loading ? "Uploading..." : "Upload Data"}
        </Button>
      </form>
    </div>
  );
}
