"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Wrench } from "lucide-react";
import type { IService } from "@/types";

interface ServiceSidebarProps {
  currentService?: IService;
  allServices?: IService[];
}

export default function ServiceSidebar({
  currentService,
  allServices = [],
}: ServiceSidebarProps) {
  const currentId = currentService?._id;
  const currentPrice = currentService?.price || "20.00";

  return (
    <aside className="space-y-8">
      {/* 1. Services Menu Card */}
      <div className="bg-gray-50/90 rounded-2xl p-7 border border-gray-200/80 shadow-xs space-y-5">
        <h3 className="text-xl font-extrabold text-gray-900">
          Services
        </h3>

        <div className="space-y-3">
          {allServices.length > 0 ? (
            allServices.map((item) => {
              const itemId = item._id;
              const isSelected = String(itemId) === String(currentId);

              return (
                <Link
                  key={item._id}
                  href={`/services/${item._id}`}
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                    isSelected
                      ? "bg-[#FF3811] text-white shadow-md"
                      : "bg-white text-gray-700 hover:text-[#FF3811] hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <span className="truncate pr-2">{item.title}</span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? "text-white" : "text-[#FF3811]"
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-xs text-gray-500">No other services found.</p>
          )}
        </div>
      </div>


      {/* 2. Download Section */}
      <div className="bg-[#151515] rounded-2xl p-7 text-white shadow-xl space-y-5">
        <h3 className="text-xl font-extrabold tracking-wide">
          Download
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/80 border border-gray-700/50 hover:border-[#FF3811] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-gray-300 group-hover:text-[#FF3811] transition-colors" />
              <div>
                <h4 className="font-bold text-sm text-white">Our Brochure</h4>
                <p className="text-xs text-gray-400">Download PDF</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FF3811] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/80 border border-gray-700/50 hover:border-[#FF3811] transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-gray-300 group-hover:text-[#FF3811] transition-colors" />
              <div>
                <h4 className="font-bold text-sm text-white">Company Specs</h4>
                <p className="text-xs text-gray-400">Download Doc</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FF3811] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Car Doctor Special Quote Card */}
      <div className="bg-[#151515] rounded-2xl p-8 text-white shadow-xl text-center space-y-6 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#FF3811]/20 flex items-center justify-center text-[#FF3811]">
          <Wrench className="w-8 h-8" />
        </div>

        <span className="text-2xl font-extrabold text-white tracking-tight">
          Car<span className="text-[#FF3811]">Doctor</span>
        </span>

        <h3 className="text-lg font-bold leading-snug text-gray-200">
          Need Help? We Are Here To Help You
        </h3>

        <div className="w-full bg-white rounded-2xl p-5 text-[#151515] space-y-1 shadow-md">
          <h4 className="font-extrabold text-base">
            Car Doctor <span className="text-[#FF3811]">Special</span>
          </h4>
          <p className="text-xs font-bold text-gray-600">
            Save up to <span className="text-[#FF3811]">60% off</span>
          </p>
        </div>

        <Link
          href="/#appointment"
          className="w-full inline-block py-3.5 px-6 bg-[#FF3811] text-white font-bold rounded-xl hover:bg-[#e02d08] transition-all duration-300 shadow-lg cursor-pointer"
        >
          Get A Quote
        </Link>
      </div>

      {/* 4. Price & Proceed Checkout */}
      <div className="space-y-4 pt-2">
        <h3 className="text-2xl font-extrabold text-gray-900">
          Price: ${typeof currentPrice === "number" ? currentPrice.toFixed(2) : currentPrice}
        </h3>

        <Link
          href={`/checkout?service_id=${currentId}`}
          className="block w-full py-4 text-center bg-[#FF3811] text-white font-extrabold text-base rounded-xl hover:bg-[#e02d08] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
          Proceed to Checkout
        </Link>
      </div>
    </aside>
  );
}
