import React from "react";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceContent from "@/components/services/ServiceContent";
import ServiceSidebar from "@/components/services/ServiceSidebar";

export default function ServiceDetailsPage() {
  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* Top Header Banner */}
        <ServiceBanner title="Service Details" />

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 pt-4">
          {/* Left Main Content (2 cols on desktop) */}
          <div className="lg:col-span-2">
            <ServiceContent />
          </div>

          {/* Right Sidebar (1 col on desktop) */}
          <div>
            <ServiceSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
