"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact, { Footer } from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      <Navbar />
      
      <div className="relative">
        <Hero />
        
        <div className="relative z-10 bg-background">
          <About />
          <Experience />
          <Portfolio />
          <Skills />
          <Education />
          <Contact />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
