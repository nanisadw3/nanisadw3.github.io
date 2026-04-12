"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Github, ExternalLink, ChevronDown, Folder, Code2, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Spotlight Effect Values
  const spotlightX = useSpring(useMotionValue(0));
  const spotlightY = useSpring(useMotionValue(0));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // For Tilt
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);

    // For Spotlight
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      className="relative perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full min-h-[480px] bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col group transition-colors duration-500 hover:border-blue-500/30 shadow-2xl"
      >
        {/* Dynamic Spotlight Background */}
        <motion.div 
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([sx, sy]) => `radial-gradient(600px circle at ${sx}px ${sy}px, rgba(59, 130, 246, 0.06), transparent 40%)`
            )
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* Image Section */}
        <div className="relative h-60 overflow-hidden m-4 rounded-[2rem] border border-white/5">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          
          {/* Tags Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.tags?.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8 pt-4 flex flex-col flex-grow relative z-10 translate-z-[30px]">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Deployment Active</span>
          </div>

          <h3 className="text-3xl font-black text-white mb-4 leading-tight tracking-tighter uppercase font-display group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-light italic">
            &quot;{project.description}&quot;
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white py-4 rounded-xl transition-all duration-300"
              >
                <Code2 className="w-4 h-4" />
                <span>Engine</span>
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-black bg-white hover:bg-blue-600 hover:text-white py-4 rounded-xl transition-all duration-300 shadow-xl shadow-white/5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Live Alpha</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-blue-500/5 -rotate-45 translate-x-12 translate-y-12" />
      </motion.div>
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
              {showAll ? "Terminate Grid" : "Initialize more instances"}
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
              className="p-5 border border-zinc-800 rounded-full bg-[#0a0a0a] group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
            >
              <ChevronDown className="w-6 h-6 text-blue-500" />
            </motion.div>
          </button>
        </div>
      )}
    </Section>
  );
}
