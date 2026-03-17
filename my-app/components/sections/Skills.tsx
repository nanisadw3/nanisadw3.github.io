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

  return (
    <Section id="skills" title="Habilidades">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, list]) => {
          if (category === "languages") return null;
          const Icon = iconMap[category as keyof typeof iconMap] || Code2;
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600/10 rounded-2xl">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white capitalize">
                  {category === "programming" ? "Lenguajes" : 
                   category === "frontend" ? "Frontend" :
                   category === "databases" ? "Bases de Datos" : "Herramientas"}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {(list as string[]).map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-300 text-sm font-medium hover:text-white hover:border-blue-500/50 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
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
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full"
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
