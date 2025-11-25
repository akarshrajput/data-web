"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { purchaseAPI } from "@/lib/api";
import { Eye, Calendar, Package } from "lucide-react";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await purchaseAPI.getMyPurchases();
      setPurchases(response.data.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Purchases</h1>
      </div>

      {purchases.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No purchases yet</p>
            <Link href="/dashboard">
              <Button>Browse Data</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {purchases.map((purchase) => (
            <Card key={purchase._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{purchase.quantity} Records</CardTitle>
                    <CardDescription>
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {formatDate(purchase.purchaseDate)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₹{purchase.totalAmount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{purchase.pricePerUnit} per record
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      Status:{" "}
                      <span className="text-foreground font-medium">
                        {purchase.paymentStatus}
                      </span>
                    </p>
                  </div>
                  <Link href={`/dashboard/purchases/${purchase._id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Data
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
