import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Car Doctor — Expert Auto Repair & Service",
    template: "%s | Car Doctor",
  },
  description:
    "Professional car repair, maintenance, and diagnostic services. Trusted mechanics, genuine parts, and affordable pricing. Book your appointment today.",
  keywords: [
    "car repair",
    "auto service",
    "mechanic",
    "car maintenance",
    "car doctor",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
