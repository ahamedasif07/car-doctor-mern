"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Car,
  Calendar,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface OrderItem {
  id: string;
  customerName: string;
  customerEmail: string;
  service: string;
  vehicle: string;
  bookingDate: string;
  totalAmount: string;
  paymentStatus: "Paid" | "Pending";
  orderStatus: "Completed" | "In Progress" | "Pending" | "Cancelled";
}

const mockOrders: OrderItem[] = [
  {
    id: "ORD-9821",
    customerName: "Tariqul Islam",
    customerEmail: "tariqul@example.com",
    service: "Full Engine Tune-Up",
    vehicle: "Toyota Corolla 2021",
    bookingDate: "Aug 24, 2026",
    totalAmount: "$250.00",
    paymentStatus: "Paid",
    orderStatus: "In Progress",
  },
  {
    id: "ORD-9822",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@example.com",
    service: "Complete Brake Pad & Rotor Service",
    vehicle: "Honda Civic 2020",
    bookingDate: "Aug 24, 2026",
    totalAmount: "$180.00",
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "ORD-9823",
    customerName: "Mahmud Hasan",
    customerEmail: "mahmud@gmail.com",
    service: "Air Conditioning Recharge",
    vehicle: "Hyundai Tucson 2022",
    bookingDate: "Aug 23, 2026",
    totalAmount: "$130.00",
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "ORD-9824",
    customerName: "Alex Morgan",
    customerEmail: "alex.m@hotmail.com",
    service: "Transmission Fluid Flush",
    vehicle: "Ford Mustang 2019",
    bookingDate: "Aug 23, 2026",
    totalAmount: "$220.00",
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: "ORD-9825",
    customerName: "Fatima Rahman",
    customerEmail: "fatima.r@gmail.com",
    service: "Suspension Alignment",
    vehicle: "Nissan X-Trail 2020",
    bookingDate: "Aug 22, 2026",
    totalAmount: "$110.00",
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "ORD-9826",
    customerName: "Daniel Craig",
    customerEmail: "daniel.c@outlook.com",
    service: "Full Synthetic Oil Change",
    vehicle: "BMW 3 Series 2021",
    bookingDate: "Aug 21, 2026",
    totalAmount: "$65.00",
    paymentStatus: "Pending",
    orderStatus: "Cancelled",
  },
];

export default function OrdersDashboardPage() {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === "All" || o.orderStatus === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.service.toLowerCase().includes(q) ||
      o.vehicle.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Service Bookings & Orders
            </h2>
            <Badge variant="brand" className="font-bold">
              {orders.length} Total
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track repair job cards, vehicle check-ins, customer payments, and fulfillment.
          </p>
        </div>

        <Button variant="brand" className="cursor-pointer">
          <Calendar className="w-4 h-4 mr-1.5" />
          Schedule Booking
        </Button>
      </div>

      {/* Filter and Search */}
      <Card className="border-gray-200/80 shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order #, customer, vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["All", "In Progress", "Completed", "Pending", "Cancelled"].map((st) => (
              <Button
                key={st}
                variant={statusFilter === st ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(st)}
                className="text-xs cursor-pointer whitespace-nowrap"
              >
                {st}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-gray-200/80 shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service & Vehicle</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Job Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id} className="hover:bg-slate-50/80 transition-colors">
                <TableCell className="font-mono text-xs font-bold text-gray-900">
                  {order.id}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{order.service}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Car className="w-3 h-3 text-gray-400" />
                      {order.vehicle}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-xs text-gray-500">
                  {order.bookingDate}
                </TableCell>

                <TableCell className="font-bold text-gray-900">
                  {order.totalAmount}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={order.paymentStatus === "Paid" ? "success" : "warning"}
                    className="font-semibold"
                  >
                    {order.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    variant={
                      order.orderStatus === "Completed"
                        ? "success"
                        : order.orderStatus === "In Progress"
                        ? "brand"
                        : order.orderStatus === "Pending"
                        ? "warning"
                        : "destructive"
                    }
                    className="font-bold"
                  >
                    {order.orderStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
