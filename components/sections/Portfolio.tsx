"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Github, ExternalLink, ChevronDown, FolderOpen } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "../ui/Reveal";

export default function Portfolio() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  
  const toggleShowAll = () => {
    if (showAll) {
      const section = document.getElementById("portfolio");
      if (section) {
        const yOffset = -100;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setTimeout(() => setShowAll(false), 100);
    } else {
      setShowAll(true);
    }
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <Section id="portfolio" title="Proyectos Destacados">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="relative group h-full"
            >
              {/* Animated Border Gradient */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-600/20 via-emerald-500/20 to-purple-600/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
              
              <div className="relative h-full bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px] group-hover:border-white/10">
                {/* Image Container with Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    {project.tags?.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <FolderOpen className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                    <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-light">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 mt-auto">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-3 text-xs font-black text-white bg-zinc-900 border border-white/5 hover:border-white/20 px-6 py-4 rounded-xl transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span className="uppercase tracking-[0.1em]">Code</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-3 text-xs font-black text-black bg-white hover:bg-zinc-200 px-6 py-4 rounded-xl transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="uppercase tracking-[0.1em]">Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length > 3 && (
        <FadeIn delay={0.5}>
          <div className="mt-20 text-center">
            <button
              onClick={toggleShowAll}
              className="group relative inline-flex flex-col items-center gap-4 mx-auto text-zinc-500 hover:text-white transition-colors"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-black">
                {showAll ? "Collapse Grid" : "Explore More"}
              </span>
              <motion.div
                animate={{ 
                  rotate: showAll ? 180 : 0,
                  y: showAll ? 0 : [0, 10, 0]
                }}
                transition={{ 
                  rotate: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                className="p-4 border border-zinc-800 rounded-full bg-[#0a0a0a] group-hover:border-blue-500 transition-colors"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>
          </div>
        </FadeIn>
      )}
    </Section>
  );
}
