"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Code2, Layout, Database, Wrench, Globe } from "lucide-react";

const iconMap = {
  programming: Code2,
  frontend: Layout,
  databases: Database,
  tools: Wrench,
};

export default function Skills() {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
  };

  return (
    <Section id="skills" title="Habilidades">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, list]) => {
          if (category === "languages") return null;
          const Icon = iconMap[category as keyof typeof iconMap] || Code2;
          
          return (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-blue-500/30 transition-colors group/card"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="p-3 bg-blue-600/10 rounded-2xl group-hover/card:bg-blue-600/20 transition-colors"
                >
                  <Icon className="w-6 h-6 text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white capitalize">
                  {category === "programming" ? "Lenguajes" : 
                   category === "frontend" ? "Frontend" :
                   category === "databases" ? "Bases de Datos" : "Herramientas"}
                </h3>
              </div>
              
              <motion.div className="flex flex-wrap gap-3">
                {(list as string[]).map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ y: -5, backgroundColor: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.5)" }}
                    className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-300 text-sm font-medium hover:text-white transition-all cursor-default"
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl md:col-span-2 hover:border-emerald-500/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-600/10 rounded-2xl">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Idiomas</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {skills.languages.map((lang) => (
              <div key={lang.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-medium text-white">{lang.name}</span>
                  <span className="text-emerald-400 font-mono text-sm">{lang.level}%</span>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
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
