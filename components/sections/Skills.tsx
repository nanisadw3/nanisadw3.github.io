"use client";

import { motion, Variants } from "framer-motion";
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
import { useLanguage } from "@/lib/LanguageContext";

export default function Skills() {
  const { language, t } = useLanguage();
  const { skills } = t;

  const categories = [
    {
      title: language === "es" ? "Motor Backend" : "Backend Engine",
      icon: Terminal,
      skills: skills.programming,
      color: "text-primary",
      gradient: "from-primary/20 via-primary/5 to-transparent",
      colSpan: "md:col-span-2",
      description: language === "es" 
        ? "Desarrollo de lógica de servidor robusta y sistemas de alta disponibilidad." 
        : "Development of robust server logic and high availability systems.",
      stats: "Core Architecture"
    },
    {
      title: language === "es" ? "Datos & Análisis" : "Data & Analysis",
      icon: Database,
      skills: [...skills.databases, "Power BI"],
      color: "text-blue-400",
      gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
      colSpan: "md:col-span-1",
      description: language === "es" 
        ? "Gestión avanzada de persistencia y visualización estratégica de datos." 
        : "Advanced persistence management and strategic data visualization.",
      stats: "BI & Data Intelligence"
    },
    {
      title: language === "es" ? "Infraestructura" : "Infrastructure",
      icon: Cpu,
      skills: skills.tools,
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      colSpan: "md:col-span-1",
      description: language === "es" 
        ? "Entornos virtualizados y automatización de despliegues." 
        : "Virtualized environments and deployment automation.",
      stats: "DevOps Ready"
    },
    {
      title: language === "es" ? "Arquitectura & Patrones" : "Architecture & Patterns",
      icon: Network,
      skills: ["MVC Pattern", "Microservices", "REST APIs", "Sockets", "Concurrency"],
      color: "text-accent",
      gradient: "from-accent/20 via-accent/5 to-transparent",
      colSpan: "md:col-span-2",
      description: language === "es" 
        ? "Diseño de software escalable basado en estándares industriales." 
        : "Scalable software design based on industrial standards.",
      stats: "Distributed Systems"
    },
    {
      title: language === "es" ? "Diseño de Interfaces" : "Interface Design",
      icon: Layout,
      skills: skills.frontend,
      color: "text-violet-400",
      gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
      colSpan: "md:col-span-2",
      description: language === "es" 
        ? "Creación de experiencias de usuario modernas y reactivas." 
        : "Creation of modern and reactive user experiences.",
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
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden bg-background px-4 md:px-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-2 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16 md:mb-24 text-center md:text-left"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6 justify-center md:justify-start">
            <div className="w-8 md:w-12 h-[2px] bg-primary" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">{t.ui.skills.badge}</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-none uppercase">
            {t.ui.skills.title1} <span className="gradient-text">{t.ui.skills.title2}</span>
          </h2>
          <p className="text-zinc-500 text-base md:text-xl font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
            {t.ui.skills.desc}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`${cat.colSpan} relative group overflow-hidden bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 transition-all duration-500`}
            >
              <div className={`absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br ${cat.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="flex items-start justify-between mb-8 md:mb-10 relative z-10">
                <div className="p-4 md:p-5 rounded-xl md:rounded-[1.5rem] bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <cat.icon className={`w-6 h-6 md:w-8 md:h-8 ${cat.color}`} />
                </div>
                <div className="text-right">
                  <span className="text-[8px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Expertise</span>
                  <span className={`text-[10px] md:text-xs font-bold ${cat.color} tracking-tight`}>{cat.stats}</span>
                </div>
              </div>

              <div className="mb-8 md:mb-10 relative z-10">
                <h3 className="text-lg md:text-2xl font-black text-white mb-3 md:mb-4 tracking-tight uppercase">{cat.title}</h3>
                <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-auto relative z-10">
                {cat.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.06] transition-all"
                  >
                    <Zap className={`w-2.5 h-2.5 md:w-3 md:h-3 ${cat.color} opacity-50`} />
                    <span className="text-[10px] md:text-xs font-bold text-zinc-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 group/footer"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 md:mb-1">{t.ui.skills.languages}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
                {skills.languages.map((lang, lIdx) => (
                  <div key={lIdx} className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white uppercase tracking-tighter">{lang.name}</span>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{lang.level}%</span>
                    </div>
                    <div className="w-20 md:w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-zinc-600 transition-colors">
            <Layers className="w-5 h-5" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">{t.ui.skills.verified}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
