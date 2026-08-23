"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Car Engine Plug",
      price: "$20.00",
      rating: 5,
      image: "/images/product_parts.jpg",
    },
    {
      id: 2,
      name: "Car Air Filter",
      price: "$20.00",
      rating: 5,
      image: "/images/product_parts.jpg",
    },
    {
      id: 3,
      name: "Croma LED Light",
      price: "$20.00",
      rating: 5,
      image: "/images/about_parts.jpg",
    },
    {
      id: 4,
      name: "Croma LED Light",
      price: "$20.00",
      rating: 5,
      image: "/images/product_parts.jpg",
    },
    {
      id: 5,
      name: "Croma LED Light",
      price: "$20.00",
      rating: 5,
      image: "/images/about_parts.jpg",
    },
    {
      id: 6,
      name: "Croma LED Light",
      price: "$20.00",
      rating: 5,
      image: "/images/product_parts.jpg",
    },
  ];

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-[#FF3811] font-bold text-base tracking-wider uppercase">
          Popular Products
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Browse Our Products
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative"
          >
            {/* Quick Cart Button */}
            <button
              aria-label="Add to Cart"
              className="absolute top-8 right-8 w-9 h-9 rounded-full bg-white shadow-md text-[#FF3811] hover:bg-[#FF3811] hover:text-white flex items-center justify-center transition-colors z-10 opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* Product Image Container */}
            <div className="w-full h-[220px] bg-gray-100/70 rounded-xl flex items-center justify-center p-6 mb-5 relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              {[...Array(product.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>

            {/* Product Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#FF3811] transition-colors">
              {product.name}
            </h3>

            {/* Product Price */}
            <span className="text-[#FF3811] font-bold text-lg">
              {product.price}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-block px-8 py-3.5 border-2 border-[#FF3811] text-[#FF3811] font-semibold rounded-lg hover:bg-[#FF3811] hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
        >
          More Products
        </Link>
      </div>

    </section>
  );
}
