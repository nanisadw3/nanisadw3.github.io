"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Github, ExternalLink, Code2, ArrowRight, Layers, ChevronDown, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

export default function Portfolio() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleProjects = () => {
    if (showAll) {
      // Si estamos cerrando, hacemos scroll al inicio de la sección
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Esperamos un poco para que el scroll empiece antes de colapsar
      setTimeout(() => setShowAll(false), 100);
    } else {
      setShowAll(true);
    }
  };

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
<<<<<<< HEAD
    <section ref={sectionRef} id="portfolio" className="py-32 relative overflow-hidden bg-background">
      {/* Subtle Background Animation */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
=======
    <Section id="portfolio" title="Proyectos Seleccionados" animationType="reveal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>
>>>>>>> d045758b8479252506457ca41416b94ece1286b9

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Works & Labs</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              PROYECTOS <br />
              <span className="gradient-text">DESTACADOS</span>
            </h2>
          </div>
          
          <motion.a 
            href="https://github.com/nanisadw3"
            target="_blank"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-primary transition-all group h-fit shadow-xl"
          >
            Sincronizar GitHub <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="group bento-card flex flex-col h-full !p-0 overflow-hidden !rounded-[3rem] shadow-2xl hover:shadow-primary/20 transition-all duration-500"
              >
                {/* Enhanced Image Section */}
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                    {project.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-xl text-[9px] font-black uppercase tracking-widest text-white border border-white/10 group-hover:border-primary/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-grow relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[12px] font-black text-primary/40 group-hover:text-primary transition-colors tracking-[0.3em]">
                      PROTOCOL_0{index + 1}
                    </span>
                    <div className="flex gap-4">
                      {project.github && (
                        <motion.a 
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          href={project.github} 
                          target="_blank" 
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a 
                          whileHover={{ scale: 1.2, rotate: -15 }}
                          href={project.demo} 
                          target="_blank" 
                          className="text-zinc-500 hover:text-accent transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black mb-5 group-hover:text-primary transition-colors tracking-tighter uppercase leading-none">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-base leading-relaxed mb-10 flex-grow line-clamp-3 font-medium">
                    {project.description}
                  </p>
                  
                  {/* Bottom UI Detail */}
                  <div className="pt-8 border-t border-white/5 mt-auto flex items-center justify-between group/link">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors animate-pulse" />
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active System</span>
                    </div>
                    <motion.div 
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary cursor-pointer"
                    >
                      Ver Archivo <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Improved Toggle Button Animation */}
        <motion.div 
          layout
          className="mt-24 flex justify-center"
        >
          <motion.button 
            onClick={toggleProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-16 py-7 overflow-hidden rounded-[2.5rem] border border-white/10 hover:border-primary transition-all bg-white/[0.02] shadow-2xl"
          >
            <div className="relative z-10 flex items-center gap-5 text-white font-black uppercase tracking-[0.4em] text-[11px]">
              <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
              {showAll ? "Colapsar Archivo" : "Desplegar Laboratorio"} 
              <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-700 ease-in-out ${showAll ? "rotate-180" : ""}`} />
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
