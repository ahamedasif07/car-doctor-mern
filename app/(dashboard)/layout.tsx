import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area — offset by sidebar width */}
      <div className="lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <DashboardTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
