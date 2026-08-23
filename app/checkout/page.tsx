"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/shared/PageBanner";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order Confirmed Successfully!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        {/* Header Banner */}
        <PageBanner title="Check Out" breadcrumb="Checkout" />

        {/* Checkout Form Card Container */}
        <div className="bg-[#F3F3F3] rounded-3xl p-6 sm:p-12 lg:p-20 shadow-xs border border-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Grid (2 columns on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Your Message"
                className="w-full bg-white rounded-xl p-5 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#FF3811] text-white font-extrabold text-lg rounded-xl hover:bg-[#e02d08] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Order Confirm
              </button>
            </div>

          </form>
        </div>

      </main>

      <Footer />
    </div>
  );
}
