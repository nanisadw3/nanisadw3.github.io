"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Zap, FileText, Fingerprint, Shield, ArrowRight } from "lucide-react";

export default function About() {
  const { about } = portfolioData;

  const highlights = [
    {
      icon: Shield,
      title: "Security & Logic",
      text: "Cifrado extremo y protocolos seguros."
    },
    {
      icon: Zap,
      title: "Performance",
      text: "Optimización y baja latencia."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative bg-background px-4 md:px-0">
      <div className="container px-2 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 neo-blur group-hover:border-primary/50 transition-all duration-500">
              <img 
                src={about.imageUrl} 
                alt="Iñaki Sobera" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 p-4 md:p-6 neo-blur rounded-xl md:rounded-2xl border border-white/10 translate-y-2 md:translate-y-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">Identity Verified</p>
                    <p className="text-white font-bold text-xs md:text-sm">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8 justify-center md:justify-start">
              <div className="w-8 md:w-12 h-[2px] bg-primary" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">Biometric Profile</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-10 leading-[1] tracking-tighter text-center md:text-left">
              BEYOND THE <br />
              <span className="gradient-text">CODE.</span>
            </h2>

            <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
              {about.bio.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-400 text-base md:text-xl leading-relaxed font-medium text-center md:text-left">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              {highlights.map((item, idx) => (
                <div key={idx} className="bento-card group/item !p-5 md:!p-6">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-3 md:mb-4" />
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-2">{item.title}</h4>
                  <p className="text-zinc-500 text-[11px] font-bold leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
              <a 
                href={about.cvUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] transition-all hover:bg-primary hover:text-white"
              >
                <FileText className="w-4 h-4" />
                Capture CV
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 neo-blur border border-white/5 rounded-xl md:rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Systems Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
