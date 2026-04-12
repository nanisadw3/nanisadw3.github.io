"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import { Download, CheckCircle, ChevronLeft, ChevronRight, Copy, Award, ShieldCheck } from "lucide-react";
import { FadeIn, Reveal } from "../ui/Reveal";

export default function Education() {
  const { education } = portfolioData;
  const [activeStep, setActiveStep] = useState(0);
  const stepperRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (stepperRef.current && window.innerWidth < 640) {
      const activeElement = stepperRef.current.children[activeStep + 1] as HTMLElement;
      if (activeElement) {
        const scrollLeft = activeElement.offsetLeft - stepperRef.current.offsetWidth / 2 + activeElement.offsetWidth / 2;
        stepperRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeStep]);

  return (
    <Section id="education" title="Trayectoria Académica">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 sm:p-16 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Modern Stepper */}
        <div 
          ref={stepperRef}
          className="flex items-center mb-20 relative max-w-full overflow-x-auto sm:overflow-x-visible pb-10 sm:pb-0 scrollbar-hide snap-x snap-mandatory sm:justify-between sm:max-w-5xl sm:mx-auto relative z-10"
        >
          <div className="absolute top-[30px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-0 hidden sm:block" />
          
          <div className="flex-shrink-0 w-[10%] sm:hidden" />
          
          {education.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className="relative z-10 flex flex-col items-center group flex-shrink-0 px-6 sm:px-0 snap-center"
            >
              <motion.div
                animate={{
                  backgroundColor: activeStep === index ? "#fff" : "#0a0a0a",
                  borderColor: activeStep === index ? "#fff" : "#27272a",
                  scale: activeStep === index ? 1.1 : 1,
                }}
                className="w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500"
              >
                <span className={`text-sm font-black ${activeStep === index ? "text-black" : "text-zinc-500"}`}>
                  0{index + 1}
                </span>
              </motion.div>
              <motion.div
                initial={false}
                animate={{ 
                  opacity: activeStep === index ? 1 : 0,
                  y: activeStep === index ? 0 : 10
                }}
                className="absolute -bottom-8 whitespace-nowrap"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">
                  {item.period || item.date}
                </span>
              </motion.div>
            </button>
          ))}

          <div className="flex-shrink-0 w-[10%] sm:hidden" />
        </div>

        {/* Content Reveal */}
        <div className="relative min-h-[350px] px-4 flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center space-y-10 max-w-4xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Award className="w-5 h-5 text-zinc-600" />
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
                    {education[activeStep].title}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-zinc-900 border border-white/5 rounded-full">
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {education[activeStep].institution}
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-lg sm:text-2xl leading-relaxed font-light">
                {education[activeStep].description}
              </p>

              {education[activeStep].certCode && (
                <FadeIn delay={0.2}>
                  <div className="bg-black/60 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 group/id cursor-pointer" onClick={() => copyToClipboard(education[activeStep].certCode!)}>
                    <div className="flex flex-col items-start">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Certificate Authority</span>
                      <code className="text-zinc-300 font-mono text-xs sm:text-sm tracking-widest">
                        {education[activeStep].certCode}
                      </code>
                    </div>
                    <Copy className="w-4 h-4 text-zinc-700 group-hover/id:text-blue-400 transition-colors" />
                  </div>
                </FadeIn>
              )}

              <div className="flex flex-wrap justify-center gap-6 pt-6">
                {education[activeStep].certLink && (
                  <motion.a
                    href={`/${education[activeStep].certLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                    className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
                  >
                    <Download className="w-4 h-4" /> View Credential
                  </motion.a>
                )}
                {education[activeStep].verifyLink && (
                  <motion.a
                    href={education[activeStep].verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 px-8 py-4 text-blue-400 font-black uppercase tracking-widest text-[10px] group"
                  >
                    <ShieldCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="border-b border-blue-400/30 group-hover:border-blue-400 transition-colors">Verify Authenticity</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Controls */}
        <div className="flex justify-between items-center mt-16 pt-10 border-t border-white/5 z-10 relative">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="group p-4 bg-zinc-900 border border-white/5 disabled:opacity-10 rounded-2xl text-white transition-all hover:border-blue-500/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            {education.map((_, i) => (
              <div 
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${activeStep === i ? "w-12 bg-blue-500" : "w-4 bg-zinc-800"}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveStep(Math.min(education.length - 1, activeStep + 1))}
            disabled={activeStep === education.length - 1}
            className="group p-4 bg-zinc-900 border border-white/5 disabled:opacity-10 rounded-2xl text-white transition-all hover:border-blue-500/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Section>
  );
}
