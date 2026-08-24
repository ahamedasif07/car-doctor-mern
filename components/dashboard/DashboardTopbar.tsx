"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Command,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function getPageDetails(pathname: string) {
  if (pathname === "/dashboard") {
    return { title: "Executive Overview", subtitle: "Live metrics and business operations" };
  }
  if (pathname.startsWith("/dashboard/users")) {
    return { title: "Users Management", subtitle: "Access control, roles & registered accounts" };
  }
  if (pathname.startsWith("/dashboard/services")) {
    return { title: "Car Services Catalog", subtitle: "Manage repair services, diagnostics & pricing" };
  }
  if (pathname.startsWith("/dashboard/orders")) {
    return { title: "Service Bookings & Orders", subtitle: "Track ongoing repairs and completed jobs" };
  }
  if (pathname.startsWith("/dashboard/settings")) {
    return { title: "Workshop Settings", subtitle: "Configure workshop profile, notifications & security" };
  }
  return { title: "Dashboard", subtitle: "Car Doctor Admin Portal" };
}

export default function DashboardTopbar() {
  const pathname = usePathname();
  const { title, subtitle } = getPageDetails(pathname);
  const [dbStatus, setDbStatus] = useState<"checking" | "online" | "offline">("checking");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/v1");
        const data = await res.json();
        if (data.success) {
          setDbStatus("online");
        } else {
          setDbStatus("offline");
        }
      } catch {
        setDbStatus("offline");
      }
    }

    checkHealth();
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 transition-all duration-200">
      <div className="flex items-center justify-between h-[76px] px-6 lg:px-8">
        {/* Left Section: Breadcrumb & Title */}
        <div className="pl-11 lg:pl-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-0.5">
            <Link href="/dashboard" className="hover:text-gray-900 transition-colors">
              Admin
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-semibold">{title}</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight flex items-center gap-2">
            {title}
          </h1>
        </div>

        {/* Right Section: Actions & System Status */}
        <div className="flex items-center gap-3.5">
          {/* Live DB Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs">
            <span
              className={`w-2 h-2 rounded-full ${
                dbStatus === "online"
                  ? "bg-emerald-500 animate-pulse"
                  : dbStatus === "offline"
                  ? "bg-red-500"
                  : "bg-amber-500 animate-bounce"
              }`}
            />
            <span className="text-xs font-semibold text-slate-700">
              {dbStatus === "online"
                ? "MongoDB Connected"
                : dbStatus === "offline"
                ? "DB Offline"
                : "Connecting..."}
            </span>
          </div>

          {/* Quick Search Input with Shortcut Badge */}
          <div className="hidden md:flex items-center gap-2.5 bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200/80 focus-within:bg-white focus-within:border-[#FF3811]/40 focus-within:ring-3 focus-within:ring-[#FF3811]/10 transition-all duration-200 w-56 lg:w-64 shadow-2xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none text-xs text-slate-800 placeholder-slate-400 w-full"
            />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 transition-colors cursor-pointer shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF3811] rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-gray-200 shadow-xl p-4 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">Notifications</span>
                    <Badge variant="brand" className="text-[10px] py-0 px-1.5">
                      3 New
                    </Badge>
                  </div>
                  <button
                    onClick={() => setNotificationOpen(false)}
                    className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-[#FF3811]/5 border border-[#FF3811]/10 flex items-start gap-2.5">
                    <div className="p-1 rounded-md bg-[#FF3811] text-white">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">New Booking Request</p>
                      <p className="text-[11px] text-gray-500">Engine diagnosis scheduled for 2:30 PM</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-2.5">
                    <div className="p-1 rounded-md bg-emerald-600 text-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Order Completed</p>
                      <p className="text-[11px] text-gray-500">Payment received for #ORD-9821</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-gray-200/80">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3811] to-[#FF7043] flex items-center justify-center text-white text-xs font-black shadow-md shadow-[#FF3811]/20">
                AD
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-gray-900 leading-tight">Master Admin</p>
              <p className="text-[11px] text-gray-400 font-medium">Workshop Lead</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
