"use client";

import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { useState } from "react";
import { Download, CheckCircle, ExternalLink, Copy } from "lucide-react";

export default function Education() {
  const { education } = portfolioData;
  const [activeStep, setActiveStep] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <Section id="education" title="Educación">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-12 relative max-w-2xl mx-auto overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
          {education.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className="relative z-10 flex flex-col items-center group flex-shrink-0 mx-2 sm:mx-0"
            >
              <motion.div
                animate={{
                  backgroundColor: activeStep === index ? "#2563eb" : "#18181b",
                  borderColor: activeStep === index ? "#3b82f6" : "#3f3f46",
                  scale: activeStep === index ? 1.2 : 1,
                }}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all group-hover:border-blue-400"
              >
                {index + 1}
              </motion.div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {education[activeStep].title}
                </h3>
                <p className="text-blue-400 font-medium">
                  {education[activeStep].institution} —{" "}
                  <em>{education[activeStep].period || education[activeStep].date}</em>
                </p>
              </div>

              <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                {education[activeStep].description}
              </p>

              {education[activeStep].certCode && (
                <div className="bg-black/40 border border-white/5 px-4 py-2 rounded-lg flex items-center gap-3">
                  <span className="text-zinc-500 text-sm">Código:</span>
                  <code className="text-blue-300 font-mono tracking-wider">
                    {education[activeStep].certCode}
                  </code>
                  <button
                    onClick={() => copyToClipboard(education[activeStep].certCode!)}
                    className="hover:text-white text-zinc-500 transition-colors"
                    title="Copiar código"
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
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all"
                  >
                    <Download className="w-5 h-5" /> Descargar Certificado
                  </a>
                )}
                {education[activeStep].verifyLink && (
                  <a
                    href={education[activeStep].verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl transition-all"
                  >
                    <CheckCircle className="w-5 h-5" /> Verificar Online
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-zinc-800">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-full text-white transition-all"
          >
            <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.9 }}>
              <ExternalLink className="w-5 h-5 rotate-180" />
            </motion.div>
          </button>
          
          <div className="text-zinc-500 text-sm font-medium">
            {activeStep + 1} / {education.length}
          </div>

          <button
            onClick={() => setActiveStep(Math.min(education.length - 1, activeStep + 1))}
            disabled={activeStep === education.length - 1}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-full text-white transition-all"
          >
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.9 }}>
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </button>
        </div>
      </div>
    </Section>
  );
}
