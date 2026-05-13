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
      text: "Cifrado extremo y protocolos de comunicación seguros."
    },
    {
      icon: Zap,
      title: "Performance",
      text: "Optimización de microservicios y baja latencia."
    }
  ];

  return (
    <section id="about" className="py-32 relative bg-background">
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Image Side (Bento Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 neo-blur group-hover:border-primary/50 transition-all duration-500">
              <img 
                src={about.imageUrl} 
                alt="Iñaki Sobera" 
                className="w-full h-full object-cover grayscale transition-all duration-700 scale-105 group-hover:scale-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-8 left-8 right-8 p-6 neo-blur rounded-2xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Fingerprint className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Identity Verified</p>
                    <p className="text-white font-bold text-sm">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Biometric Profile</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
              BEYOND THE <br />
              <span className="gradient-text">CODE.</span>
            </h2>

            <div className="space-y-8 mb-12">
              {about.bio.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {highlights.map((item, idx) => (
                <div key={idx} className="bento-card group/item !p-6">
                  <item.icon className="w-6 h-6 text-primary mb-4 transition-transform group-hover/item:rotate-12" />
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                  <p className="text-zinc-500 text-xs font-bold leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <a 
                href={about.cvUrl} 
                target="_blank"
                className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-primary hover:text-white"
              >
                <FileText className="w-4 h-4" />
                Capture CV
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-4 px-8 py-4 neo-blur border border-white/5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Systems Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
