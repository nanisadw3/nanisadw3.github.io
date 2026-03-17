"use client";

import { motion } from "framer-motion";
import ScrambleText from "../effects/ScrambleText";
import GlitchCanvas from "../effects/GlitchCanvas";
import { portfolioData } from "@/lib/data";

export default function Hero() {
  const { hero } = portfolioData;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <GlitchCanvas />
      <div className="container px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
            <ScrambleText text={hero.name} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            {hero.summary.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 30px rgba(37, 99, 235, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.9 }}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 inline-block"
            >
              Contáctame
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-gray-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
