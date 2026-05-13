"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Rocket, Sparkles } from "lucide-react";

export default function Hero() {
  const { contact } = portfolioData;
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const titleContainer: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 * i },
    }),
  };

  const letterAnimation: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 90,
    },
  };

  const line1 = "ENGINEERING".split("");
  const line2 = "THE FUTURE".split("");

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-32 pb-20"
    >
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 blur-[140px] rounded-full opacity-50"
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "80px", opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary to-accent mb-12 rounded-full"
          />

          <div className="mb-12 perspective-[1000px]">
            <motion.div
              variants={titleContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              <motion.h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.75] flex justify-center">
                {line1.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterAnimation}
                    className="inline-block text-white hover:text-primary transition-colors cursor-default"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.75] flex justify-center">
                {line2.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterAnimation}
                    className="inline-block gradient-text hover:brightness-125 transition-all cursor-default"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-xl md:text-3xl text-zinc-400 max-w-4xl mb-16 font-medium leading-tight px-4"
          >
            Iñaki Sobera • Arquitecturas <span className="text-white border-b-2 border-primary/30">backend de alto rendimiento</span> y ecosistemas de <span className="text-accent italic font-bold">IA</span> evolucionados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8 mb-24"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(139,92,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-14 py-7 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                Desplegar Proyectos <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-violet-400 to-primary translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.a>

            <div className="flex items-center gap-6">
               <motion.a whileHover={{ y: -5, scale: 1.1 }} href={contact.github} target="_blank" className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-primary transition-all hover:bg-white/10 group relative overflow-hidden">
                <Github className="w-7 h-7 group-hover:text-primary transition-colors relative z-10" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </motion.a>
               <motion.a whileHover={{ y: -5, scale: 1.1 }} href={contact.linkedin} target="_blank" className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-primary transition-all hover:bg-white/10 group relative overflow-hidden">
                <Linkedin className="w-7 h-7 group-hover:text-primary transition-colors relative z-10" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/3 right-10 hidden lg:block">
        <Sparkles className="w-8 h-8 text-primary/30 blur-[1px]" />
      </motion.div>
    </section>
  );
}
