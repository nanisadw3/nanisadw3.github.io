"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { ChevronDown, ExternalLink, Github, Terminal } from "lucide-react";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  tags?: string[];
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="group relative h-full"
    >
      <div className="relative h-full flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#111111] shadow-2xl">
        
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          
          {/* Badge */}
          <div className="absolute top-6 left-6">
            <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
              <Terminal className="w-3 h-3 text-blue-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Engineering Unit</span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-zinc-400 text-base leading-relaxed mb-8 flex-grow font-light">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags?.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-zinc-500 tracking-wide uppercase">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Action Links */}
          <div className="flex items-center gap-8">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group/link"
              >
                <Github className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Source Code</span>
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors group/link"
              >
                <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live System</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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
    <Section id="portfolio" title="Proyectos Seleccionados">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {projects.length > 6 && (
        <div className="mt-24 text-center">
          <button
            onClick={toggleShowAll}
            className="group flex flex-col items-center gap-4 mx-auto text-zinc-500 hover:text-white transition-all duration-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {showAll ? "Ver Menos" : "Mostrar todos los Proyectos"}
            </span>
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              className="p-4 border border-zinc-800 rounded-full group-hover:border-blue-500 transition-colors"
            >
              <ChevronDown className="w-6 h-6 text-blue-500" />
            </motion.div>
          </button>
        </div>
      )}
    </Section>
  );
}
