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
import { Badge } from "@/components/ui/badge";
import { Database, Lock, Zap, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Database className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">DataMarket</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Trusted by 1000+ businesses
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Business Data
            <span className="text-primary"> Marketplace</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Access verified business data with advanced filtering. Preview,
            purchase, and download exactly what you need.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Browsing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose DataMarket?</h2>
            <p className="text-muted-foreground">
              Professional tools for data-driven decisions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Database className="h-6 w-6" />
                </div>
                <CardTitle>Comprehensive Database</CardTitle>
                <CardDescription>
                  Access thousands of verified business records with real-time
                  updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Advanced Filtering</CardTitle>
                <CardDescription>
                  Find exactly what you need with powerful search and filter
                  capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Safe and secure transactions with industry-standard encryption
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-sm bg-card p-8 shadow-md md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="mb-6 text-2xl font-bold">Everything you need</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Real-time data verification and updates
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Export to multiple formats (CSV, JSON, Excel)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Advanced analytics and insights
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      24/7 customer support
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                  <div className="mt-4 text-3xl font-bold text-primary">
                    50K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Data Records
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of businesses already using DataMarket for their data
            needs.
          </p>
          <Link href="/register">
            <Button size="lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DataMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
