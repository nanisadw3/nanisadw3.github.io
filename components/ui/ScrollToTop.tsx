"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  
  // Smooth spring representation of the scroll progress
  const pathLength = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.3, rotate: -90, y: 40 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            y: 0,
            transition: { type: "spring", stiffness: 200, damping: 18 } 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.3, 
            rotate: 90, 
            y: 40, 
            transition: { duration: 0.3, ease: "easeInOut" } 
          }}
          whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-[#020205]/80 border border-white/10 hover:border-accent/50 text-white shadow-[0_0_30px_rgba(0,0,0,0.6)] cursor-pointer group backdrop-blur-md"
          aria-label="Volver al inicio"
        >
          {/* Circular Progress Path */}
          <svg className="absolute w-full h-full -rotate-90 select-none pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="4"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="transparent"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing pulse aura on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10" />

          {/* Icon */}
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 group-hover:text-accent transition-all duration-300 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
