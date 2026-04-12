"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download, ShieldCheck, Cpu, Fingerprint, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { FadeIn, Reveal } from "../ui/Reveal";

export default function About() {
  const { about, hero } = portfolioData;
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Section id="about" title="Sobre Mí">
      <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
        
        {/* Digital ID Card Container */}
        <div 
          className="perspective-[1200px] select-none pt-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-72 h-[450px] shrink-0 group"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700" />

            <div className="relative w-full h-full bg-[#0a0a0a] backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col p-8 translate-z-[20px]">
              
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Verified Ops</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-blue-500/50" />
              </div>

              {/* Profile Image */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 group-hover:border-blue-500/30 transition-colors duration-500">
                <img
                  src={`/${about.imageUrl}`}
                  alt="Iñaki Sobera"
                  className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"
                />
              </div>

              <div className="mt-10 space-y-4 text-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    {hero.name.split(' ')[0]} <span className="text-zinc-500">{hero.name.split(' ')[1]}</span>
                  </h3>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    Systems Engineer
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 flex justify-between items-center border-t border-white/5">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Auth Protocol</span>
                  <span className="text-[9px] font-mono text-zinc-400 tracking-tighter uppercase">X-215488-CORE</span>
                </div>
                <Fingerprint className="w-5 h-5 text-zinc-700" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bio Content */}
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <Reveal delay={0.2}>
              <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">
                {about.title}
              </h3>
            </Reveal>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="h-1.5 bg-blue-600 rounded-full" 
            />
          </div>
          
          <div className="space-y-8 max-w-3xl">
            {about.bio.map((paragraph, index) => (
              <Reveal key={index} delay={0.3 + (index * 0.1)}>
                <p className="text-xl leading-relaxed text-zinc-400 font-light">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          
          <div className="pt-10 space-y-8">
            <FadeIn delay={0.6}>
              <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm group hover:border-blue-500/20 transition-all duration-500">
                <h4 className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Core Stack & Vision</h4>
                <p className="text-lg leading-relaxed text-zinc-300 font-light italic">
                  "{about.skillsSummary}"
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <div className="flex flex-wrap gap-8 items-center pt-4">
                <motion.a
                  href={`/${about.cvUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 text-white group"
                >
                  <div className="p-4 bg-white/5 rounded-full group-hover:bg-blue-600 transition-colors duration-500">
                    <Download className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-blue-400 transition-colors">Download Resume</span>
                    <span className="text-lg font-bold">Curriculum Vitae</span>
                  </div>
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
}
