"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, Terminal, ShieldCheck, Cpu, Fingerprint } from "lucide-react";
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
        
        {/* Perfil Estilo Gafete con Física y Animación de Caída */}
        <div 
          className="perspective-[1200px] select-none pt-24"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            // Animación de entrada: cae desde arriba y se balancea
            initial={{ y: -500, opacity: 0, rotateZ: -15 }}
            whileInView={{ 
              y: 0, 
              opacity: 1, 
              rotateZ: [0, 8, -4, 2, 0] 
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              y: { type: "spring", stiffness: 80, damping: 12, duration: 2 },
              rotateZ: { delay: 0.5, duration: 2.5, ease: "easeInOut" },
              opacity: { duration: 0.6 }
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-72 h-[420px] sm:w-80 sm:h-[480px] shrink-0 group origin-top"
          >
            {/* Listón del Gafete (Lanyard) - Estética de Ingeniería */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-5 h-32 bg-gradient-to-b from-blue-900/40 via-blue-600/60 to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              {/* Clip de unión metálico */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-zinc-700 rounded-full bg-zinc-800 shadow-xl" />
            </div>

            {/* Brillo de fondo dinámico */}
            <div className="absolute inset-0 bg-blue-600/15 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Cuerpo del Gafete */}
            <div className="relative w-full h-full bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-7 translate-z-[30px]">
              
              {/* Slot superior del gafete */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black/60 rounded-full border border-white/5" />

              {/* Cabecera del Gafete */}
              <div className="flex justify-between items-center mb-6 mt-4">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-blue-500" />
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">ID Verified</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Imagen de Perfil con Efecto HUD */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-black group-hover:border-blue-500/30 transition-colors duration-500">
                <img
                  src={`/${about.imageUrl}`}
                  alt="Iñaki Sobera"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                
                {/* Scanner Laser animado */}
                <motion.div 
                  animate={{ top: ["-5%", "105%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-blue-400/80 shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                />
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
              </div>

              {/* Información del Usuario */}
              <div className="mt-8 space-y-2 text-center">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                  {hero.name.split(' ')[0]}<br/>
                  <span className="text-blue-500">{hero.name.split(' ')[1]}</span>
                </h3>
                <div className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-md">
                  <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest">Systems Engineer</p>
                </div>
              </div>

              {/* Pie del Gafete */}
              <div className="mt-auto pt-4 flex justify-between items-center opacity-40 border-t border-white/5">
                <span className="text-[7px] font-mono text-zinc-400">SEC-PROTOCOL: ALPHA-9</span>
                <Cpu className="w-4 h-4 text-zinc-400" />
              </div>
            </div>

            {/* Efecto de partículas orbitando el gafete */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border border-dashed border-blue-500/10 rounded-full -z-10 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Contenido de la Biografía */}
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
