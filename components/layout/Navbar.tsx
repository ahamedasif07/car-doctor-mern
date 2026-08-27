"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Wrench, LogOut, LayoutDashboard, UserCheck } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import axios from "axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Add Service", href: "/add-service" },
    { name: "Checkout", href: "/checkout" },
  ];

  // Only show Login link in navbar if user is not logged in
  const navLinks = user
    ? baseNavLinks
    : [...baseNavLinks, { name: "Login", href: "/login" }];

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      logout();
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    }
  };


  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-[#FF3811]/10 flex items-center justify-center text-[#FF3811] group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Car<span className="text-[#FF3811]">Doctor</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-semibold transition-colors ${
                    isActive ? "text-[#FF3811]" : "text-gray-700 hover:text-[#FF3811]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              aria-label="Search"
              className="p-2 text-gray-600 hover:text-[#FF3811] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              aria-label="Shopping Cart"
              className="p-2 text-gray-600 hover:text-[#FF3811] hover:bg-gray-100 rounded-full transition-colors cursor-pointer relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3811] rounded-full"></span>
            </button>

            {/* Profile Avatar / Initial when Logged In */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#FF3811] to-[#FF6B4A] text-white font-bold text-lg shadow-md hover:scale-105 transition-all duration-200 ring-2 ring-[#FF3811]/30 cursor-pointer"
                  aria-label="User Profile Menu"
                  title={user.name}
                >
                  {userInitial}
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-xl py-3 px-4 z-50 animate-[fadeIn_0.15s_ease-out]">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF3811] text-white font-bold text-base">
                        {userInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      <div className="px-2 py-1 flex items-center justify-between text-xs text-gray-500">
                        <span>Role:</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 font-semibold text-gray-700 uppercase text-[10px]">
                          {user.role || "User"}
                        </span>
                      </div>

                      {user.role === "admin" && (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#FF3811] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#FF3811]" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all shadow-sm"
              >
                Login
              </Link>
            )}

            <Link
              href="#appointment"
              className="px-6 py-3 border-2 border-[#FF3811] text-[#FF3811] font-semibold rounded-lg hover:bg-[#FF3811] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {user && (
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FF3811] text-white font-bold text-sm">
                {userInitial}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#FF3811] hover:bg-gray-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF3811] text-white font-bold text-base">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-semibold text-gray-700 hover:text-[#FF3811] px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-semibold text-[#FF3811] px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="text-left text-base font-semibold text-red-600 px-2 py-1.5 rounded-md hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            )}
          </nav>
          
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button aria-label="Search" className="p-2 text-gray-600 hover:text-[#FF3811]">
                <Search className="w-5 h-5" />
              </button>
              <button aria-label="Cart" className="p-2 text-gray-600 hover:text-[#FF3811]">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
            
            <Link
              href="#appointment"
              onClick={() => setIsMenuOpen(false)}
              className="flex-1 text-center px-4 py-2.5 border-2 border-[#FF3811] text-[#FF3811] font-semibold rounded-lg hover:bg-[#FF3811] hover:text-white transition-colors"
            >
              Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
