"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, Terminal, BarChart3, Bot } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();
  const { experience } = t;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Helper to map highlight to relevant sub-icon
  const getSubIcon = (text: string) => {
    if (text.toLowerCase().includes("inteligencia") || text.toLowerCase().includes("ia")) {
      return Bot;
    }
    if (text.toLowerCase().includes("datos") || text.toLowerCase().includes("power bi")) {
      return BarChart3;
    }
    return Terminal;
  };

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden bg-background px-4 md:px-0">
      <div className="absolute top-0 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-2 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t.ui.experience.badge}</span>
          </div>
          <h2 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-none uppercase">
            {t.ui.experience.title1} <br />
            <span className="gradient-text">{t.ui.experience.title2}</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8"
        >
          {experience.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative p-6 md:p-14 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-xl"
            >
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/40 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
                
                {/* Role and Info Left Side */}
                <div className="lg:w-1/3 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {item.period}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {t.ui.experience.active}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-primary transition-colors leading-tight tracking-tighter uppercase mb-2">
                      {item.role}
                    </h3>
                    <p className="text-accent font-black text-sm uppercase tracking-[0.2em]">
                      {item.company}
                    </p>
                  </div>

                  <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed max-w-sm">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-xl text-[9px] font-bold text-zinc-400 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights Right Side */}
                <div className="lg:w-2/3 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-14">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">{t.ui.experience.subtitle}</h4>
                  
                  <div className="space-y-6">
                    {item.highlights.map((highlight, hIdx) => {
                      const IconComponent = getSubIcon(highlight);
                      const [title, rest] = highlight.split(":");
                      return (
                        <div key={hIdx} className="flex gap-4 items-start group/item">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-500 group-hover/item:border-primary group-hover/item:text-primary transition-all duration-300 shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm uppercase tracking-wider mb-1">
                              {title}
                            </p>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
                              {rest ? rest.trim() : ""}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Huge watermarked index on the back */}
              <div className="absolute top-6 right-10 text-6xl md:text-[10rem] font-black text-white/[0.01] pointer-events-none select-none leading-none group-hover:text-white/[0.02] transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
