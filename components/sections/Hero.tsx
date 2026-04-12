"use client";

import { motion } from "framer-motion";
import ScrambleText from "../effects/ScrambleText";
import GlitchCanvas from "../effects/GlitchCanvas";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Terminal, Activity, ArrowRight, Shield } from "lucide-react";
import { Reveal, FadeIn } from "../ui/Reveal";

export default function Hero() {
  const { hero, contact } = portfolioData;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <GlitchCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_80%)]" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-l border-r border-white/[0.03] z-0 pointer-events-none" />

      <div className="container px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <FadeIn delay={0.2}>
            <div className="mb-10 px-6 py-2 glass-morphism rounded-full flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400/80">
                {hero.tagline}
              </span>
            </div>
          </FadeIn>

          <div className="mb-16">
            <Reveal delay={0.4} width="100%">
              <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-white leading-[0.8] uppercase flex flex-col items-center">
                <span className="relative">
                  <ScrambleText text={hero.firstName} />
                </span>
                <span className="stroke-text -mt-2 sm:-mt-6">
                  <ScrambleText text={hero.lastName} />
                </span>
              </h1>
            </Reveal>
          </div>

          <FadeIn delay={0.8}>
            <div className="max-w-2xl mx-auto mb-16 space-y-8">
              <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed">
                {hero.summary}
              </p>
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-500" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Backend System</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Cyber Defense</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">AI Integration</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={1.2}>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Initiate Explore <ArrowRight className="w-4 h-4" />
              </motion.a>
              <div className="flex gap-2">
                <a href={contact.github} target="_blank" className="p-6 glass-morphism rounded-2xl hover:text-blue-400 transition-all"><Github className="w-5 h-5" /></a>
                <a href={contact.linkedin} target="_blank" className="p-6 glass-morphism rounded-2xl hover:text-blue-400 transition-all"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Side Status Indicators */}
      <div className="absolute right-10 bottom-10 hidden lg:flex flex-col items-end gap-2 overflow-hidden">
        <motion.div 
          animate={{ x: [100, 0] }} 
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-end"
        >
          <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">System Entropy</span>
          <span className="text-[10px] font-mono text-blue-500 font-bold">STABLE // 0.002s</span>
        </motion.div>
      </div>
    </section>
  );
}
