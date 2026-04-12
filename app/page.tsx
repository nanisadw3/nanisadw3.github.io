"use client";

import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Education from "@/components/sections/Education";
import Contact, { Footer } from "@/components/sections/Contact";
import BentoProfile from "@/components/ui/BentoProfile";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-[#020202]">
      <Hero />
      
      <div className="space-y-32 pb-32">
        <BentoProfile />
        <Portfolio />
        <Education />
        <Contact />
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
