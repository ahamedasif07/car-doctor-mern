import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceService from "@/services/service.service";
import type { IService } from "@/types";

export const metadata = {
  title: "Services | Car Doctor",
  description: "Explore our professional automotive repair and maintenance services.",
};

export default async function ServicesPage() {
  let services: IService[] = [];
  try {
    services = await ServiceService.getAllServices();
  } catch (error) {
    console.error("Failed to load services from DB:", error);
  }

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header Banner */}
        <ServiceBanner title="Our Services" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3811]/10 text-[#FF3811] font-bold text-xs uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Comprehensive Auto Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Premium Auto Maintenance & Repair
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Choose from our specialized auto repair services executed by certified mechanics using state-of-the-art diagnostic equipment.
          </p>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium">No services found in the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id || service.service_id}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#FF3811]/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden mb-5 bg-gray-100">
                    <Image
                      src={service.img || "/images/hero_banner.jpg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                      ${typeof service.price === "number" ? service.price.toFixed(2) : service.price}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF3811] transition-colors line-clamp-1">
                    {service.title}
                  </h3>

                  {/* Description Snippet */}
                  <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Facilities Count / Highlights */}
                  {service.facility && service.facility.length > 0 && (
                    <div className="space-y-1.5 mb-4 pt-3 border-t border-gray-100">
                      {service.facility.slice(0, 2).map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3811] shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Service Fee</span>
                    <span className="text-[#FF3811] font-extrabold text-xl">
                      ${typeof service.price === "number" ? service.price.toFixed(2) : service.price}
                    </span>
                  </div>

                  <Link
                    href={`/services/${service._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 group-hover:bg-[#FF3811] text-gray-800 group-hover:text-white font-bold text-xs transition-all shadow-xs"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
