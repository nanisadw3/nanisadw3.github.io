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
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative h-full"
    >
      <div className="relative h-full flex flex-col bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:bg-[#0d0d0d] shadow-2xl">
        
        {/* Project Image - Higher Contrast */}
        <div className="relative h-64 overflow-hidden border-b border-white/5">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Professional Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          
          {/* Engineering Badge */}
          <div className="absolute top-6 left-6">
            <div className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full flex items-center gap-2 shadow-lg">
              <Terminal className="w-3 h-3 text-white" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">System Unit</span>
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

          {/* Tags - Minimal Style */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags?.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Action Links - Direct & Clean */}
          <div className="flex items-center gap-8 border-t border-white/5 pt-8 mt-auto">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group/link"
              >
                <Github className="w-5 h-5 transition-transform group-hover/link:-translate-y-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">Repository</span>
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-all group/link"
              >
                <ExternalLink className="w-5 h-5 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
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
              {showAll ? "Minimizar Terminal" : "Ver todos los Proyectos"}
            </span>
            <div className="p-5 border border-zinc-800 rounded-full bg-zinc-900 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all">
              <ChevronDown className={`w-6 h-6 text-blue-500 transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`} />
            </div>
          </button>
        </div>
      )}
    </Section>
  );
}
