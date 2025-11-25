"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataAPI } from "@/lib/api";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    industry: "",
    city: "",
    state: "",
    country: "",
    employeeCount: "",
    establishedYearFrom: "",
    establishedYearTo: "",
    searchTerm: "",
  });
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFilterOptions();
    handleSearch();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await dataAPI.getFilterOptions();
      setFilterOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await dataAPI.getFilteredData({
        ...filters,
        page: 1,
        limit: 10,
      });
      setData(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (filterCriteria, availableCount) => {
    router.push(
      `/dashboard/purchase?filters=${encodeURIComponent(
        JSON.stringify(filterCriteria)
      )}&max=${availableCount}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Browse Data</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Find specific data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {filterOptions.types?.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  placeholder="Enter category"
                />
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Input
                  name="industry"
                  value={filters.industry}
                  onChange={handleFilterChange}
                  placeholder="Enter industry"
                />
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  name="state"
                  value={filters.state}
                  onChange={handleFilterChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="space-y-2">
                <Label>Employee Count</Label>
                <Select
                  name="employeeCount"
                  value={filters.employeeCount}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  {filterOptions.employeeCounts?.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Search</Label>
                <Input
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Search..."
                />
              </div>

              <Button
                onClick={handleSearch}
                className="w-full"
                disabled={loading}
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Data Table */}
        <div className="lg:col-span-3 space-y-4">
          {data.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Found {totalCount} records (showing top 10)
                </p>
                <Button onClick={() => handlePurchase(filters, totalCount)}>
                  Purchase Data
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>State</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Industry</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell className="font-medium">
                              <Link
                                href={`/dashboard/data/${item._id}`}
                                className="text-blue-600 hover:underline"
                              >
                                {item.name}
                              </Link>
                            </TableCell>
                            <TableCell>{item.type || "N/A"}</TableCell>
                            <TableCell className="blur-sm select-none">
                              ████████@██.com
                            </TableCell>
                            <TableCell className="blur-sm select-none">
                              +91 ██████████
                            </TableCell>
                            <TableCell>{item.address?.city || "N/A"}</TableCell>
                            <TableCell>
                              {item.address?.state || "N/A"}
                            </TableCell>
                            <TableCell>{item.category || "N/A"}</TableCell>
                            <TableCell>{item.industry || "N/A"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!loading && data.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No data found. Try adjusting your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
