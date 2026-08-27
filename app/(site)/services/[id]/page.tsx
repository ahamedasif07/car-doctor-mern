import React from "react";
import { notFound } from "next/navigation";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceContent from "@/components/services/ServiceContent";
import ServiceSidebar from "@/components/services/ServiceSidebar";
import ServiceService from "@/services/service.service";
import type { IService } from "@/types";

interface ServiceDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ServiceDetailsProps) {
  const { id } = await params;
  try {
    const service = await ServiceService.getServiceById(id);
    return {
      title: `${service.title} | Car Doctor Services`,
      description: service.description?.slice(0, 160),
    };
  } catch {
    return {
      title: "Service Details | Car Doctor",
    };
  }
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsProps) {
  const { id } = await params;

  let service: IService | null = null;
  let allServices: IService[] = [];

  try {
    service = await ServiceService.getServiceById(id);
    allServices = await ServiceService.getAllServices();
  } catch (error) {
    console.error("Error fetching service details:", error);
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* Top Header Banner */}
        <ServiceBanner title={service.title || "Service Details"} />

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 pt-4">
          {/* Left Main Content (2 cols on desktop) */}
          <div className="lg:col-span-2">
            <ServiceContent service={service} />
          </div>

          {/* Right Sidebar (1 col on desktop) */}
          <div>
            <ServiceSidebar currentService={service} allServices={allServices} />
          </div>
        </div>
      </div>
    </div>
  );
}
