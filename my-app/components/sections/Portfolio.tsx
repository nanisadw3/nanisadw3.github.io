"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

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
    <Section id="portfolio" title="Portafolio">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative group h-full"
            >
              {/* Efecto de borde brillante detrás de la tarjeta */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500" />
              
              <div className="relative h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={`/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 mt-auto">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center gap-2 text-xs font-bold text-white bg-zinc-800 border border-zinc-700 hover:border-blue-500/50 px-5 py-2.5 rounded-lg transition-all overflow-hidden"
                      >
                        {/* Efecto de brillo que atraviesa el botón */}
                        <motion.div
                          variants={{
                            hover: { x: ["-100%", "100%"] }
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full"
                        />
                        
                        <motion.div
                          variants={{
                            hover: { rotate: [0, -10, 10, -10, 0] }
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.div>
                        <span>GitHub</span>
                        
                        {/* Indicador de flecha que aparece al hacer hover */}
                        <motion.span
                          variants={{
                            initial: { opacity: 0, x: -10 },
                            hover: { opacity: 1, x: 0 }
                          }}
                          className="ml-auto"
                        >
                          →
                        </motion.span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-600/20 overflow-hidden"
                      >
                        <motion.div
                          variants={{
                            hover: { scale: 1.2, rotate: 15 }
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.div>
                        <span>Live Demo</span>
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
        <div className="mt-16 text-center">
          <button
            onClick={toggleShowAll}
            className="group flex flex-col items-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm uppercase tracking-widest font-semibold">
              {showAll ? "Ver Menos" : "Ver Más"}
            </span>
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              className="p-2 border border-zinc-800 rounded-full bg-zinc-900 group-hover:border-blue-500"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </div>
      )}
    </Section>
  );
}
