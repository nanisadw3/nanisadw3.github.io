"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { ChevronDown, Github, Terminal, Sparkles } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Marco de Neón Fluido (Visible en Hover) */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
      
      <div className="relative h-full flex flex-col bg-[#050505] border border-white/5 rounded-[2.1rem] overflow-hidden transition-all duration-500 shadow-2xl">
        
        {/* Imagen con Efecto de Zoom y Brillo */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          
          {/* Badge de neón superior */}
          <div className="absolute top-6 left-6">
            <div className="px-4 py-1.5 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)] rounded-full flex items-center gap-2">
              <Terminal className="w-3 h-3 text-white" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">System Core</span>
            </div>
          </div>
        </div>

        {/* Contenido del Proyecto */}
        <div className="p-8 flex flex-col flex-grow relative">
          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-light border-l-2 border-white/5 pl-4">
            {project.description}
          </p>

          {/* Tags con estilo HUD */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags?.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-md text-[8px] font-bold text-blue-400 uppercase tracking-widest group-hover:border-blue-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Botones de Acción de Alto Impacto */}
          <div className="grid grid-cols-2 gap-4">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all group/btn"
              >
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Source</span>
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-xl text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-105 transition-all group/btn"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
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
    <Section id="portfolio" title="Proyectos Estratégicos">
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
            className="group inline-flex flex-col items-center gap-4 mx-auto text-zinc-500 hover:text-white transition-all duration-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">
              {showAll ? "Minimizar Terminal" : "Cargar todos los Sistemas"}
            </span>
            <div className="p-5 border border-zinc-800 rounded-full bg-zinc-900 shadow-xl group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all">
              <ChevronDown className={`w-6 h-6 text-blue-500 transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`} />
            </div>
          </button>
        </div>
      )}
    </Section>
  );
}
