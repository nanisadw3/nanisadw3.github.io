"use client";

import { motion, Variants } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Code2, Layout, Database, Wrench, Globe, Terminal, Cpu } from "lucide-react";
import { FadeIn } from "../ui/Reveal";

const iconMap = {
  programming: Terminal,
  frontend: Layout,
  databases: Database,
  tools: Wrench,
};

export default function Skills() {
  const { skills } = portfolioData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <Section id="skills" title="Tech Stack & Expertise">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.entries(skills).map(([category, list]) => {
          if (category === "languages") return null;
          const Icon = iconMap[category as keyof typeof iconMap] || Code2;
          
          return (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:border-blue-500/20 transition-all duration-500 group relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {category === "programming" ? "Backend Core" : 
                   category === "frontend" ? "Frontend UI" :
                   category === "databases" ? "Data Storage" : "Engineering Tools"}
                </h3>
              </div>
              
              <motion.div className="flex flex-wrap gap-4 relative z-10">
                {(list as string[]).map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(59,130,246,0.3)" }}
                    className="px-5 py-2.5 bg-zinc-900/50 border border-white/5 rounded-xl text-zinc-400 text-sm font-bold tracking-wide hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Idiomas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] md:col-span-2 hover:border-emerald-500/20 transition-all duration-700 shadow-2xl overflow-hidden group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="flex items-center gap-5 mb-12 relative z-10">
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl">
              <Globe className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Communication Protocols</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 relative z-10">
            {skills.languages.map((lang) => (
              <div key={lang.name} className="space-y-4 group/lang">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold text-white group-hover/lang:text-emerald-400 transition-colors">{lang.name}</span>
                  <span className="text-emerald-500 font-black font-mono text-sm tracking-widest">{lang.level}%</span>
                </div>
                <div className="h-2.5 bg-zinc-900 border border-white/5 rounded-full overflow-hidden p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
