/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  Users as UsersIcon,
  RefreshCw,
  UserPlus,
  Shield,
  UserCheck,
  Mail,
  Calendar,
  Filter,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { ApiResponse, IUser } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [refreshing, setRefreshing] = useState(false);

  async function fetchUsers() {
    try {
      setError(null);
      const res = await fetch("/api/v1/auth/register");
      const data: ApiResponse<IUser[]> = await res.json();

      if (data.success && data.data) {
        setUsers(data.data);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch {
      setError("Network error. Please make sure the server and MongoDB are connected.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  // Filter users by search and role
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole =
        roleFilter === "all" ? true : (u.role || "user") === roleFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.role || "user").toLowerCase().includes(q);

      return matchesRole && matchesSearch;
    });
  }, [users, searchQuery, roleFilter]);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const standardUserCount = users.filter((u) => u.role !== "admin").length;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              User Accounts
            </h2>
            <Badge variant="brand" className="font-bold">
              {users.length} Total
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage authenticated accounts, permissions, and security roles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-gray-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">All Registered</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{users.length}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UsersIcon className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border-gray-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Administrators</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{adminCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border-gray-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Standard Customers</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{standardUserCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm font-medium flex items-center justify-between">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Retry
          </Button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <Card className="border-gray-200/80 shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Role Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-gray-500 mr-1 hidden sm:inline-flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {(["all", "admin", "user"] as const).map((r) => (
              <Button
                key={r}
                variant={roleFilter === r ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(r)}
                className="capitalize text-xs font-medium cursor-pointer"
              >
                {r === "all" ? "All Users" : r === "admin" ? "Admins" : "Customers"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-gray-200/80 shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>User Profile</TableHead>
              <TableHead>Email Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Registered On</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-200 animate-pulse" />
                      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <UsersIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold">No users matched your criteria</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {searchQuery
                          ? `No records found for "${searchQuery}"`
                          : "No users registered yet."}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, index) => {
                const avatarGradients = [
                  "from-[#FF3811] to-[#FF6B4A]",
                  "from-blue-500 to-indigo-600",
                  "from-emerald-500 to-teal-600",
                  "from-violet-500 to-purple-600",
                  "from-amber-500 to-orange-600",
                ];
                const gradient =
                  avatarGradients[user.name.charCodeAt(0) % avatarGradients.length];

                return (
                  <TableRow key={user._id} className="hover:bg-slate-50/80 transition-colors">
                    <TableCell className="text-gray-400 font-mono text-xs">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-xs`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono">
                            ID: {user._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {user.email}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "brand" : "info"}
                        className="capitalize font-semibold"
                      >
                        {user.role || "user"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Badge variant="success" className="gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Footer */}
        {!loading && filteredUsers.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-500">
            <span>
              Showing <strong className="text-gray-900">{filteredUsers.length}</strong> of{" "}
              <strong className="text-gray-900">{users.length}</strong> users
            </span>
            <span>Database Collection: users</span>
          </div>
        )}
      </Card>
    </div>
  );
}
