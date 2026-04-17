"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, Terminal } from "lucide-react";

export default function About() {
  const { about, hero } = portfolioData;

  return (
    <Section id="about" title="Sobre Mí" animationType="typewriter">
      <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* CLEAN PROFESSIONAL PHOTO FRAME */}
        <div className="relative group shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px]"
          >
            {/* Background Accent / Border Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-emerald-500/20 to-purple-600/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <img
                src={`/${about.imageUrl}`}
                alt={hero.name}
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Professional Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Clean Label */}
              <div className="absolute bottom-8 left-8">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-1">Lead Developer</p>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {hero.name.split(' ')[0]} {hero.name.split(' ')[1]}
                </h4>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-blue-500/30 rounded-br-3xl hidden md:block" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-3xl hidden md:block" />
          </motion.div>
        </div>

        {/* Bio Content */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white tracking-tight uppercase flex items-center gap-4">
              <Terminal className="w-8 h-8 text-blue-500" />
              Ingeniería de Sistemas
            </h3>
            <div className="h-1.5 w-24 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          </div>
          
          <div className="space-y-8 max-w-3xl">
            {about.bio.map((paragraph, index) => (
              <p key={index} className="text-xl leading-relaxed text-zinc-400 font-light italic border-l-2 border-blue-500/20 pl-8">
                &quot;{paragraph}&quot;
              </p>
            ))}
          </div>
          
          <div className="pt-6 space-y-10">
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-blue-500/20 group">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <div className="w-4 h-[1px] bg-blue-500 animate-pulse" />
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-12 py-6 bg-white text-black rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] shadow-2xl hover:shadow-white/20"
              >
                <Download className="w-4 h-4" />
                Descargar CV Completo
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
