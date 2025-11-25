"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { purchaseAPI } from "@/lib/api";
import { ArrowLeft, Download } from "lucide-react";

export default function PurchaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [purchase, setPurchase] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchaseData();
  }, [params.id]);

  const fetchPurchaseData = async () => {
    try {
      const [purchaseRes, dataRes] = await Promise.all([
        purchaseAPI.getPurchaseById(params.id),
        purchaseAPI.getPurchasedData(params.id),
      ]);

      setPurchase(purchaseRes.data.data);
      setData(dataRes.data.data);
    } catch (error) {
      console.error("Error fetching purchase data:", error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (data.length === 0) return;

    // Get all unique keys from data
    const keys = [...new Set(data.flatMap((item) => Object.keys(item)))];

    // Create CSV header
    let csv = keys.join(",") + "\n";

    // Add rows
    data.forEach((item) => {
      const row = keys.map((key) => {
        const value = item[key];
        if (typeof value === "object" && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value || "").replace(/"/g, '""')}"`;
      });
      csv += row.join(",") + "\n";
    });

    // Download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `purchase_${params.id}_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!purchase || !data) {
    return <div className="text-center">Purchase not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Purchase Details</h1>
        </div>
        <Button onClick={downloadCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Records</p>
              <p className="font-semibold">{purchase.quantity}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Amount</p>
              <p className="font-semibold">₹{purchase.totalAmount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Purchase Date</p>
              <p className="font-semibold">
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data ({data.length} records)</CardTitle>
        </CardHeader>
        <CardContent>
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
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item._id ? (
                        <Link
                          href={`/dashboard/data/${item._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name || "N/A"}
                        </Link>
                      ) : (
                        item.name || "N/A"
                      )}
                    </TableCell>
                    <TableCell>{item.type || "N/A"}</TableCell>
                    <TableCell>{item.email || "N/A"}</TableCell>
                    <TableCell>{item.phone || "N/A"}</TableCell>
                    <TableCell>{item.address?.city || "N/A"}</TableCell>
                    <TableCell>{item.address?.state || "N/A"}</TableCell>
                    <TableCell>{item.category || "N/A"}</TableCell>
                    <TableCell>{item.industry || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
