"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmittedMessage("Login successful! Redirecting...");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-xs">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight">
        Login
      </h2>

      {submittedMessage && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium text-center animate-fade-in">
          {submittedMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Password / Confirm Password Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Confirm Password
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
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

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#FF3811] hover:bg-[#E02E0B] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-base mt-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Or Sign In with Divider */}
      <div className="my-8 text-center relative">
        <p className="text-sm font-medium text-gray-600 bg-white inline-block px-3">
          Or Sign In with
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {/* Facebook */}
        <button
          type="button"
          aria-label="Sign in with Facebook"
          className="w-11 h-11 rounded-full bg-gray-100 hover:bg-blue-50 text-[#3b5998] hover:scale-110 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        >
          <span className="font-bold text-lg font-serif">f</span>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          aria-label="Sign in with LinkedIn"
          className="w-11 h-11 rounded-full bg-gray-100 hover:bg-blue-50 text-[#0077b5] hover:scale-110 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
        >
          <span className="font-bold text-sm">in</span>
        </button>

        {/* Google */}
        <button
          type="button"
          aria-label="Sign in with Google"
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
        Have an account?{" "}
        <Link
          href="/signup"
          className="text-[#FF3811] font-bold hover:underline transition-all"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
