"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, Terminal, ShieldCheck, Fingerprint } from "lucide-react";
import { useRef } from "react";

export default function About() {
  const { about, hero } = portfolioData;
  const cardRef = useRef<HTMLDivElement>(null);

  // Física de inclinación 3D impulsada por resortes
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Section id="about" title="Sobre Mí">
      <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* REALISTIC ID BADGE SYSTEM */}
        <div 
          className="perspective-[1200px] select-none pt-24"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ 
              y: 0, 
              opacity: 1,
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-[320px] h-[480px] shrink-0 group origin-top"
          >
            {/* LANYARD (LISTÓN) - Refined */}
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-6 h-36 z-0 pointer-events-none">
              <div className="w-full h-full bg-[#0a1a3a] rounded-full border-x border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-transparent" />
              </div>
              {/* PROFESSIONAL CLIP */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-500 rounded-lg shadow-xl flex items-center justify-center border border-white/30">
                <div className="w-4 h-4 rounded-full bg-zinc-800 border border-white/10 shadow-inner" />
              </div>
            </div>

            {/* CARD BODY - Ultra Clean White */}
            <div className="relative w-full h-full bg-white rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col translate-z-[40px] border border-white/40">
              
              {/* MAGNETIC STRIP / TOP ACCENT */}
              <div className="h-16 w-full bg-zinc-900 flex items-center px-6 justify-between border-b-2 border-blue-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono">SECURITY ACCESS</span>
                </div>
                <div className="text-[8px] font-mono text-zinc-500">AUTH. GRANTED</div>
              </div>

              <div className="p-6 flex-grow flex flex-col relative">
                {/* WATERMARK BACKGROUND */}
                <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
                  <Fingerprint className="w-64 h-64 text-black" />
                </div>

                {/* PROFILE IMAGE - Professional Frame */}
                <div className="relative w-full aspect-square bg-[#f3f4f6] rounded-xl overflow-hidden border border-zinc-100 mb-6 shadow-sm group-hover:border-blue-500/30 transition-colors duration-500">
                  <img
                    src={`/${about.imageUrl}`}
                    alt={hero.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  {/* SUBTLE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />
                </div>

                {/* IDENTITY DATA */}
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Full Name</p>
                    <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter leading-none border-b border-zinc-100 pb-2">
                      {hero.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Designation</p>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">Systems Engineer</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Access Level</p>
                      <p className="text-xs font-bold text-zinc-900 uppercase tracking-tight">Tier 1 // Admin</p>
                    </div>
                  </div>
                </div>

                {/* FOOTER DATA / BARCODE AREA */}
                <div className="mt-auto flex items-end justify-between border-t border-zinc-100 pt-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest">Employee ID</p>
                    <p className="text-[10px] font-mono font-bold text-zinc-800">ISO-215488-CORE</p>
                  </div>
                  {/* REALISTIC CHIP */}
                  <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 rounded-md shadow-md border border-black/10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:4px_4px]" />
                  </div>
                </div>
              </div>

              {/* BOTTOM SECURITY LINE */}
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600" />
            </div>

            {/* FLOATING SHADOW FOR REALISM */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/40 blur-2xl rounded-full scale-x-150 pointer-events-none" />
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
