"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, ShieldCheck, Terminal } from "lucide-react";

export default function About() {
  const { about, hero } = portfolioData;

  return (
    <Section id="about" title="Sobre Mí">
      <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* Profile Image Frame (Fixed & High-Tech) */}
        <div className="relative group shrink-0">
          {/* Estructura de marco tecnológico estático */}
          <div className="relative w-72 h-[400px] sm:w-80 sm:h-[450px] p-1 bg-white/10 rounded-[2.5rem] overflow-hidden">
            {/* Imagen principal */}
            <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-black">
              <img
                src={`/${about.imageUrl}`}
                alt="Iñaki Sobera"
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* Capa de scanner estática superior */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/10 via-transparent to-black/60" />
              
              {/* Líneas de mira en las esquinas */}
              <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-blue-500" />
              <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-blue-500" />
              <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-blue-500" />
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-blue-500" />

              {/* Texto de identidad integrado */}
              <div className="absolute bottom-10 left-0 w-full text-center px-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-[0.3em]">Verified Personnel</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {hero.name.split(' ')[0]} <span className="text-blue-500">{hero.name.split(' ')[1]}</span>
                </h3>
              </div>
            </div>
          </div>

          {/* Decoración externa minimalista */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-white/10 rounded-br-3xl pointer-events-none" />
          <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-white/10 rounded-tl-3xl pointer-events-none" />
        </div>

        {/* Bio Content */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white tracking-tight uppercase flex items-center gap-4">
              <Terminal className="w-8 h-8 text-blue-500" />
              Ingeniería de Sistemas
            </h3>
            <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
          </div>
          
          <div className="space-y-6 max-w-3xl">
            {about.bio.map((paragraph, index) => (
              <p key={index} className="text-xl leading-relaxed text-zinc-400 font-light italic">
                &quot;{paragraph}&quot;
              </p>
            ))}
          </div>
          
          <div className="pt-6 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-colors hover:border-blue-500/20">
              <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">Especialización Técnica</h4>
              <p className="text-lg leading-relaxed text-zinc-300">
                {about.skillsSummary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <motion.a
                href={`/${about.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl transition-all font-bold shadow-xl hover:shadow-white/10"
              >
                <Download className="w-5 h-5" />
                Descargar Curriculum
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
