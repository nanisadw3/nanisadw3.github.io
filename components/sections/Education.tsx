"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { GraduationCap, Award, ExternalLink, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Education() {
  const { education } = portfolioData;

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="education" className="py-20 md:py-32 relative overflow-hidden bg-background px-4 md:px-0">
      <div className="absolute top-0 left-1/4 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container px-2 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-accent">Academic & Certs</span>
          </div>
          <h2 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-none uppercase">
            TRAINING & <br />
            <span className="gradient-text">CREDENTIALS</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:gap-8"
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ x: 10 }}
              onClick={() => item.certLink && window.open(item.certLink, '_blank')}
              className={`group relative flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-14 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-xl ${item.certLink ? 'cursor-pointer' : ''}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/40 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                  {item.institution.toLowerCase().includes('hack4u') || item.title.toLowerCase().includes('certif') ? (
                    <Award className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-white transition-colors" />
                  ) : (
                    <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-white transition-colors" />
                  )}
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/5 text-zinc-500 border border-white/10">
                        {item.period || item.date}
                      </span>
                      {item.certCode && (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Validated
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl md:text-4xl font-black text-white group-hover:text-primary transition-colors leading-tight tracking-tighter uppercase mb-1">
                      {item.title}
                    </h3>
                    <p className="text-accent font-bold text-[11px] md:text-sm uppercase tracking-widest">
                      {item.institution}
                    </p>
                  </div>
                  
                  {item.certLink && (
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] text-white group-hover:bg-primary group-hover:border-primary transition-all w-fit">
                      Verify Badge
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="relative">
                  <p className="text-zinc-400 text-sm md:text-lg font-medium leading-relaxed mb-6 md:mb-8 max-w-4xl border-l-2 border-white/10 pl-5 md:pl-8 group-hover:border-primary/50 transition-colors">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-8 text-zinc-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-700" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Remote / Global</span>
                  </div>
                  {item.certCode && (
                    <div className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-tighter bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-white/5">
                      <span className="text-zinc-700 uppercase">id_spec:</span>
                      <span className="text-zinc-400">{item.certCode}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute top-6 md:top-10 right-6 md:right-10 text-6xl md:text-[10rem] font-black text-white/[0.01] pointer-events-none select-none leading-none group-hover:text-white/[0.03] transition-colors">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
