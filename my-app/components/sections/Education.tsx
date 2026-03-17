"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import { Download, CheckCircle, ChevronLeft, ChevronRight, Copy } from "lucide-react";

export default function Education() {
  const { education } = portfolioData;
  const [activeStep, setActiveStep] = useState(0);
  const stepperRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Scroll automático al paso activo en móviles
  useEffect(() => {
    if (stepperRef.current) {
      const activeElement = stepperRef.current.children[activeStep + 1] as HTMLElement;
      if (activeElement) {
        const scrollLeft = activeElement.offsetLeft - stepperRef.current.offsetWidth / 2 + activeElement.offsetWidth / 2;
        stepperRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeStep]);

  return (
    <Section id="education" title="Educación">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Stepper Header Optimizado */}
        <div 
          ref={stepperRef}
          className="flex items-center mb-12 relative max-w-full overflow-x-auto pb-6 sm:pb-2 scrollbar-hide snap-x snap-mandatory"
        >
          {/* Línea de fondo */}
          <div className="absolute top-[40px] left-0 min-w-full h-0.5 bg-zinc-800 z-0" />
          
          {/* Espaciador inicial para centrar el primer elemento en scroll */}
          <div className="flex-shrink-0 w-[10%]" />
          
          {education.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className="relative z-10 flex flex-col items-center group flex-shrink-0 px-4 sm:px-8 py-4 snap-center"
            >
              <motion.div
                animate={{
                  backgroundColor: activeStep === index ? "#2563eb" : "#18181b",
                  borderColor: activeStep === index ? "#3b82f6" : "#3f3f46",
                  scale: activeStep === index ? 1.2 : 1,
                  boxShadow: activeStep === index ? "0 0 20px rgba(37,99,235,0.4)" : "0 0 0px rgba(0,0,0,0)",
                }}
                className="w-12 h-12 aspect-square rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all group-hover:border-blue-400"
              >
                {index + 1}
              </motion.div>
              <motion.span 
                animate={{ opacity: activeStep === index ? 1 : 0.4 }}
                className="text-[10px] mt-2 font-black uppercase tracking-widest text-zinc-500"
              >
                Paso {index + 1}
              </motion.span>
            </button>
          ))}

          {/* Espaciador final */}
          <div className="flex-shrink-0 w-[10%]" />
        </div>

        {/* Content Area */}
        <div className="relative min-h-[300px] px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-xl sm:text-3xl font-bold text-white px-2">
                  {education[activeStep].title}
                </h3>
                <div className="inline-block px-4 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full">
                  <p className="text-blue-400 text-sm font-medium">
                    {education[activeStep].institution} —{" "}
                    <em>{education[activeStep].period || education[activeStep].date}</em>
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                {education[activeStep].description}
              </p>

              {education[activeStep].certCode && (
                <div className="bg-black/40 border border-white/5 px-4 py-2 rounded-lg flex items-center gap-3">
                  <span className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider font-bold">ID:</span>
                  <code className="text-blue-300 font-mono text-xs sm:text-sm tracking-wider">
                    {education[activeStep].certCode}
                  </code>
                  <button
                    onClick={() => copyToClipboard(education[activeStep].certCode!)}
                    className="hover:text-blue-400 text-zinc-500 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {education[activeStep].certLink && (
                  <a
                    href={`/${education[activeStep].certLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm sm:text-base rounded-xl transition-all shadow-lg"
                  >
                    <Download className="w-5 h-5" /> Certificado
                  </a>
                )}
                {education[activeStep].verifyLink && (
                  <a
                    href={education[activeStep].verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm sm:text-base border border-blue-500/30 rounded-xl transition-all"
                  >
                    <CheckCircle className="w-5 h-5" /> Verificar
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Optimizado */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-zinc-800">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="group flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed rounded-xl text-white transition-all border border-transparent hover:border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-bold hidden sm:inline">Anterior</span>
          </button>
          
          {/* Indicador de puntos (Dots) - Más compacto en móvil */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {education.map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeStep === i ? "w-6 bg-blue-500" : "bg-zinc-700"}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveStep(Math.min(education.length - 1, activeStep + 1))}
            disabled={activeStep === education.length - 1}
            className="group flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed rounded-xl text-white transition-all border border-transparent hover:border-white/10"
          >
            <span className="text-sm font-bold hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
