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
import { Eye, Calendar, Package, Download, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">My Purchases</h1>
          <p className="text-muted-foreground">
            View and manage your data purchases
          </p>
        </div>
      </div>

      {purchases.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No purchases yet</h3>
            <p className="text-muted-foreground mb-6">
              Start browsing our business data to make your first purchase
            </p>
            <Link href="/dashboard">
              <Button>Browse Data</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {purchases.length} purchase{purchases.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid gap-4">
            {purchases.map((purchase) => (
              <Card
                key={purchase._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">
                          {purchase.quantity.toLocaleString()} Records
                        </CardTitle>
                        <Badge
                          variant={
                            purchase.paymentStatus === "completed"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {purchase.paymentStatus}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Purchased on {formatDate(purchase.purchaseDate)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl font-bold">
                        ₹{purchase.totalAmount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ₹{purchase.pricePerUnit} per record
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="text-sm text-muted-foreground">
                      Purchase ID: {purchase._id}
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/purchases/${purchase._id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Data
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
