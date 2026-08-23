"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthIllustration from "@/components/auth/AuthIllustration";
import { Eye, EyeOff, Mail, User } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("====================================");
    console.log("🚀 REGISTER FORM SUBMITTED!");
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    console.log("Confirm Password:", formData.confirmPassword);
    console.log("Full Object:", formData);
    console.log("====================================");
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex items-center justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Column - Vector Graphic Illustration */}
        <div className="hidden md:flex items-center justify-center p-4">
          <AuthIllustration />
        </div>

        {/* Right Column - Register Form Container */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-xs">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight">
              Sign Up
            </h2>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#FF3811] focus:ring-2 focus:ring-[#FF3811]/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white text-base"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#FF3811] focus:ring-2 focus:ring-[#FF3811]/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white text-base"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#FF3811] focus:ring-2 focus:ring-[#FF3811]/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white text-base pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF3811] transition-colors p-1 cursor-pointer"
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#FF3811] focus:ring-2 focus:ring-[#FF3811]/20 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white text-base pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF3811] transition-colors p-1 cursor-pointer"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#FF3811] hover:bg-[#E02E0B] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer text-base mt-2"
              >
                Sign Up
              </button>
            </form>

            {/* Or Sign Up with Divider */}
            <div className="my-8 text-center relative">
              <p className="text-sm font-medium text-gray-600 bg-white inline-block px-3">
                Or Sign Up with
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                type="button"
                aria-label="Sign up with Facebook"
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-blue-50 text-[#3b5998] hover:scale-110 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <span className="font-bold text-lg font-serif">f</span>
              </button>

              <button
                type="button"
                aria-label="Sign up with LinkedIn"
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-blue-50 text-[#0077b5] hover:scale-110 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <span className="font-bold text-sm">in</span>
              </button>

              <button
                type="button"
                aria-label="Sign up with Google"
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-red-50 text-[#ea4335] hover:scale-110 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </button>
            </div>

            {/* Account Redirect Footer Link */}
            <p className="text-center text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#FF3811] font-bold hover:underline transition-all"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}