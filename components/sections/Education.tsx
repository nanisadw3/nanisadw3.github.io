"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Award, Download, ShieldCheck, Cpu, Code2, Database } from "lucide-react";

export default function Education() {
  const { education } = portfolioData;

  const iconMap = [Award, ShieldCheck, Cpu, Code2, Database];

  return (
    <Section id="education" title="Log de Trayectoria">
      <div className="relative max-w-5xl mx-auto pl-8 sm:pl-0">
        {/* Central Vertical Line */}
        <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-zinc-800 to-transparent sm:-translate-x-1/2" />

        <div className="space-y-24">
          {education.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative flex items-center justify-between group">
                {/* Timeline Dot with Icon */}
                <div className="absolute left-0 sm:left-1/2 w-12 h-12 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center -translate-x-1/2 z-10 group-hover:border-blue-500 transition-colors duration-500 shadow-2xl shadow-blue-500/10">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>

                {/* Content Card */}
                <div className={`w-full sm:w-[42%] ${isEven ? 'sm:text-right' : 'sm:ml-auto sm:text-left'} pl-12 sm:pl-0`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="space-y-4"
                  >
                    <div className={`flex flex-col ${isEven ? 'sm:items-end' : 'sm:items-start'}`}>
                      <span className="text-blue-500 font-black font-mono text-[10px] tracking-[0.3em] uppercase mb-2">
                        {item.period || item.date}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tighter uppercase">
                        {item.title}
                      </h3>
                      <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/5 rounded-full">
                        <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                          {item.institution}
                        </span>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-base leading-relaxed font-light">
                      {item.focus}
                    </p>

                    <div className={`flex flex-wrap gap-4 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      {item.certLink && (
                        <a href={`/${item.certLink}`} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl hover:bg-white hover:text-black transition-all">
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Date Spacer for PC */}
                <div className="hidden sm:block w-[42%]" />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
