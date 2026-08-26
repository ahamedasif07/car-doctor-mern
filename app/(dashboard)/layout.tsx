import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Car Doctor Admin",
    template: "%s | Car Doctor Dashboard",
  },
  description: "Comprehensive administration & analytics dashboard for Car Doctor auto service workshop.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ─── Double Layer Server Verification ──────────────────────────────────────
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/admin/login?redirect=/dashboard");
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") {
    redirect("/admin/login?redirect=/dashboard");
  }


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 selection:bg-[#FF3811] selection:text-white font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <DashboardTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-9xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}

