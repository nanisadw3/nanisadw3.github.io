"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import Image from "next/image";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Portfolio() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  
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
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-colors shadow-xl"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={`/${project.image}`}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
              </div>
              
              <div className="p-6 flex flex-col h-[calc(100%-12rem)] sm:h-[calc(100%-14rem)]">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex gap-4 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-all"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> Ver
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length > 3 && (
        <div className="mt-16 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
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
