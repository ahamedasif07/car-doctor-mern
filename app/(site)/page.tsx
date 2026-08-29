import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import InfoStrip from "@/components/home/InfoStrip";
import Products from "@/components/home/Products";
import Team from "@/components/home/Team";
import Features from "@/components/home/Features";
import Testimonial from "@/components/home/Testimonial";
import ServiceService from "@/services/service.service";
import type { IService } from "@/types";

export default async function Home() {
  let services: IService[] = [];
  try {
    services = await ServiceService.getAllServices();
  } catch (error) {
    console.error("Failed to load services for home page:", error);
  }

  return (
    <>
      <Hero />
      <About />
      <Services services={services} />
      <InfoStrip />
      <Products />
      <Team />
      <Features />
      <Testimonial />
    </>
  );
}
