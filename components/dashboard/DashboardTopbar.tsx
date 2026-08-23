"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

// Map route to page title
function getPageTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Overview";
  if (pathname.startsWith("/dashboard/users")) return "Users";
  if (pathname.startsWith("/dashboard/services")) return "Services";
  if (pathname.startsWith("/dashboard/orders")) return "Orders";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  return "Dashboard";
}

export default function DashboardTopbar() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between h-[72px] px-6 lg:px-8">
        {/* Left: Page Title */}
        <div className="pl-10 lg:pl-0">
          <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-xs text-gray-400 font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100 focus-within:border-[#FF3811]/30 focus-within:ring-2 focus-within:ring-[#FF3811]/10 transition-all w-56">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          {/* Notification Bell */}
          <button
            className="relative p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer border border-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF3811] rounded-full ring-2 ring-white" />
          </button>

          {/* User Avatar */}
          <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-gray-100 ml-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF3811] to-[#FF6B4A] flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
              <p className="text-[11px] text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
