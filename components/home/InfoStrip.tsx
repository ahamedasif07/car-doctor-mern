"use client";

import React from "react";
import { Calendar, PhoneCall, MapPin } from "lucide-react";

export default function InfoStrip() {
  const infoItems = [
    {
      id: 1,
      icon: Calendar,
      subtitle: "We are open monday-friday",
      title: "7:00 am - 9:00 pm",
    },
    {
      id: 2,
      icon: PhoneCall,
      subtitle: "Have a question?",
      title: "+2547 251 2658",
    },
    {
      id: 3,
      icon: MapPin,
      subtitle: "Need a repair? our location",
      title: "Liza Street, New York",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#151515] rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
          {infoItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-5 ${idx !== 0 ? "pt-6 md:pt-0 md:pl-8 lg:pl-12" : ""}`}
              >
                <div className="w-14 h-14 rounded-full bg-[#FF3811]/15 flex items-center justify-center text-[#FF3811] shrink-0">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">
                    {item.subtitle}
                  </p>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
