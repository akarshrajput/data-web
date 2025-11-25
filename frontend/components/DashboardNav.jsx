"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { LogOut, Database, Upload, ShoppingBag } from "lucide-react";

export default function DashboardNav() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">DataMarket</h1>

        <nav className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Browse
            </Button>
          </Link>

          <Link href="/dashboard/purchases">
            <Button variant="ghost" size="sm">
              <ShoppingBag className="h-4 w-4 mr-2" />
              My Data
            </Button>
          </Link>

          {user?.role === "admin" && (
            <Link href="/dashboard/admin/upload">
              <Button variant="ghost" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}
