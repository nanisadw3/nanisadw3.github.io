"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function About() {
  const { about, hero } = portfolioData;

  return (
    <Section id="about" title="Sobre Mí">
      <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* Profile Image Frame (CYBER NEON EDITION) */}
        <div className="relative group shrink-0 mt-10">
          {/* Brillo exterior pulsante */}
          <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
          
          <div className="relative w-72 h-[400px] sm:w-80 sm:h-[450px]">
            {/* Doble Borde de Neón */}
            <div className="absolute inset-0 bg-blue-500 rounded-[2.5rem] p-[2px] shadow-[0_0_20px_rgba(37,99,235,0.5)]">
              <div className="w-full h-full bg-black rounded-[2.4rem] overflow-hidden relative">
                
                {/* Imagen del Perfil */}
                <img
                  src={`/${about.imageUrl}`}
                  alt="Iñaki Sobera"
                  className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Capas de Interfaz de Usuario (HUD) */}
                <div className="absolute inset-0 border-[10px] border-black/20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/20 to-transparent opacity-40" />
                
                {/* Laser Scanning Line Animada */}
                <motion.div 
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[3px] bg-emerald-400 shadow-[0_0_15px_#10b981] z-20"
                />

                {/* Etiquetas flotantes HUD */}
                <div className="absolute top-10 left-6 flex flex-col gap-1">
                  <span className="text-[7px] font-mono text-blue-400 bg-black/60 px-2 py-0.5 rounded">STATUS: ACTIVE</span>
                  <span className="text-[7px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded">AUTH: LEVEL_4</span>
                </div>

                {/* Texto inferior integrado en la imagen */}
                <div className="absolute bottom-0 left-0 w-full p-8 pt-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                    {hero.name.split(' ')[0]}
                  </h3>
                  <h3 className="text-3xl font-black text-blue-500 uppercase tracking-tighter leading-none">
                    {hero.name.split(' ')[1]}
                  </h3>
                  <div className="flex items-center gap-2 mt-4 text-zinc-500">
                    <Cpu className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Systems Architect</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Icons */}
            <div className="absolute -top-6 -right-6 p-3 bg-zinc-900 border border-white/10 rounded-2xl shadow-xl group-hover:border-blue-500/50 transition-colors">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white tracking-tight uppercase flex items-center gap-4">
              <Terminal className="w-8 h-8 text-blue-500 animate-pulse" />
              Ingeniería de Sistemas
            </h3>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" />
          </div>
          
          <div className="space-y-6 max-w-3xl">
            {about.bio.map((paragraph, index) => (
              <p key={index} className="text-xl leading-relaxed text-zinc-300 font-light italic border-l-2 border-blue-500/20 pl-6">
                &quot;{paragraph}&quot;
              </p>
            ))}
          </div>
          
          <div className="pt-6 space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/5 to-transparent border border-white/5 backdrop-blur-md transition-all group hover:border-blue-500/30">
              <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                Especialización Técnica
              </h4>
              <p className="text-lg leading-relaxed text-zinc-300">
                {about.skillsSummary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <motion.a
                href={`/${about.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-12 py-6 bg-white text-black rounded-3xl transition-all font-black uppercase tracking-widest text-xs shadow-2xl"
              >
                <Download className="w-5 h-5" />
                Descargar Dossier (CV)
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
