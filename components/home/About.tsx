"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Overlapping Images */}
        <div className="relative flex justify-center lg:justify-start">
          {/* Main Main Image */}
          <div className="relative w-full max-w-[460px] h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/images/about_mechanic.jpg"
              alt="Qualified Car Mechanic working on car"
              fill
              className="object-cover"
            />
          </div>

          {/* Overlapping Small Inset Image */}
          <div className="absolute right-2 sm:-right-4 -bottom-10 sm:-bottom-12 w-[200px] sm:w-[260px] h-[180px] sm:h-[220px] rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-white">
            <Image
              src="/images/about_parts.jpg"
              alt="Car diagnostic equipment and parts"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-6 pt-6 lg:pt-0">
          <span className="text-[#FF3811] font-bold text-lg tracking-wide uppercase">
            About Us
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            We are qualified & of experience in this field
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
          </p>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
          </p>

          <div className="pt-2">
            <Link
              href="#info"
              className="inline-block px-7 py-3.5 bg-[#FF3811] text-white font-semibold rounded-lg hover:bg-[#e02d08] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Get More Info
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
