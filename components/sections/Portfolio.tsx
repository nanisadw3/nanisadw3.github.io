"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Github, ExternalLink, ChevronDown, Terminal, Layers } from "lucide-react";
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

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <Section id="portfolio" title="Project Intelligence">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05, type: "spring", stiffness: 50 }}
              className="group relative"
            >
              <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-700 group-hover:border-blue-500/30 shadow-2xl">
                
                {/* Background Image with Parallax-like hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={`/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="flex gap-2">
                      {project.tags?.map((tag, i) => (
                        <span key={i} className="px-3 py-1 glass rounded-full text-[8px] font-black uppercase tracking-widest text-blue-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {project.description}
                    </p>

                    <div className="flex gap-4 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-black rounded-2xl hover:scale-110 transition-all">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-4 glass text-white rounded-2xl hover:scale-110 transition-all">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative Icon */}
                <div className="absolute top-10 right-10 text-white/10 group-hover:text-blue-500/20 transition-colors">
                  <Terminal className="w-12 h-12" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length > 6 && (
        <div className="mt-20 text-center">
          <button
            onClick={toggleShowAll}
            className="group flex flex-col items-center gap-4 mx-auto text-zinc-600 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {showAll ? "Terminate List" : "Load more instances"}
            </span>
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              className="p-4 border border-zinc-800 rounded-full group-hover:border-blue-500 transition-colors"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </button>
        </div>
      )}
    </Section>
  );
}
