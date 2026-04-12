"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, Terminal } from "lucide-react";

export default function About() {
  const { about, hero } = portfolioData;

  return (
    <Section id="about" title="Sobre Mí">
      <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* Profile Image - Clean Professional Edition */}
        <div className="relative shrink-0">
          {/* Subtle Aura */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-90" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-72 h-[400px] sm:w-80 sm:h-[480px]"
          >
            {/* Elegant Frame */}
            <div className="absolute inset-0 bg-white/[0.08] rounded-[3rem] p-1 shadow-2xl">
              <div className="w-full h-full bg-[#050505] rounded-[2.8rem] overflow-hidden relative border border-white/5">
                
                {/* Main Profile Photo */}
                <img
                  src={`/${about.imageUrl}`}
                  alt="Iñaki Sobera"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Soft Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                
                {/* Refined Identity Tag */}
                <div className="absolute bottom-10 left-0 w-full px-8">
                  <div className="h-[1px] w-12 bg-blue-500 mb-4" />
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                    {hero.name.split(' ')[0]}<br/>
                    <span className="text-blue-500">{hero.name.split(' ')[1]}</span>
                  </h3>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em]">
                    Systems & Backend Engineer
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center shadow-xl">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Bio Content */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white tracking-tight uppercase flex items-center gap-4">
              <Terminal className="w-8 h-8 text-blue-500" />
              Ingeniería de Sistemas
            </h3>
            <div className="h-1 w-24 bg-blue-600 rounded-full" />
          </div>
          
          <div className="space-y-8 max-w-3xl">
            {about.bio.map((paragraph, index) => (
              <p key={index} className="text-xl leading-relaxed text-zinc-400 font-light italic border-l-2 border-blue-500/20 pl-8">
                &quot;{paragraph}&quot;
              </p>
            ))}
          </div>
          
          <div className="pt-6 space-y-10">
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-blue-500/20">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <div className="w-4 h-[1px] bg-blue-500" />
                Technical Core & Logic
              </h4>
              <p className="text-lg leading-relaxed text-zinc-300 font-medium">
                {about.skillsSummary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center">
              <motion.a
                href={`/${about.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full transition-all font-black uppercase tracking-widest text-[10px] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                <Download className="w-4 h-4" />
                Get Full Dossier (CV)
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
