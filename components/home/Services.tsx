"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IService } from "@/types";

interface ServicesProps {
  services?: IService[];
}

export default function Services({ services = [] }: ServicesProps) {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-[#FF3811] font-bold text-base tracking-wider uppercase">
          Service
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Our Service Area
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => {
          const serviceId = service._id;
          const displayPrice = typeof service.price === "number" ? `$${service.price.toFixed(2)}` : (service.price.startsWith("$") ? service.price : `$${service.price}`);

          return (
            <div
              key={service._id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Card Image */}
                <div className="relative w-full h-[210px] rounded-xl overflow-hidden mb-5 bg-gray-100">
                  <Image
                    src={service.img || "/images/hero_banner.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF3811] transition-colors line-clamp-1">
                  {service.title}
                </h3>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-[#FF3811] font-bold text-xl">
                  Price: {displayPrice}
                </span>

                <Link
                  href={`/services/${serviceId}`}
                  aria-label={`View ${service.title}`}
                  className="w-10 h-10 rounded-full bg-gray-50 text-[#FF3811] group-hover:bg-[#FF3811] group-hover:text-white flex items-center justify-center transition-colors shadow-xs"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action */}
      <div className="text-center mt-12">
        <Link
          href="/services"
          className="inline-block px-8 py-3.5 border-2 border-[#FF3811] text-[#FF3811] font-semibold rounded-lg hover:bg-[#FF3811] hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
        >
          More Services
        </Link>
      </div>
    </section>
  );
}
