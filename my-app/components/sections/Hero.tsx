"use client";

import { motion } from "framer-motion";
import ScrambleText from "../effects/ScrambleText";
import GlitchCanvas from "../effects/GlitchCanvas";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Code2, Terminal, Cpu, Sparkles } from "lucide-react";

export default function Hero() {
  const { hero, contact } = portfolioData;

  const floatingIcons = [
    { Icon: Code2, color: "text-blue-500", top: "20%", left: "15%", delay: 0 },
    { Icon: Terminal, color: "text-emerald-500", top: "60%", left: "10%", delay: 1 },
    { Icon: Cpu, color: "text-purple-500", top: "25%", right: "15%", delay: 0.5 },
    { Icon: Sparkles, color: "text-yellow-500", top: "65%", right: "12%", delay: 1.5 },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <GlitchCanvas />

      {/* 1. Redes Sociales Laterales (Izquierda) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute left-6 bottom-32 hidden lg:flex flex-col gap-6 z-20"
      >
        <a href={contact.github} target="_blank" className="text-zinc-500 hover:text-white hover:scale-125 transition-all">
          <Github className="w-6 h-6" />
        </a>
        <a href={contact.linkedin} target="_blank" className="text-zinc-500 hover:text-white hover:scale-125 transition-all">
          <Linkedin className="w-6 h-6" />
        </a>
        <div className="w-[1px] h-20 bg-zinc-800 mx-auto mt-2" />
      </motion.div>

      {/* 2. Iconos Flotantes de Fondo */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut"
          }}
          style={{ top: item.top, left: item.left, right: item.right }}
          className={`absolute z-0 hidden md:block ${item.color}`}
        >
          <item.Icon className="w-12 h-12" />
        </motion.div>
      ))}

      <div className="container px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3. Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
            <ScrambleText text={hero.name} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12"
          >
            {hero.summary.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="flex flex-col items-center gap-12"
          >
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(37, 99, 235, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 inline-block"
            >
              Contáctame
            </motion.a>

            {/* 4. Quick Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-3xl border-t border-zinc-800/50 pt-12">
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-black text-white">+10</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Proyectos</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-black text-white">4</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Certificaciones</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-black text-white">ISC</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Ingeniería</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-zinc-800 rounded-full flex justify-center p-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
