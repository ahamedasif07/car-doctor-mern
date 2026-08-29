"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  Wrench,
  DollarSign,
  Image as ImageIcon,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Eye,
  Loader2,
  Tag,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { ApiResponse, IService } from "@/types";

const PRESET_IMAGES = [
  {
    name: "Engine Diagnostics",
    url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Brake Service",
    url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Oil Change",
    url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Battery & Electrical",
    url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = [
  "Engine Repair",
  "Braking System",
  "Transmission",
  "Maintenance",
  "Climate Control",
  "Suspension",
  "Electrical System",
  "General Inspection",
];

interface FacilityItem {
  name: string;
  details: string;
}

export default function AddServiceDashboardPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Engine Repair");
  const [duration, setDuration] = useState("1-2 hrs");
  const [img, setImg] = useState(PRESET_IMAGES[0].url);
  const [customImg, setCustomImg] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState<FacilityItem[]>([
    { name: "Instant Diagnostic Report", details: "Complete electronic system scan and report" },
    { name: "Certified Technicians", details: "Performed by ASE certified master mechanics" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeImage = customImg.trim() ? customImg.trim() : img;

  const handleAddFacility = () => {
    setFacilities([...facilities, { name: "", details: "" }]);
  };

  const handleRemoveFacility = (index: number) => {
    if (facilities.length === 1) {
      toast.info("At least one feature/facility item is recommended");
    }
    setFacilities(facilities.filter((_, idx) => idx !== index));
  };

  const handleFacilityChange = (index: number, field: "name" | "details", value: string) => {
    const updated = [...facilities];
    updated[index][field] = value;
    setFacilities(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a service title");
      return;
    }

    if (!price.trim()) {
      toast.error("Please enter the service price");
      return;
    }

    if (!activeImage) {
      toast.error("Please select or provide an image URL");
      return;
    }

    if (!description.trim()) {
      toast.error("Please provide a service description");
      return;
    }

    // Filter out empty facility items
    const validFacilities = facilities.filter(
      (f) => f.name.trim() !== "" && f.details.trim() !== ""
    );

    setIsSubmitting(true);

    try {
      // Normalize price
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
      const finalPrice = isNaN(numericPrice) ? price.trim() : numericPrice;

      const payload: Partial<IService> = {
        title: title.trim(),
        price: finalPrice,
        img: activeImage,
        description: description.trim(),
        facility: validFacilities.length > 0 ? validFacilities : [
          { name: "Quality Guaranteed", details: "100% genuine parts and backed by warranty" },
        ],
      };

      const response = await axios.post<ApiResponse<IService>>("/api/v1/services", payload);

      if (response.data?.success) {
        toast.success("Service package created successfully!");
        router.push("/dashboard/services");
        router.refresh();
      } else {
        toast.error(response.data?.error || "Failed to create service");
      }
    } catch (error: unknown) {
      console.error("Create service error:", error);
      let errorMsg = "Failed to create service";
      if (axios.isAxiosError<ApiResponse>(error)) {
        errorMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create service";
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/services"
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-2xs"
            title="Back to Services"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Add New Service
              </h2>
              <Badge variant="brand" className="font-semibold text-xs">
                Admin Creation
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Create a new automotive service package for public catalog and appointments.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Service Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-gray-200/80 shadow-xs">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#FF3811]" />
                Service Details
              </CardTitle>
              <CardDescription>
                Fill out the required information to publish this service.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    Service Title <span className="text-[#FF3811]">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Full Engine Diagnostics & Tune-Up"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-11"
                  />
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      Price ($) <span className="text-[#FF3811]">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. 180.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      Est. Duration
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 1.5 hrs"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    Service Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 bg-white rounded-xl px-3.5 py-2 text-sm text-gray-800 border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    Description <span className="text-[#FF3811]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a comprehensive breakdown of what this service covers..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white rounded-xl p-3.5 text-sm text-gray-800 border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF3811]/30 focus:border-[#FF3811] transition-all resize-none"
                  />
                </div>

                {/* Image Selection */}
                <div className="space-y-2.5 pt-2 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                    Service Banner Image <span className="text-[#FF3811]">*</span>
                  </label>

                  {/* Preset Image Options */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PRESET_IMAGES.map((preset) => {
                      const isSelected = img === preset.url && !customImg;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setImg(preset.url);
                            setCustomImg("");
                          }}
                          className={`relative rounded-xl overflow-hidden border-2 text-left transition-all p-1 group cursor-pointer ${
                            isSelected
                              ? "border-[#FF3811] ring-2 ring-[#FF3811]/20 shadow-xs"
                              : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <div className="relative h-14 w-full rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={preset.url}
                              alt={preset.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <p className="text-[10px] font-semibold text-gray-700 mt-1 truncate px-0.5">
                            {preset.name}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom URL Input */}
                  <div className="pt-2">
                    <Input
                      type="url"
                      placeholder="Or paste custom image URL (e.g. https://...)"
                      value={customImg}
                      onChange={(e) => setCustomImg(e.target.value)}
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                {/* Service Facilities / Bullet Features */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF3811]" />
                      Features & Inclusions
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddFacility}
                      className="h-8 text-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Feature
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {facilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                          <Input
                            placeholder="Feature Title (e.g. Laser Alignment)"
                            value={fac.name}
                            onChange={(e) => handleFacilityChange(idx, "name", e.target.value)}
                            className="h-9 text-xs bg-white"
                          />
                          <Input
                            placeholder="Details / Specifications"
                            value={fac.details}
                            onChange={(e) => handleFacilityChange(idx, "details", e.target.value)}
                            className="h-9 text-xs bg-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFacility(idx)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Feature"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                  <Link href="/dashboard/services">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    variant="brand"
                    disabled={isSubmitting}
                    className="min-w-[150px] cursor-pointer shadow-md shadow-[#FF3811]/20 font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1.5" />
                        Publish Service
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Live Card Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <Card className="border-gray-200/80 shadow-xs overflow-hidden">
            <CardHeader className="pb-3 bg-slate-50/70 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  Live Website Preview
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  Real-time
                </Badge>
              </div>
              <CardDescription className="text-xs">
                How this service card will appear to clients on the storefront.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5">
              {/* Preview Card Component */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md flex flex-col justify-between">
                <div>
                  {/* Card Image */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={activeImage || PRESET_IMAGES[0].url}
                      alt={title || "Service Preview"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-xs font-bold shadow-xs">
                      ${price ? (price.startsWith("$") ? price.slice(1) : price) : "180.00"}
                    </div>
                    <div className="absolute top-2.5 left-2.5 bg-[#FF3811] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {category}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1">
                    {title || "Full Engine Diagnostics & Tune-Up"}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-3">
                    {description ||
                      "Complete computerized diagnostic scan, spark plug replacement, and throttle body tuning for maximum horsepower and fuel efficiency."}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 pt-3 border-t border-gray-100 mb-4">
                    {(facilities.length > 0 ? facilities.slice(0, 2) : []).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3811] shrink-0" />
                        <span className="truncate font-medium">
                          {f.name || `Feature Item ${idx + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">
                      Service Fee
                    </span>
                    <span className="text-[#FF3811] font-extrabold text-lg">
                      ${price ? (price.startsWith("$") ? price.slice(1) : price) : "180.00"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{duration}</span>
                  </div>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-900 leading-relaxed">
                  Published services immediately sync across the public booking engine, search
                  indexing, and customer appointments portal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
