"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import {
  Wrench,
  Plus,
  Search,
  Clock,
  Star,
  Trash2,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IService, ApiResponse } from "@/types";

export interface ServiceItem extends IService {
  id?: string;
  category?: string;
  duration?: string;
  rating?: number;
  status?: "Active" | "Draft";
}

const fallbackServices: ServiceItem[] = [
  {
    _id: "SRV-01",
    title: "Full Engine Diagnostics & Tune-Up",
    category: "Engine Repair",
    price: 250,
    duration: "2-3 hrs",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    description: "Complete computerized diagnostic scan, spark plug replacement, and throttle body tuning.",
  },
  {
    _id: "SRV-02",
    title: "Complete Brake Pad & Rotor Service",
    category: "Braking System",
    price: 180,
    duration: "1.5 hrs",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    description: "Front and rear ceramic brake pads replacement, rotor resurfacing, and fluid flush.",
  },
  {
    _id: "SRV-03",
    title: "Transmission Fluid & Filter Service",
    category: "Transmission",
    price: 220,
    duration: "2 hrs",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    description: "Full transmission fluid exchange with synthetic high-grade fluid and filter replacement.",
  },
  {
    _id: "SRV-04",
    title: "Air Conditioning (AC) Recharge & Repair",
    category: "Climate Control",
    price: 130,
    duration: "1 hr",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    description: "R134a/R1234yf freon recharge, compressor check, and cabin pollen filter change.",
  },
  {
    _id: "SRV-05",
    title: "Full Synthetic Oil & Filter Change",
    category: "Maintenance",
    price: 65,
    duration: "45 mins",
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    description: "Up to 5 quarts of premium synthetic oil, OEM filter replacement, and safety inspection.",
  },
  {
    _id: "SRV-06",
    title: "Suspension & Wheel Alignment",
    category: "Suspension",
    price: 110,
    duration: "1 hr",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    description: "Laser computerized 4-wheel alignment, strut check, and tire rotation.",
  },
];

export default function ServicesDashboardPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = [
    "All",
    "Engine Repair",
    "Braking System",
    "Transmission",
    "Maintenance",
    "Climate Control",
    "Suspension",
  ];

  const fetchServices = React.useCallback(async (showLoading = false) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const res = await axios.get<ApiResponse<ServiceItem[]>>("/api/v1/services");
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setServices(res.data.data);
      } else {
        setServices(fallbackServices);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await axios.get<ApiResponse<ServiceItem[]>>("/api/v1/services");
        if (isMounted) {
          if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
            setServices(res.data.data);
          } else {
            setServices(fallbackServices);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch services:", error);
          setServices(fallbackServices);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await axios.delete<ApiResponse>(`/api/v1/services/${id}`);
      if (res.data?.success) {
        toast.success(`Service "${title}" deleted successfully`);
        setServices((prev) => prev.filter((s) => (s._id || s.id || s.service_id) !== id));
      } else {
        toast.error(res.data?.error || "Failed to delete service");
      }
    } catch (error: unknown) {
      console.error("Delete service error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.info("Deleted from view (mock item or offline)");
        setServices((prev) => prev.filter((s) => (s._id || s.id || s.service_id) !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = services.filter((s) => {
    const sCat = s.category || "Maintenance";
    const matchesCat = selectedCategory === "All" || sCat.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !search ||
      (s.title && s.title.toLowerCase().includes(search.toLowerCase())) ||
      (s.description && s.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Service Offerings
            </h2>
            <Badge variant="brand" className="font-bold">
              {services.length} Total
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage repair packages, diagnostic services, pricing, and catalog items.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchServices(true)}
            className="cursor-pointer"
            title="Refresh Services"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>

          <Link href="/dashboard/services/add">
            <Button variant="brand" className="cursor-pointer shadow-md shadow-[#FF3811]/20 font-bold">
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Service
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search */}
      <Card className="border-gray-200/80 shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search service name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((c) => (
              <Button
                key={c}
                variant={selectedCategory === c ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(c)}
                className="text-xs cursor-pointer whitespace-nowrap h-8"
              >
                {c}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#FF3811] animate-spin" />
          <span className="ml-3 text-sm text-gray-500 font-medium">Loading car services...</span>
        </div>
      )}

      {/* Services Grid */}
      {!loading && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-xs">
              <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-700 font-bold text-base">No services found</p>
              <p className="text-gray-400 text-xs mt-1">
                Try adjusting your search filter or click &ldquo;Add New Service&rdquo; to create one.
              </p>
              <div className="mt-4">
                <Link href="/dashboard/services/add">
                  <Button variant="brand" size="sm">
                    <Plus className="w-4 h-4 mr-1.5" />
                    Create First Service
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((srv) => {
                const srvId = srv._id || srv.id || srv.service_id || "";
                const displayPrice =
                  typeof srv.price === "number"
                    ? `$${srv.price.toFixed(2)}`
                    : srv.price
                    ? srv.price.toString().startsWith("$")
                      ? srv.price
                      : `$${srv.price}`
                    : "$0.00";

                return (
                  <Card
                    key={srvId || srv.title}
                    className="border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      {srv.img && (
                        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
                          <Image
                            src={srv.img}
                            alt={srv.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                          <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-xs font-bold">
                            {displayPrice}
                          </div>
                        </div>
                      )}

                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant="secondary" className="text-[11px] font-semibold">
                            {srv.category || "General Service"}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/40">
                            <Star className="w-3 h-3 fill-amber-500" />
                            {srv.rating || 4.9}
                          </div>
                        </div>
                        <CardTitle className="text-base sm:text-lg mt-2 group-hover:text-[#FF3811] transition-colors line-clamp-1">
                          {srv.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-xs text-gray-500">
                          {srv.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="py-2">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{srv.duration || "1-2 hrs"}</span>
                          </div>
                          <div className="text-base font-black text-gray-900">
                            {displayPrice}
                          </div>
                        </div>
                      </CardContent>
                    </div>

                    <CardFooter className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400 truncate max-w-[120px]">
                        {srvId.length > 8 ? `${srvId.slice(0, 8)}...` : srvId}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/services/${srvId}`}
                          target="_blank"
                          className="inline-flex items-center justify-center h-8 px-2.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                          title="View on Live Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> View
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === srvId}
                          onClick={() => handleDelete(srvId, srv.title)}
                          className="h-8 px-2.5 text-xs text-red-500 hover:bg-red-50 cursor-pointer"
                          title="Delete Service"
                        >
                          {deletingId === srvId ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

