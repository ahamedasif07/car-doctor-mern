"use client";

import React, { useState } from "react";
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  DollarSign,
  Clock,
  Star,
  Edit,
  Trash2,
  ExternalLink,
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

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  price: string;
  duration: string;
  rating: number;
  description: string;
  status: "Active" | "Draft";
}

const initialServices: ServiceItem[] = [
  {
    id: "SRV-01",
    title: "Full Engine Diagnostics & Tune-Up",
    category: "Engine Repair",
    price: "$250.00",
    duration: "2-3 hrs",
    rating: 4.9,
    description: "Complete computerized diagnostic scan, spark plug replacement, and throttle body tuning.",
    status: "Active",
  },
  {
    id: "SRV-02",
    title: "Complete Brake Pad & Rotor Service",
    category: "Braking System",
    price: "$180.00",
    duration: "1.5 hrs",
    rating: 4.8,
    description: "Front and rear ceramic brake pads replacement, rotor resurfacing, and fluid flush.",
    status: "Active",
  },
  {
    id: "SRV-03",
    title: "Transmission Fluid & Filter Service",
    category: "Transmission",
    price: "$220.00",
    duration: "2 hrs",
    rating: 4.9,
    description: "Full transmission fluid exchange with synthetic high-grade fluid and filter replacement.",
    status: "Active",
  },
  {
    id: "SRV-04",
    title: "Air Conditioning (AC) Recharge & Repair",
    category: "Climate Control",
    price: "$130.00",
    duration: "1 hr",
    rating: 4.7,
    description: "R134a/R1234yf freon recharge, compressor check, and cabin pollen filter change.",
    status: "Active",
  },
  {
    id: "SRV-05",
    title: "Full Synthetic Oil & Filter Change",
    category: "Maintenance",
    price: "$65.00",
    duration: "45 mins",
    rating: 5.0,
    description: "Up to 5 quarts of premium synthetic oil, OEM filter replacement, and 21-point safety inspection.",
    status: "Active",
  },
  {
    id: "SRV-06",
    title: "Suspension & Wheel Alignment",
    category: "Suspension",
    price: "$110.00",
    duration: "1 hr",
    rating: 4.8,
    description: "Laser computerized 4-wheel alignment, strut check, and tire rotation.",
    status: "Active",
  },
];

export default function ServicesDashboardPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Engine Repair", "Braking System", "Transmission", "Maintenance", "Climate Control", "Suspension"];

  const filtered = services.filter((s) => {
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
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
              {services.length} Active
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage repair packages, diagnostic services, pricing, and duration.
          </p>
        </div>

        <Button variant="brand" className="cursor-pointer">
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Service
        </Button>
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
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((c) => (
              <Button
                key={c}
                variant={selectedCategory === c ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(c)}
                className="text-xs cursor-pointer whitespace-nowrap"
              >
                {c}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((srv) => (
          <Card
            key={srv.id}
            className="border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Badge variant="secondary" className="text-[11px] font-semibold">
                  {srv.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/40">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {srv.rating}
                </div>
              </div>
              <CardTitle className="text-base sm:text-lg mt-2 group-hover:text-[#FF3811] transition-colors">
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
                  <span>{srv.duration}</span>
                </div>
                <div className="text-base font-black text-gray-900">
                  {srv.price}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-400">{srv.id}</span>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" className="h-8 px-2.5 text-xs text-gray-600">
                  <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2.5 text-xs text-red-500 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
