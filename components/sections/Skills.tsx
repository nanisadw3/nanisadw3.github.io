"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { 
  Terminal, 
  Database, 
  Layout, 
  Cpu, 
  Network,
  Zap,
  Globe,
  Layers
} from "lucide-react";

export default function Skills() {
  const { skills } = portfolioData;

  const categories = [
    {
      title: "Backend Engine",
      icon: Terminal,
      skills: skills.programming,
      color: "text-primary",
      gradient: "from-primary/20 via-primary/5 to-transparent",
      colSpan: "md:col-span-2",
      description: "Desarrollo de lógica de servidor robusta y sistemas de alta disponibilidad.",
      stats: "Core Architecture"
    },
    {
      title: "Data & Analysis",
      icon: Database,
      skills: [...skills.databases, "Power BI"],
      color: "text-blue-400",
      gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
      colSpan: "md:col-span-1",
      description: "Gestión avanzada de persistencia y visualización estratégica de datos.",
      stats: "BI & Data Intelligence"
    },
    {
      title: "Infrastructure",
      icon: Cpu,
      skills: skills.tools,
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      colSpan: "md:col-span-1",
      description: "Entornos virtualizados y automatización de despliegues.",
      stats: "DevOps Ready"
    },
    {
      title: "Architecture & Patterns",
      icon: Network,
      skills: ["MVC Pattern", "Microservices", "REST APIs", "Sockets", "Concurrency"],
      color: "text-accent",
      gradient: "from-accent/20 via-accent/5 to-transparent",
      colSpan: "md:col-span-2",
      description: "Diseño de software escalable basado en estándares industriales.",
      stats: "Distributed Systems"
    },
    {
      title: "Interface Design",
      icon: Layout,
      skills: skills.frontend,
      color: "text-violet-400",
      gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
      colSpan: "md:col-span-2",
      description: "Creación de experiencias de usuario modernas y reactivas.",
      stats: "Full-Stack Ops"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-32 relative bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            TECHNICAL <span className="gradient-text">MASTERY</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            Un stack tecnológico diseñado para la <span className="text-white">eficiencia</span>, 
            la <span className="text-white">seguridad</span> y la <span className="text-white">escalabilidad</span>.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`${cat.colSpan} relative group overflow-hidden bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cat.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="flex items-start justify-between mb-10 relative z-10">
                <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                  <cat.icon className={`w-8 h-8 ${cat.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`} />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Expertise</span>
                  <span className={`text-xs font-bold ${cat.color} tracking-tight`}>{cat.stats}</span>
                </div>
              </div>

              <div className="mb-10 relative z-10">
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{cat.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                {cat.skills.map((skill, sIdx) => (
                  <motion.div 
                    key={sIdx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.06] group-hover:border-white/10 transition-all"
                  >
                    <Zap className={`w-3 h-3 ${cat.color} opacity-50 group-hover:opacity-100 group-hover:animate-pulse`} />
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-10 group/footer"
        >
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover/footer:border-primary/50"
            >
              <Globe className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Global Communication</p>
              <div className="flex gap-6">
                {skills.languages.map((lang, lIdx) => (
                  <motion.div 
                    key={lIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (lIdx * 0.1) }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white uppercase tracking-tighter">{lang.name}</span>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{lang.level}%</span>
                    </div>
                    <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-zinc-600 group-hover/footer:text-zinc-400 transition-colors">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Layers className="w-5 h-5" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Professional Stack</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
