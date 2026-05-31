"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Rocket, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const { contact } = t;
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const titleContainer: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
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
      y: 20,
      rotateX: 90,
    },
  };

  const line1Words = "ENGINEERING".split(" ");
  const line2Words = "THE FUTURE".split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg pt-20 md:pt-32 pb-10 md:pb-20 px-4"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full opacity-50"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -25, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent/20 blur-[100px] md:blur-[140px] rounded-full opacity-50"
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container px-2 md:px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60px md:80px", opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary to-accent mb-8 md:mb-12 rounded-full"
          />

          {/* Responsive Dynamic Title */}
          <div className="mb-8 md:mb-12 perspective-[1000px] w-full overflow-hidden md:overflow-visible">
            <motion.div
              variants={titleContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 md:gap-2"
            >
              {/* Primera Línea */}
              <motion.h1 className="text-[8.5vw] sm:text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] flex justify-center flex-wrap gap-x-[0.3em]">
                {line1Words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={letterAnimation}
                        className="inline-block text-white"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              {/* Segunda Línea con Gradiente */}
              <motion.h1 className="text-[8.5vw] sm:text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] flex justify-center flex-wrap gap-x-[0.3em]">
                {line2Words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={letterAnimation}
                        className="inline-block gradient-text"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-base md:text-3xl text-zinc-400 max-w-4xl mb-12 md:mb-16 font-medium leading-snug px-2"
          >
            {t.hero.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-16 md:mb-24 w-full justify-center"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 md:px-14 py-5 md:py-7 bg-primary text-white rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] overflow-hidden transition-all w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {t.ui.hero.projectsBtn} <Rocket className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.a>

            <div className="flex items-center gap-4 md:gap-6">
               <motion.a 
                whileHover={{ y: -3 }}
                href={contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 md:p-6 rounded-xl md:rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-primary transition-all"
               >
                <Github className="w-5 h-5 md:w-7 md:h-7 group-hover:text-primary transition-colors" />
               </motion.a>
               <motion.a 
                whileHover={{ y: -3 }}
                href={contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 md:p-6 rounded-xl md:rounded-[1.5rem] bg-white/5 border border-white/10 hover:border-primary transition-all"
               >
                <Linkedin className="w-5 h-5 md:w-7 md:h-7 group-hover:text-primary transition-colors" />
               </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/3 right-10 hidden lg:block pointer-events-none">
        <Sparkles className="w-8 h-8 text-primary/30 blur-[1px]" />
      </motion.div>
    </section>
  );
}
