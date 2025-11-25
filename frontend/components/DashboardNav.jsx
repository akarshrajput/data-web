"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  LogOut,
  Database,
  Upload,
  ShoppingBag,
  Menu,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardNav() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const NavItems = () => (
    <>
      <Link href="/dashboard">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start sm:w-auto sm:justify-center"
        >
          <Database className="h-4 w-4 mr-2" />
          <span className="sm:hidden md:inline">Browse Data</span>
          <span className="hidden sm:inline md:hidden">Browse</span>
        </Button>
      </Link>

      <Link href="/dashboard/purchases">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start sm:w-auto sm:justify-center"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          <span className="sm:hidden md:inline">My Purchases</span>
          <span className="hidden sm:inline md:hidden">My Data</span>
        </Button>
      </Link>

      {user?.role === "admin" && (
        <Link href="/dashboard/admin/upload">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start sm:w-auto sm:justify-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            <span className="sm:hidden md:inline">Upload Data</span>
            <span className="hidden sm:inline md:hidden">Upload</span>
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <Database className="h-5 w-5" />
          </div>
          <span className="hidden font-bold sm:inline-block">DataMarket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavItems />
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-2 text-lg font-semibold">
                    Navigation
                  </h2>
                  <div className="space-y-1">
                    <NavItems />
                  </div>
                </div>
                <div className="px-3 py-2 border-t">
                  <div className="flex items-center space-x-2 px-2 py-2 text-sm">
                    <User className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start mt-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
