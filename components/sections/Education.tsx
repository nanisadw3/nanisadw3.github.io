"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { GraduationCap, Award, ExternalLink, MapPin, CheckCircle2, Calendar, ShieldCheck } from "lucide-react";

export default function Education() {
  const { education } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="education" className="py-32 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col items-center md:items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Academic & Certs</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-center md:text-left leading-none uppercase">
            TRAINING & <br />
            <span className="gradient-text">CREDENTIALS</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8"
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ x: 15 }}
              onClick={() => item.certLink && window.open(item.certLink, '_blank')}
              className={`group relative flex flex-col md:flex-row gap-10 p-10 md:p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden shadow-2xl ${item.certLink ? 'cursor-pointer' : ''}`}
            >
              {/* Animated Progress/Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/40 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

              {/* Icon Section */}
              <div className="flex-shrink-0">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-inner"
                >
                  {item.institution.toLowerCase().includes('hack4u') || item.title.toLowerCase().includes('certif') ? (
                    <Award className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                  ) : (
                    <GraduationCap className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                  )}
                </motion.div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-zinc-500 border border-white/10">
                        {item.period || item.date}
                      </span>
                      {item.certCode && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest animate-pulse">
                          <CheckCircle2 className="w-3 h-3" />
                          Validated
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-primary transition-colors leading-none tracking-tighter uppercase mb-2">
                      {item.title}
                    </h3>
                    <p className="text-accent font-black text-sm uppercase tracking-widest">
                      {item.institution}
                    </p>
                  </div>
                  
                  {item.certLink && (
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={item.certLink} 
                      target="_blank"
                      className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary hover:border-primary transition-all shadow-xl group/btn"
                    >
                      Verify Badge
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </motion.a>
                  )}
                </div>

                <div className="relative">
                  <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8 max-w-4xl border-l-2 border-white/10 pl-8 group-hover:border-primary/50 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-8 text-zinc-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-700" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Remote Node / Global</span>
                  </div>
                  {item.certCode && (
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-tighter bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                      <span className="text-zinc-700">ID_SPEC:</span>
                      <span className="text-zinc-400">{item.certCode}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Corner Text */}
              <div className="absolute top-10 right-10 text-[10rem] font-black text-white/[0.01] pointer-events-none select-none leading-none group-hover:text-white/[0.03] transition-colors duration-700">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
