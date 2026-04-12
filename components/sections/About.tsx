"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Download } from "lucide-react";
import { useRef } from "react";

export default function About() {
  const { about, hero } = portfolioData;
  const cardRef = useRef<HTMLDivElement>(null);

  // Valores para la inclinación 3D (Muy sutil)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

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
        
        {/* Profile Image Frame (Clean & Professional) */}
        <div 
          className="perspective-[1000px] select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-72 h-[400px] sm:w-80 sm:h-[450px] shrink-0"
          >
            {/* Soft Background Glow */}
            <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] blur-3xl" />

            <div className="relative w-full h-full p-2 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden translate-z-[20px]">
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-zinc-900">
                <img
                  src={`/${about.imageUrl}`}
                  alt="Iñaki Sobera"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Minimal Label */}
                <div className="absolute bottom-8 left-0 w-full text-center">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    {hero.name.split(' ')[0]} <span className="text-zinc-500">{hero.name.split(' ')[1]}</span>
                  </h3>
                  <p className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mt-1">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-10"
        >
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white tracking-tight uppercase">Ingeniería de Sistemas</h3>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full" />
          </div>
          
          <div className="space-y-6 max-w-3xl">
            {about.bio.map((paragraph, index) => (
              <p key={index} className="text-xl leading-relaxed text-zinc-400 font-light italic">
                &quot;{paragraph}&quot;
              </p>
            ))}
          </div>
          
          <div className="pt-6 space-y-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-blue-500/20 transition-all duration-500">
              <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">Especialización Técnica</h4>
              <p className="text-lg leading-relaxed text-zinc-300">
                {about.skillsSummary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <motion.a
                href={`/${about.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-8 py-5 bg-white text-black rounded-2xl transition-all group font-bold shadow-xl"
              >
                <Download className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                Descargar Curriculum
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
