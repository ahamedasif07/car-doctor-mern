import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthIllustration from "@/components/auth/AuthIllustration";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Car Doctor",
  description: "Sign in to access your Car Doctor account, track orders, and manage services.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#FF3811] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Vector Graphic Illustration */}
          <div className="hidden md:flex items-center justify-center p-4">
            <AuthIllustration />
          </div>

          {/* Right Column - Login Form Card */}
          <div className="flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
