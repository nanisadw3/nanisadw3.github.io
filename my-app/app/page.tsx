import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact, { Footer } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div id="hero">
        <Hero />
      </div>
      <About />
      <Portfolio />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
