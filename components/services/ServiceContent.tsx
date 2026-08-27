"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { IService } from "@/types";

interface ServiceContentProps {
  service?: IService;
}

export default function ServiceContent({ service }: ServiceContentProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const defaultFeatureBoxes = [
    {
      name: "Instant Car Services",
      details: "It Uses A Dictionary Of Over 200 Latin Words, Combined With A Model Sentence Structure.",
    },
    {
      name: "24/7 Quality Service",
      details: "Round-the-clock emergency support with certified technicians and precision diagnostic tools.",
    },
    {
      name: "Easy Customer Service",
      details: "Hassle-free booking, transparent estimates, and friendly assistance every step of the way.",
    },
    {
      name: "Quality Cost Service",
      details: "Affordable competitive pricing with 100% genuine parts and lifetime workmanship warranty.",
    },
  ];

  const facilities = (service?.facility && service.facility.length > 0)
    ? service.facility
    : defaultFeatureBoxes;

  const steps = [
    {
      number: "01",
      title: "STEP ONE",
      desc: "Book inspection and receive digital vehicle diagnostic quote.",
    },
    {
      number: "02",
      title: "STEP TWO",
      desc: "Certified master mechanics perform precision OEM-grade repairs.",
    },
    {
      number: "03",
      title: "STEP THREE",
      desc: "Quality inspection road test and seamless customer pickup.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Main Service Detail Image */}
      <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-md bg-gray-100">
        <Image
          src={service?.img || "/images/service_detail_main.jpg"}
          alt={service?.title || "Car Doctor Service"}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 2. Main Title & Description */}
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {service?.title || "Unique Car Engine Service"}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {service?.description ||
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."}
        </p>
      </div>

      {/* 3. 4 Feature Cards (2x2 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {facilities.map((box, idx) => (
          <div
            key={idx}
            className="bg-gray-50/90 rounded-2xl p-6 border border-gray-200/80 border-t-4 border-t-[#FF3811] shadow-xs hover:shadow-md transition-shadow space-y-2"
          >
            <h3 className="font-bold text-lg text-gray-900">
              {box.name}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              {box.details}
            </p>
          </div>
        ))}
      </div>

      {/* 4. Sub-paragraph Text */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        Car Doctor guarantees OEM standard replacement components, electronic sensor calibrations, and fluid checks performed according to factory service manuals.
      </p>

      {/* 5. 3 Simple Steps Process */}
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            3 Simple Steps to Process
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Our streamlined workflow ensures complete transparency from check-in to final road test delivery.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center space-y-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF3811]/15 text-[#FF3811] border-2 border-[#FF3811] flex items-center justify-center font-extrabold text-lg shadow-xs">
                {step.number}
              </div>

              <h4 className="font-bold text-base text-gray-900 uppercase tracking-wide">
                {step.title}
              </h4>

              <p className="text-gray-500 text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Video Preview Section */}
      <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-lg group">
        <Image
          src="/images/service_video_thumb.jpg"
          alt="Car Service Process Video Preview"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            aria-label="Play Service Video"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF3811] text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#e02d08] transition-all cursor-pointer ring-8 ring-[#FF3811]/30"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
