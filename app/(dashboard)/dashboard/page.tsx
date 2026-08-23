"use client";

import React, { useEffect, useState } from "react";
import { Users, Wrench, DollarSign, ShoppingCart, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ApiResponse, IUser } from "@/types";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export default function DashboardOverview() {
  const [userCount, setUserCount] = useState<number>(0);
  const [recentUsers, setRecentUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/v1/auth/register");
        const data: ApiResponse<IUser[]> = await res.json();

        if (data.success && data.data) {
          setUserCount(data.data.length);
          // Get 5 most recent users
          setRecentUsers(data.data.slice(-5).reverse());
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const stats: StatCard[] = [
    {
      title: "Total Users",
      value: loading ? "..." : userCount.toString(),
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Services",
      value: "6",
      change: "+3%",
      trend: "up",
      icon: Wrench,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
    {
      title: "Active Orders",
      value: "23",
      change: "-5%",
      trend: "down",
      icon: ShoppingCart,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, <span className="text-[#FF3811]">Admin</span> 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s what&apos;s happening with your car service business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Users Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
            <p className="text-xs text-gray-400 mt-0.5">Latest registered users</p>
          </div>
          <Link
            href="/dashboard/users"
            className="flex items-center gap-1 text-sm font-semibold text-[#FF3811] hover:underline"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  User
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                // Skeleton rows
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : recentUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No users registered yet
                  </td>
                </tr>
              ) : (
                recentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF3811] to-[#FF6B4A] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-violet-50 text-violet-600"
                            : "bg-sky-50 text-sky-600"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
