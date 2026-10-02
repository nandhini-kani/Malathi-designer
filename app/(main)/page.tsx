

import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />

      <TrustSection />

      <About />

      <Services preview />

      <Gallery />

      <HowItWorks />
    </>
  );
}

