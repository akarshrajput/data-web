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
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      // Create order
      const orderResponse = await paymentAPI.createOrder({
        quantity,
        filterCriteria: filters,
      });

      const { orderId, amount, purchaseId } = orderResponse.data.data;

      // Get Razorpay key
      const keyResponse = await paymentAPI.getRazorpayKey();
      const razorpayKey = keyResponse.data.key;

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
            // Verify payment
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              purchaseId,
            });

            // Complete purchase (create snapshot)
            await purchaseAPI.completePurchase(purchaseId);

            alert("Payment successful!");
            router.push("/dashboard/purchases");
          } catch (error) {
            alert("Payment verification failed");
            console.error(error);
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
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Purchase Data</h1>

      <Card>
        <CardHeader>
          <CardTitle>Select Quantity</CardTitle>
          <CardDescription>
            {maxQuantity} records available for your filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (max: {maxQuantity})</Label>
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
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per record:</span>
              <span>₹{pricePerUnit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You will receive the exact data snapshot at the time of purchase.
            New data added later won't affect your purchase.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applied Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-1">
            {Object.entries(filters).map(([key, value]) => {
              if (value) {
                return (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span>{value}</span>
                  </div>
                );
              }
              return null;
            })}
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
