"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, ShieldCheck, Cpu, Fingerprint } from "lucide-react";
import { useRef } from "react";

export default function About() {
  const { about, hero } = portfolioData;
  const cardRef = useRef<HTMLDivElement>(null);

  // Valores para la inclinación 3D
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
      <div className="flex flex-col md:flex-row gap-16 items-center lg:items-start">
        
        {/* Digital ID Card Container con Animación de Caída */}
        <div 
          className="perspective-[1000px] select-none pt-20" // Espacio para el listón
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            // Animación de caída y balanceo
            initial={{ y: -400, opacity: 0, rotateZ: -10 }}
            whileInView={{ 
              y: 0, 
              opacity: 1, 
              rotateZ: [0, 5, -3, 1, 0], // Balanceo al final de la caída
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              y: { type: "spring", stiffness: 100, damping: 15, duration: 1.5 },
              rotateZ: { delay: 0.8, duration: 2, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-64 h-96 sm:w-72 sm:h-[420px] shrink-0 group origin-top"
          >
            {/* Listón del Gafete (Lanyard) */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-24 bg-gradient-to-b from-blue-900/50 via-blue-700/80 to-blue-600 rounded-full -z-10 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              {/* El gancho que une el listón con el gafete */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 border-4 border-zinc-700 rounded-full bg-zinc-800" />
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-600/20 rounded-[2rem] blur-3xl group-hover:bg-blue-500/40 transition-colors duration-500" />

            {/* The Main Card */}
            <div className="relative w-full h-full bg-zinc-900/80 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col p-6 translate-z-[20px]">
              
              {/* Ranura para el listón */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/40 rounded-full border border-white/5" />

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-2xl opacity-50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-2xl opacity-50" />

              {/* ID Header */}
              <div className="flex justify-between items-center mb-6 mt-2">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-blue-500" />
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Access Granted</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Profile Image with Scanner Effect */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/5 bg-black">
                <img
                  src={`/${about.imageUrl}`}
                  alt="Iñaki Sobera"
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Laser Scanner Line */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                />
                
                {/* Digital Noise / Grid overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
              </div>

              {/* Identity Info */}
              <div className="mt-8 space-y-3 text-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {hero.name.split(' ')[0]} {hero.name.split(' ')[1]}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-md">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">
                      Developer
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="mt-auto pt-4 flex justify-between items-center opacity-40">
                <span className="text-[8px] font-mono text-zinc-400">UUID: 215488-AUTH-00</span>
                <Cpu className="w-4 h-4 text-zinc-400" />
              </div>
            </div>

            {/* Floating particles or accents behind */}
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-dashed border-blue-500/20 rounded-full -z-10"
            />
          </motion.div>
        </div>

        {/* Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 text-gray-300 md:pt-6"
        >
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white tracking-tight">Perfil Profesional</h3>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" />
          </div>
          
          {about.bio.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-zinc-400">
              {paragraph}
            </p>
          ))}
          
          <div className="pt-6 space-y-6">
            <h4 className="text-xl font-bold text-white">Habilidades y Herramientas</h4>
            <p className="text-lg leading-relaxed text-zinc-400">
              {about.skillsSummary}
            </p>
            
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <a
                href={`/${about.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl transition-all group font-bold shadow-xl active:scale-95"
              >
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Descargar CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
