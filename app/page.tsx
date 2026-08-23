import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import InfoStrip from "@/components/home/InfoStrip";
import Products from "@/components/home/Products";
import Team from "@/components/home/Team";
import Features from "@/components/home/Features";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#FF3811] selection:text-white">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Services />
        <InfoStrip />
        <Products />
        <Team />
        <Features />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
}
