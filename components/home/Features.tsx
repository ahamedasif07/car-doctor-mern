"use client";

import React from "react";
import { Users, Clock, Headphones, Wrench, ShieldCheck, Truck } from "lucide-react";

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Expert Team",
      icon: Users,
      active: false,
    },
    {
      id: 2,
      title: "Timely Delivery",
      icon: Clock,
      active: true, // Highlighted like reference design
    },
    {
      id: 3,
      title: "24/7 Support",
      icon: Headphones,
      active: false,
    },
    {
      id: 4,
      title: "Best Equipment",
      icon: Wrench,
      active: false,
    },
    {
      id: 5,
      title: "100% Guaranty",
      icon: ShieldCheck,
      active: false,
    },
    {
      id: 6,
      title: "Fast Delivery",
      icon: Truck,
      active: false,
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-[#FF3811] font-bold text-base tracking-wider uppercase">
          Core Features
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Why Choose Us
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {features.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border ${
                item.active
                  ? "bg-[#FF3811] text-white border-[#FF3811] shadow-lg scale-105"
                  : "bg-white text-gray-800 border-gray-200 hover:border-[#FF3811] hover:shadow-md hover:-translate-y-1"
              }`}
            >
              <div className="mb-4">
                <IconComponent
                  className={`w-10 h-10 ${
                    item.active ? "text-white" : "text-[#FF3811]"
                  }`}
                />
              </div>
              <h3 className="font-bold text-base sm:text-lg tracking-tight">
                {item.title}
              </h3>
            </div>
          );
        })}
      </div>

    </section>
  );
}
