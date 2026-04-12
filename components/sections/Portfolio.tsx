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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Tarjeta con diseño industrial limpio */}
      <div className="relative h-full flex flex-col bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-300 group-hover:border-blue-500/40 shadow-xl">
        
        {/* Imagen del Proyecto */}
        <div className="relative h-64 overflow-hidden bg-black">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
          
          {/* Badge superior minimalista */}
          <div className="absolute top-5 left-5">
            <div className="px-3 py-1 bg-blue-600 text-white rounded-md flex items-center gap-2 shadow-lg">
              <Terminal className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-widest">Engineering Unit</span>
            </div>
          </div>
        </div>

        {/* Información del Proyecto */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow font-light">
            {project.description}
          </p>

          {/* Tags de tecnología */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags?.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[9px] font-bold text-zinc-500 uppercase">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Enlaces de acción limpios */}
          <div className="flex items-center gap-6 border-t border-white/5 pt-6">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Source</span>
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
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
    <Section id="portfolio" title="Proyectos de Ingeniería">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {projects.length > 6 && (
        <div className="mt-20 text-center">
          <button
            onClick={toggleShowAll}
            className="group flex flex-col items-center gap-4 mx-auto text-zinc-500 hover:text-white transition-all duration-300"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {showAll ? "Minimizar" : "Ver Todos los Proyectos"}
            </span>
            <div className="p-4 border border-zinc-800 rounded-full group-hover:border-blue-500 transition-colors">
              <ChevronDown className={`w-6 h-6 text-blue-500 transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`} />
            </div>
          </button>
        </div>
      )}
    </Section>
  );
}
