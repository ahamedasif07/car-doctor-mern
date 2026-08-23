"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonial() {
  const reviews = [
    {
      id: 1,
      name: "Awlad Hossain",
      role: "Businessman",
      rating: 5,
      avatar: "/images/avatar_1.jpg",
      comment:
        "Car Doctor provided an unbelievable experience! They diagnosed my engine fault within 30 minutes and fixed it at a very affordable price. Highly recommended service center!",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Software Engineer",
      rating: 5,
      avatar: "/images/avatar_2.jpg",
      comment:
        "Extremely professional mechanics and transparent billing. The brake repair and wheel alignment were done fast. My car runs smoother than ever before!",
    },
    {
      id: 3,
      name: "Michael Scott",
      role: "Regional Director",
      rating: 5,
      avatar: "/images/team_1.jpg",
      comment:
        "Top tier customer support and expert technicians! Their 24/7 assistance saved my day when my battery died. I wouldn't trust my vehicle with anyone else.",
    },
    {
      id: 4,
      name: "David Miller",
      role: "Auto Enthusiast",
      rating: 5,
      avatar: "/images/about_mechanic.jpg",
      comment:
        "The best auto repair shop in town. Excellent diagnostic tools, quick service, and friendly staff. Will definitely come back for all future maintenance!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto slide testimonial every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Calculate active review items for smooth presentation
  const firstReview = reviews[currentIndex];
  const secondReview = reviews[(currentIndex + 1) % reviews.length];

  return (
    <section id="testimonial" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-[#FF3811] font-bold text-base tracking-wider uppercase">
          Testimonial
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          What Customer Says
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
        </p>
      </div>

      {/* Testimonial Cards Display */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[260px]">
          
          {/* Card 1 (Always Visible) */}
          <div
            key={`rev-1-${firstReview.id}`}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 space-y-5 animate-in fade-in"
          >
            {/* Header: User Avatar & Quote */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF3811] shrink-0">
                  <Image
                    src={firstReview.avatar}
                    alt={firstReview.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {firstReview.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">
                    {firstReview.role}
                  </p>
                </div>
              </div>

              <div className="text-[#FF3811]/25">
                <Quote className="w-12 h-12 rotate-180" />
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
              &quot;{firstReview.comment}&quot;
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-500 pt-2">
              {[...Array(firstReview.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
          </div>

          {/* Card 2 (Visible on Tablet/Desktop md:) */}
          <div
            key={`rev-2-${secondReview.id}`}
            className="hidden md:block bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 space-y-5 animate-in fade-in"
          >
            {/* Header: User Avatar & Quote */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF3811] shrink-0">
                  <Image
                    src={secondReview.avatar}
                    alt={secondReview.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {secondReview.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-gray-400">
                    {secondReview.role}
                  </p>
                </div>
              </div>

              <div className="text-[#FF3811]/25">
                <Quote className="w-12 h-12 rotate-180" />
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
              &quot;{secondReview.comment}&quot;
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-500 pt-2">
              {[...Array(secondReview.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
          </div>

        </div>

        {/* Control Buttons & Indicators */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-[#FF3811] hover:text-white hover:border-[#FF3811] flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-7 bg-[#FF3811]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="w-11 h-11 rounded-full bg-[#FF3811] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:bg-[#e02d08] hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
}
