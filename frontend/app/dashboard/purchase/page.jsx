"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paymentAPI, purchaseAPI } from "@/lib/api";

function PurchaseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const maxQuantity = parseInt(searchParams.get("max")) || 1000;
  const [quantity, setQuantity] = useState(maxQuantity);
  const [loading, setLoading] = useState(false);

  const filters = searchParams.get("filters")
    ? JSON.parse(decodeURIComponent(searchParams.get("filters")))
    : {};

  const pricePerUnit = 0.5;
  const totalPrice = (quantity * pricePerUnit).toFixed(2);

  // Update quantity when maxQuantity changes
  useEffect(() => {
    setQuantity(maxQuantity);
  }, [maxQuantity]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async () => {
    setLoading(true);

    try {
      console.log("🚀 Starting payment process...");

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      console.log("📦 Creating order...", { quantity, filters });

      // Create order
      const orderResponse = await paymentAPI.createOrder({
        quantity,
        filterCriteria: filters,
      });

      console.log("✅ Order created:", orderResponse.data);

      const { orderId, amount, purchaseId } = orderResponse.data.data;

      // Get Razorpay key
      const keyResponse = await paymentAPI.getRazorpayKey();
      const razorpayKey = keyResponse.data.key;

      console.log("🔑 Razorpay key retrieved");

      // Razorpay options
      const options = {
        key: razorpayKey,
        amount: amount * 100, // amount in paise
        currency: "INR",
        name: "DataMarket",
        description: `Purchase of ${quantity} data records`,
        order_id: orderId,
        handler: async function (response) {
          try {
            console.log("💳 Payment completed, verifying...", response);

            // Verify payment
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              purchaseId,
            });

            console.log("✅ Payment verified");

            // Complete purchase (create snapshot)
            await purchaseAPI.completePurchase(purchaseId);

            alert("Payment successful!");
            router.push("/dashboard/purchases");
          } catch (error) {
            console.error("❌ Payment verification failed:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function () {
            console.log("💰 Payment modal dismissed");
            setLoading(false);
          },
        },
      };

      console.log("🎨 Opening Razorpay checkout...", options);

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert(`Failed to initiate payment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">Purchase Data</h1>
        <p className="text-muted-foreground mt-2">
          Review your selection and complete your purchase
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>
            {maxQuantity.toLocaleString()} records available for your filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quantity Selector */}
          <div className="space-y-3">
            <Label htmlFor="quantity" className="text-base">
              Number of Records
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="quantity"
                type="number"
                min="1"
                max={maxQuantity}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > 0 && val <= maxQuantity) {
                    setQuantity(val);
                  }
                }}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">
                of {maxQuantity.toLocaleString()} available
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Price per record:</span>
              <span>₹{pricePerUnit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{quantity.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            className="w-full h-12 text-base"
            size="lg"
            disabled={loading}
          >
            {loading ? "Processing..." : `Purchase ₹${totalPrice}`}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Razorpay. You will receive the exact data
            snapshot at the time of purchase.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applied Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(filters).map(([key, value]) => {
              if (value) {
                return (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span>{value}</span>
                  </div>
                );
              }
              return null;
            })}
            {Object.values(filters).every((v) => !v) && (
              <p className="text-sm text-muted-foreground">
                No filters applied
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseContent />
    </Suspense>
  );
}
