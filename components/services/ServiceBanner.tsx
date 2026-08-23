"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceBannerProps {
  title?: string;
}

export default function ServiceBanner({ title = "Service Details" }: ServiceBannerProps) {
  return (
    <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-lg my-6">
      {/* Background Image */}
      <Image
        src="/images/hero_banner.jpg"
        alt="Service Details Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 flex flex-col items-start justify-center px-8 sm:px-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide">
          {title}
        </h1>
      </div>

      {/* Trapezoid Badge at Bottom Center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FF3811] text-white px-8 py-2.5 font-semibold text-sm sm:text-base rounded-t-xl shadow-md flex items-center gap-2">
        <Link href="/" className="hover:underline opacity-90">
          Home
        </Link>
        <span>/</span>
        <span className="opacity-100">{title}</span>
      </div>
    </div>
  );
}
