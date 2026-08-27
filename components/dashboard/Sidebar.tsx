"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import axios from "axios";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users, badge: "Live" },
  { name: "Services", href: "/dashboard/services", icon: Wrench, count: 6 },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart, count: 12 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      toast.success("Admin signed out successfully");
      router.push("/admin/login");
      router.refresh();
    }
  };


  return (
    <>
      {/* Mobile Hamburger Trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-gray-900/90 text-white shadow-xl backdrop-blur-md cursor-pointer border border-white/10 active:scale-95 transition-transform"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen flex flex-col
          bg-[#0F172A] text-slate-200
          border-r border-slate-800/80 shadow-2xl
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[76px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand Header */}
        <div
          className={`flex items-center h-[76px] px-5 border-b border-slate-800/80 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed ? (
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3811] to-[#FF7043] flex items-center justify-center text-white shadow-md shadow-[#FF3811]/30 group-hover:scale-105 transition-transform duration-200">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white tracking-tight">
                    Car<span className="text-[#FF3811]">Doctor</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#FF3811]/20 text-[#FF5A36] border border-[#FF3811]/30">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  Admin Workspace
                </span>
              </div>
            </Link>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3811] to-[#FF7043] flex items-center justify-center text-white shadow-md shadow-[#FF3811]/30">
              <Wrench className="w-5 h-5" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ${
              collapsed
                ? "absolute -right-3.5 top-[24px] bg-slate-900 border border-slate-700 rounded-full w-7 h-7 shadow-lg z-50 text-slate-300"
                : ""
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {!collapsed && (
            <div className="flex items-center justify-between px-3 mb-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Main Menu
              </span>
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            </div>
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
                  group relative flex items-center gap-3 rounded-xl font-medium transition-all duration-200
                  ${collapsed ? "justify-center px-0 py-3" : "px-3.5 py-2.5"}
                  ${
                    isActive
                      ? "bg-[#FF3811] text-white shadow-lg shadow-[#FF3811]/30 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                  }
                `}
                title={collapsed ? item.name : undefined}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                  }`}
                />

                {!collapsed && (
                  <>
                    <span className="text-sm flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                    {item.count && !isActive && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Live Site Quick Link */}
        {!collapsed && (
          <div className="p-3 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/60 shadow-inner">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Live Workshop</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2.5">
              Open public website in client view.
            </p>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-600/40 transition-colors"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Bottom Profile Section */}
        <div className="border-t border-slate-800/80 p-3">
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800/80 transition-colors">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF3811] to-[#FF7043] flex items-center justify-center text-white text-xs font-black shadow-sm">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {user?.name || "Super Admin"}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {user?.email || "admin@cardoctor.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Sign Out of Dashboard"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Sign Out of Dashboard"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

