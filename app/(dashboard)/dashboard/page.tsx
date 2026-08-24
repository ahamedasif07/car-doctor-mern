"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Wrench,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  ChevronRight,
  Database,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { ApiResponse, IUser } from "@/types";

interface RecentBooking {
  id: string;
  customer: string;
  service: string;
  vehicle: string;
  date: string;
  amount: string;
  status: "Completed" | "In Progress" | "Pending";
}

const mockRecentBookings: RecentBooking[] = [
  {
    id: "BK-8901",
    customer: "Tariqul Islam",
    service: "Full Engine Tune-Up",
    vehicle: "Toyota Corolla 2021",
    date: "Today, 10:30 AM",
    amount: "$250.00",
    status: "In Progress",
  },
  {
    id: "BK-8902",
    customer: "Sarah Jenkins",
    service: "Complete Brake Overhaul",
    vehicle: "Honda Civic 2020",
    date: "Today, 09:15 AM",
    amount: "$180.00",
    status: "Completed",
  },
  {
    id: "BK-8903",
    customer: "Mahmud Hasan",
    service: "AC System Maintenance",
    vehicle: "Hyundai Tucson 2022",
    date: "Yesterday",
    amount: "$120.00",
    status: "Completed",
  },
  {
    id: "BK-8904",
    customer: "Alex Morgan",
    service: "Transmission Fluid Flush",
    vehicle: "Ford Mustang 2019",
    date: "Yesterday",
    amount: "$340.00",
    status: "Pending",
  },
  {
    id: "BK-8905",
    customer: "Fatima Rahman",
    service: "Electrical Diagnostic",
    vehicle: "Nissan X-Trail 2020",
    date: "2 days ago",
    amount: "$95.00",
    status: "Completed",
  },
];

export default function DashboardOverview() {
  const [userCount, setUserCount] = useState<number>(0);
  const [recentUsers, setRecentUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [dbHealth, setDbHealth] = useState<{
    status: "ok" | "error" | "loading";
    message: string;
  }>({ status: "loading", message: "Connecting..." });

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch live registered users
      try {
        const res = await fetch("/api/v1/auth/register");
        const data: ApiResponse<IUser[]> = await res.json();
        if (data.success && data.data) {
          setUserCount(data.data.length);
          setRecentUsers(data.data.slice(-5).reverse());
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoadingUsers(false);
      }

      // 2. Fetch API & MongoDB health check
      try {
        const resHealth = await fetch("/api/v1");
        const healthData = await resHealth.json();
        if (healthData.success) {
          setDbHealth({ status: "ok", message: healthData.message });
        } else {
          setDbHealth({ status: "error", message: healthData.message || "Failed" });
        }
      } catch {
        setDbHealth({ status: "error", message: "Cannot reach server" });
      }
    }

    fetchData();
  }, []);

  const stats = [
    {
      title: "Registered Users",
      value: loadingUsers ? "..." : userCount.toString(),
      change: "+18%",
      trend: "up",
      period: "vs last month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      accent: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-100",
    },
    {
      title: "Active Services",
      value: "6",
      change: "+2 new",
      trend: "up",
      period: "All operational",
      icon: Wrench,
      color: "text-[#FF3811]",
      bgColor: "bg-[#FF3811]/10",
      accent: "from-[#FF3811]/10 to-orange-500/10",
      borderColor: "border-orange-100",
    },
    {
      title: "Total Revenue",
      value: "$14,890",
      change: "+24.5%",
      trend: "up",
      period: "Monthly growth",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      accent: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-100",
    },
    {
      title: "Active Bookings",
      value: "28",
      change: "-3%",
      trend: "down",
      period: "4 pending approval",
      icon: ShoppingCart,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      accent: "from-amber-500/10 to-yellow-500/10",
      borderColor: "border-amber-100",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Banner with Quick Actions */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#1E1E2D] to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#FF3811]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3811]" />
              <span>Car Doctor Enterprise Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-[#FF3811]">Admin</span> 👋
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Everything is running smoothly. You have{" "}
              <span className="text-white font-semibold">{userCount} registered users</span>{" "}
              and 4 pending service bookings today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/users">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-none cursor-pointer"
              >
                <Users className="w-4 h-4 mr-1.5" />
                Manage Users
              </Button>
            </Link>
            <Link href="/dashboard/services">
              <Button variant="brand" className="cursor-pointer">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Service
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid (Shadcn UI Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 group overflow-hidden"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-105 duration-200`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge
                  variant={stat.trend === "up" ? "success" : "destructive"}
                  className="gap-1 font-bold"
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>{stat.title}</span>
                  <span className="text-gray-400">{stat.period}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics & System Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Growth Chart Card (2 Cols) */}
        <Card className="lg:col-span-2 border-gray-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <CardTitle className="text-base sm:text-lg">
                Revenue & Repair Performance
              </CardTitle>
              <CardDescription>
                Monthly earnings breakdown across all 6 service categories
              </CardDescription>
            </div>
            <Badge variant="brand" className="hidden sm:inline-flex">
              +24% Growth
            </Badge>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Chart SVG Visualization */}
            <div className="relative h-48 sm:h-56 w-full flex items-end justify-between gap-2 pt-6">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
                <div className="border-b border-dashed border-gray-200 w-full" />
              </div>

              {/* Monthly Bars */}
              {[
                { month: "Jan", height: "45%", value: "$6.2k" },
                { month: "Feb", height: "60%", value: "$8.4k" },
                { month: "Mar", height: "50%", value: "$7.1k" },
                { month: "Apr", height: "75%", value: "$10.5k" },
                { month: "May", height: "68%", value: "$9.6k" },
                { month: "Jun", height: "90%", value: "$12.8k" },
                { month: "Jul", height: "82%", value: "$11.4k" },
                { month: "Aug", height: "98%", value: "$14.8k", active: true },
              ].map((bar) => (
                <div
                  key={bar.month}
                  className="relative flex-1 flex flex-col items-center gap-2 group z-10"
                >
                  <div
                    style={{ height: bar.height }}
                    className={`w-full max-w-[36px] rounded-t-xl transition-all duration-500 group-hover:opacity-90 ${
                      bar.active
                        ? "bg-gradient-to-t from-[#FF3811] to-[#FF6B4A] shadow-md shadow-[#FF3811]/30"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold ${
                      bar.active ? "text-[#FF3811] font-bold" : "text-gray-500"
                    }`}
                  >
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
              <div>
                <p className="text-xs text-gray-500">Average Job Value</p>
                <p className="text-base font-bold text-gray-900">$215.00</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Completion Rate</p>
                <p className="text-base font-bold text-emerald-600">98.4%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Repeat Customers</p>
                <p className="text-base font-bold text-blue-600">64%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live System & Workshop Status (1 Col) */}
        <Card className="border-gray-200/80 shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">System & Database</CardTitle>
              <Database className="w-4 h-4 text-gray-400" />
            </div>
            <CardDescription>Real-time infrastructure health</CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4 flex-1">
            {/* MongoDB Status Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">MongoDB Driver</span>
                <Badge
                  variant={dbHealth.status === "ok" ? "success" : "destructive"}
                  className="gap-1 font-bold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {dbHealth.status === "ok" ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <p className="text-[11px] text-gray-500 font-mono">
                Cluster: mongodb+srv://.../carDoctor
              </p>
            </div>

            {/* Service Diagnostics */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">Auth Route (/api/v1/auth)</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">Server Latency</span>
                <span className="text-gray-900 font-mono font-semibold">24ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">Next.js App Engine</span>
                <span className="text-slate-700 font-mono font-semibold">v16.3.2</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/dashboard/settings" className="block">
                <Button variant="outline" className="w-full text-xs font-semibold cursor-pointer">
                  Configure Settings
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section: Recent Bookings & Registered Users */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="bg-white border border-gray-200 shadow-2xs">
            <TabsTrigger value="bookings" className="gap-2">
              <Car className="w-4 h-4" />
              Recent Bookings ({mockRecentBookings.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Latest Registered Users ({userCount})
            </TabsTrigger>
          </TabsList>

          <Link href="/dashboard/orders">
            <Button variant="ghost" size="sm" className="text-xs text-[#FF3811] font-semibold cursor-pointer">
              View Complete Log <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Tab 1: Bookings */}
        <TabsContent value="bookings">
          <Card className="border-gray-200/80 shadow-xs overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service & Vehicle</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentBookings.map((bk) => (
                  <TableRow key={bk.id}>
                    <TableCell className="font-mono text-xs font-bold text-gray-900">
                      {bk.id}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800">
                      {bk.customer}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{bk.service}</p>
                        <p className="text-xs text-gray-400">{bk.vehicle}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 text-xs">{bk.date}</TableCell>
                    <TableCell className="font-bold text-gray-900">{bk.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bk.status === "Completed"
                            ? "success"
                            : bk.status === "In Progress"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {bk.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Tab 2: Users */}
        <TabsContent value="users">
          <Card className="border-gray-200/80 shadow-xs overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Profile</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Access Role</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingUsers ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <div className="h-6 bg-gray-100 rounded animate-pulse w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : recentUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                      No users registered in database yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF3811] to-[#FF6B4A] flex items-center justify-center text-white text-xs font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === "admin" ? "brand" : "info"}
                          className="capitalize"
                        >
                          {user.role || "user"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-gray-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href="/dashboard/users">
                          <Button variant="ghost" size="sm" className="text-xs text-[#FF3811]">
                            Manage
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
