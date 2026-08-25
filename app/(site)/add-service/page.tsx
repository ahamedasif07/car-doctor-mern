"use client";

import React, { useState } from "react";
import PageBanner from "@/components/shared/PageBanner";

export default function AddServicePage() {
  const [formData, setFormData] = useState({
    serviceName: "",
    servicePrice: "",
    textHere: "",
    serviceType: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("New Service Added Successfully!");
  };

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        {/* Header Banner */}
        <PageBanner title="Add New Service" breadcrumb="Service" />

        {/* Add Service Form Container */}
        <div className="bg-[#F3F3F3] rounded-3xl p-6 sm:p-12 lg:p-20 shadow-xs border border-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Grid (2 columns on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  placeholder="Service Name"
                  required
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="servicePrice"
                  value={formData.servicePrice}
                  onChange={handleChange}
                  placeholder="Service Price"
                  required
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="textHere"
                  value={formData.textHere}
                  onChange={handleChange}
                  placeholder="Text here"
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  placeholder="Service Type"
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Product Description Textarea */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Product Description"
                className="w-full bg-white rounded-xl p-5 text-gray-800 placeholder:text-gray-400 border border-gray-100 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all text-sm sm:text-base resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#FF3811] text-white font-extrabold text-lg rounded-xl hover:bg-[#e02d08] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
