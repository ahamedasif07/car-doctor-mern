"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

export default function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-lg my-6">
      {/* Background Image */}
      <Image
        src="/images/hero_banner.jpg"
        alt={`${title} Banner`}
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85 flex flex-col items-start justify-center px-8 sm:px-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide drop-shadow-md">
          {title}
        </h1>
      </div>

      {/* Orange Trapezoid Badge at Bottom Center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FF3811] text-white px-8 py-2.5 font-semibold text-sm sm:text-base rounded-t-xl shadow-md flex items-center gap-2">
        <Link href="/" className="hover:underline opacity-90">
          Home
        </Link>
        <span>/</span>
        <span className="opacity-100">{breadcrumb}</span>
      </div>
    </div>
  );
}
