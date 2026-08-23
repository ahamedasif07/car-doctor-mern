"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: "Affordable Price For Car Servicing",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      image: "/images/hero_1.jpg",
    },
    {
      id: 2,
      title: "Precision Brake & Suspension Repair",
      desc: "Ensure maximum safety on the road with our certified master mechanics specializing in modern brake systems and suspension tuning.",
      image: "/images/hero_2.jpg",
    },
    {
      id: 3,
      title: "Advanced Computer Engine Diagnostics",
      desc: "Utilizing state-of-the-art electronic diagnostic scanners to pinpoint engine troubles accurately and save your repair costs.",
      image: "/images/hero_3.jpg",
    },
    {
      id: 4,
      title: "Complete Electrical & Oil Maintenance",
      desc: "From battery replacements to full synth oil maintenance, trust our expert auto doctors for top-tier vehicle care.",
      image: "/images/hero_banner.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play slider effect every 5 seconds (pauses on mouse hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slide Items */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className={`object-cover transition-transform duration-10000 ease-linear ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />

              {/* Gradient Dark Overlay matching Car Doctor UI */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/85 to-transparent flex items-center">
                
                {/* Content Container */}
                <div className="max-w-xl pl-8 sm:pl-16 pr-6 text-white space-y-6">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-lg font-light">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="#services"
                      className="px-7 py-3.5 bg-[#FF3811] text-white font-semibold rounded-lg hover:bg-[#e02d08] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                    >
                      Discover More
                    </Link>

                    <Link
                      href="#projects"
                      className="px-7 py-3.5 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#151515] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Latest Project
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* Slide Indicator Dots (Bottom Left) */}
        <div className="absolute left-8 sm:left-16 bottom-6 sm:bottom-12 flex items-center gap-2.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "w-8 bg-[#FF3811]"
                  : "w-2.5 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Arrow Navigation Controls (Bottom Right) */}
        <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-12 flex items-center gap-4 z-20">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-[#FF3811] backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-12 h-12 rounded-full bg-[#FF3811] hover:bg-[#e02d08] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
