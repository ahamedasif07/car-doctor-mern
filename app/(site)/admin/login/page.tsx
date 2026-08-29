"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { ShieldCheck, Lock, User, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, IUser, AdminLoginPayload } from "@/types";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { login } = useAuthStore();

  const [formData, setFormData] = useState<AdminLoginPayload>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post<ApiResponse<Omit<IUser, "password">>>(
        "/api/v1/auth/admin-login",
        formData
      );

      if (response.data.success && response.data.data) {
        const adminUser = response.data.data;

        // 1. Save admin in auth store
        login(adminUser);

        // 2. Success message
        toast.success("Welcome back, Administrator! Access granted.");

        // 3. Redirect to dashboard
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh();
        }, 500);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiResponse>(error)) {
        const errorMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Invalid username or password.";
        toast.error(errorMsg);
      } else {
        toast.error("An unexpected authentication error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Top Branding Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF3811] to-[#D92D07] text-white shadow-lg shadow-[#FF3811]/30 mb-4 ring-4 ring-[#FF3811]/10">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="inline-block px-3 py-1 bg-red-100 text-[#FF3811] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Restricted Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Control Center
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in with authorized administrator credentials
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. admin"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FF3811] focus:ring-2 focus:ring-[#FF3811]/20 outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50/50 focus:bg-white text-sm"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-200 focus:border-[#FF3811] focus:ring-2 focus:ring-[#FF3811]/20 outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50/50 focus:bg-white text-sm"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF3811] transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#FF3811] hover:bg-[#E02E0B] text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-[#FF3811]/25 hover:shadow-lg active:scale-[0.99] cursor-pointer text-sm mt-3 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Authenticate & Enter Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer Information */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#FF3811] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Car Doctor Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#FF3811] animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

