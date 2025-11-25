"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Search, Filter, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const router = useRouter();
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState({
    type: "all",
    category: "",
    industry: "",
    city: "",
    state: "",
    country: "",
    employeeCount: "all",
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
      // Convert 'all' values to empty strings for API
      const apiFilters = {
        ...filters,
        type: filters.type === "all" ? "" : filters.type,
        employeeCount:
          filters.employeeCount === "all" ? "" : filters.employeeCount,
      };

      const response = await dataAPI.getFilteredData({
        ...apiFilters,
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
    // Convert 'all' values to empty strings for API
    const apiFilters = {
      ...filterCriteria,
      type: filterCriteria.type === "all" ? "" : filterCriteria.type,
      employeeCount:
        filterCriteria.employeeCount === "all"
          ? ""
          : filterCriteria.employeeCount,
    };

    router.push(
      `/dashboard/purchase?filters=${encodeURIComponent(
        JSON.stringify(apiFilters)
      )}&max=${availableCount}`
    );
  };

  // Filter section component for reusability
  const FilterSection = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={filters.type}
          onValueChange={(value) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {filterOptions.types?.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Enter category"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          name="industry"
          value={filters.industry}
          onChange={handleFilterChange}
          placeholder="Enter industry"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            placeholder="State"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employeeCount">Employee Count</Label>
        <Select
          value={filters.employeeCount}
          onValueChange={(value) =>
            setFilters({ ...filters, employeeCount: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sizes</SelectItem>
            {filterOptions.employeeCounts?.map((count) => (
              <SelectItem key={count} value={count}>
                {count}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="searchTerm">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            placeholder="Search companies..."
            className="pl-9"
          />
        </div>
      </div>

      <Button onClick={handleSearch} className="w-full" disabled={loading}>
        {loading ? "Searching..." : "Apply Filters"}
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Mobile Filter Toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterSection />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
              <CardDescription>Refine your search criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <FilterSection />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Results Header */}
          {data.length > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {totalCount.toLocaleString()} records found
                </Badge>
                <span className="text-sm text-muted-foreground">
                  (showing top 10)
                </span>
              </div>
              <Button
                onClick={() => handlePurchase(filters, totalCount)}
                size="sm"
              >
                <Database className="h-4 w-4 mr-2" />
                Purchase Data
              </Button>
            </div>
          )}

          {/* Data Table */}
          {data.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          City
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          State
                        </TableHead>
                        <TableHead className="hidden xl:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden xl:table-cell">
                          Industry
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">
                            <Link
                              href={`/dashboard/data/${item._id}`}
                              className="text-primary hover:underline"
                            >
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className="text-xs">
                              {item.type || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="blur-sm select-none text-xs">
                              ████████@██.com
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="blur-sm select-none text-xs">
                              +91 ██████████
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {item.address?.city || "N/A"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {item.address?.state || "N/A"}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {item.category || "N/A"}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {item.industry || "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : !loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Database className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No data found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filter criteria to find more results
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      type: "all",
                      category: "",
                      industry: "",
                      city: "",
                      state: "",
                      country: "",
                      employeeCount: "all",
                      establishedYearFrom: "",
                      establishedYearTo: "",
                      searchTerm: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Searching data...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
