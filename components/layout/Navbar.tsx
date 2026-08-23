"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Wrench } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/services/1" },
    { name: "Add Service", href: "/add-service" },
    { name: "Checkout", href: "/checkout" },
    { name: "Login", href: "/login" },
  ];

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

            <Link
              href="#appointment"
              className="px-6 py-3 border-2 border-[#FF3811] text-[#FF3811] font-semibold rounded-lg hover:bg-[#FF3811] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
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
