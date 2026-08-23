"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wrench,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Services", href: "/dashboard/services", icon: Wrench },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1E1E2D] text-white shadow-lg cursor-pointer"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen flex flex-col
          bg-gradient-to-b from-[#1E1E2D] to-[#16162A]
          border-r border-white/5
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Header */}
        <div className={`flex items-center h-[72px] px-4 border-b border-white/5 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#FF3811] flex items-center justify-center text-white flex-shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-white leading-tight">
                  Car<span className="text-[#FF3811]">Doctor</span>
                </span>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                  Admin Panel
                </span>
              </div>
            </Link>
          )}

          {collapsed && (
            <div className="w-9 h-9 rounded-lg bg-[#FF3811] flex items-center justify-center text-white">
              <Wrench className="w-5 h-5" />
            </div>
          )}

          {/* Collapse Toggle (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${collapsed ? "absolute -right-3 top-[22px] bg-[#1E1E2D] border border-white/10 rounded-full w-6 h-6" : ""}`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">
              Menu
            </p>
          )}

          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  group flex items-center gap-3 rounded-xl transition-all duration-200
                  ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5"}
                  ${
                    isActive
                      ? "bg-[#FF3811] text-white shadow-lg shadow-[#FF3811]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className={`border-t border-white/5 p-3 ${collapsed ? "flex justify-center" : ""}`}>
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF3811] to-[#FF6B4A] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@cardoctor.com</p>
              </div>
              <Link href="/" className="p-1.5 text-gray-500 hover:text-red-400 transition-colors cursor-pointer" title="Back to site">
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <Link href="/" className="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer" title="Back to site">
              <LogOut className="w-5 h-5" />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
