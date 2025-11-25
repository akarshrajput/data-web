"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, Lock, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">DataMarket</h1>
          <div className="space-x-2">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Business Data Marketplace</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access verified business data. Filter, preview, and purchase exactly
          what you need.
        </p>
        <Link href="/register">
          <Button size="lg">Get Started</Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 mb-2" />
              <CardTitle>Vast Database</CardTitle>
              <CardDescription>
                Access thousands of business records
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2" />
              <CardTitle>Dynamic Filters</CardTitle>
              <CardDescription>
                Find exactly what you need with powerful filters
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 mb-2" />
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>Safe transactions with Razorpay</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 DataMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
