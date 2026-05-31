"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Portfolio() {
  const { t } = useLanguage();
  const { projects } = t;
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleProjects = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setShowAll(false), 100);
    } else {
      setShowAll(true);
    }
  };

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 md:py-32 relative overflow-hidden bg-background px-4 md:px-0">
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 blur-[100px] md:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container px-2 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 text-center md:text-left"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6 justify-center md:justify-start">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">{t.ui.portfolio.badge}</span>
            </div>
            <h2 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 leading-none tracking-tighter uppercase">
              {t.ui.portfolio.title1} <br />
              <span className="gradient-text">{t.ui.portfolio.title2}</span>
            </h2>
          </div>
          
          <motion.a 
            href="https://github.com/nanisadw3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-primary transition-all group h-fit shadow-xl justify-center"
          >
            {t.ui.portfolio.archiveBtn} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bento-card flex flex-col h-full !p-0 overflow-hidden !rounded-[2rem] md:!rounded-[3rem] shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2 z-20">
                    {project.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 md:px-4 md:py-1.5 bg-black/60 backdrop-blur-xl rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-grow relative">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <span className="text-[10px] md:text-[12px] font-black text-primary/40 group-hover:text-primary transition-colors tracking-[0.3em]">
                      PROTOCOL_0{index + 1}
                    </span>
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                          <Github className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent transition-colors">
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-3xl font-black mb-3 md:mb-5 group-hover:text-primary transition-colors tracking-tighter uppercase leading-none">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 md:mb-10 flex-grow line-clamp-3 font-medium">
                    {project.description}
                  </p>
                  
                  <div className="pt-6 md:pt-8 border-t border-white/5 mt-auto flex items-center justify-between group/link">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse" />
                      <span className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.ui.portfolio.activeSystem}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary">
                      {t.ui.portfolio.viewArchive} <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="mt-16 md:mt-24 flex justify-center">
          <button 
            onClick={toggleProjects}
            className="relative group px-10 md:px-16 py-5 md:py-7 overflow-hidden rounded-xl md:rounded-[2.5rem] border border-white/10 hover:border-primary transition-all bg-white/[0.02] shadow-2xl"
          >
            <div className="relative z-10 flex items-center gap-4 md:gap-5 text-white font-black uppercase tracking-[0.4em] text-[9px] md:text-[11px]">
              <Sparkles className="w-4 h-4 text-primary" />
              {showAll ? t.ui.portfolio.collapse : t.ui.portfolio.expand} 
              <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-primary transition-transform duration-500 ${showAll ? "rotate-180" : ""}`} />
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
