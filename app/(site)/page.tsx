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
    <>
      <Hero />
      <About />
      <Services />
      <InfoStrip />
      <Products />
      <Team />
      <Features />
      <Testimonial />
    </>
  );
}
