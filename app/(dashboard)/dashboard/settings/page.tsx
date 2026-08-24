"use client";

import React, { useState } from "react";
import {
  Settings,
  Store,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  MapPin,
  Clock,
  Database,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SettingsDashboardPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Workshop & System Settings
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure workshop location, business hours, notifications, and security keys.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Changes saved successfully!
          </div>
        )}
      </div>

      <Tabs defaultValue="workshop" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 shadow-2xs">
          <TabsTrigger value="workshop" className="gap-2">
            <Store className="w-4 h-4" /> Workshop Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" /> Security & Admin
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Workshop Profile */}
        <TabsContent value="workshop">
          <form onSubmit={handleSave}>
            <Card className="border-gray-200/80 shadow-xs">
              <CardHeader>
                <CardTitle className="text-lg">Workshop Information</CardTitle>
                <CardDescription>
                  This information appears on customer receipts and booking confirmations.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Workshop / Business Name
                    </label>
                    <Input defaultValue="Car Doctor Auto Care & Diagnostics" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Primary Contact Email
                    </label>
                    <Input defaultValue="service@cardoctor.com" type="email" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Emergency Service Hotline
                    </label>
                    <Input defaultValue="+880 1700-000000" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Operating Hours
                    </label>
                    <Input defaultValue="Mon - Sat: 8:00 AM - 8:00 PM" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Workshop Physical Address
                  </label>
                  <Input defaultValue="71/A Gulshan Avenue, Dhaka 1212, Bangladesh" />
                </div>
              </CardContent>

              <CardFooter className="border-t border-gray-100 flex justify-end">
                <Button type="submit" variant="brand" className="cursor-pointer">
                  <Save className="w-4 h-4 mr-1.5" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Tab 2: Security & Admin */}
        <TabsContent value="security">
          <Card className="border-gray-200/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-lg">Admin Credentials & Passwords</CardTitle>
              <CardDescription>
                Update your administrative login credentials and secret keys.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Current Password
                  </label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    New Admin Password
                  </label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-800 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-600" /> Password Policy
                </p>
                <p>
                  Passwords must be at least 6 characters and are automatically hashed with
                  bcrypt (salt rounds: 12) before persisting to MongoDB.
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t border-gray-100 flex justify-end">
              <Button variant="default" className="cursor-pointer">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab 3: Notifications */}
        <TabsContent value="notifications">
          <Card className="border-gray-200/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be alerted about new bookings and customer registrations.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                {
                  title: "New Customer Registration Alerts",
                  desc: "Get notified when a new user creates an account on Car Doctor.",
                  checked: true,
                },
                {
                  title: "Instant Service Booking Alerts",
                  desc: "Receive real-time alerts when a customer books a repair service.",
                  checked: true,
                },
                {
                  title: "Daily Business Performance Digest",
                  desc: "Receive an automated summary of completed jobs and revenue at 8:00 PM.",
                  checked: false,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-100"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    className="w-4 h-4 text-[#FF3811] rounded accent-[#FF3811] cursor-pointer mt-1"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
