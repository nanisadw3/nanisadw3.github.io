"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = "default" | "typewriter" | "glitch" | "reveal" | "bounce";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  animationType?: AnimationType;
}

const titleVariants: Record<AnimationType, Variants> = {
  default: {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  },
  typewriter: {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "100%", 
      opacity: 1, 
      transition: { width: { duration: 1, ease: "easeInOut" }, opacity: { duration: 0.1 } } 
    }
  },
  glitch: {
    hidden: { x: 0, opacity: 0 },
    visible: {
      opacity: 1,
      x: [0, -5, 5, -5, 0],
      transition: { opacity: { duration: 0.5 }, x: { repeat: Infinity, duration: 0.2, repeatDelay: 3 } }
    }
  },
  reveal: {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  },
  bounce: {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  }
};

export default function Section({ children, id, className = "", title, animationType = "default" }: SectionProps) {
  return (
    <section id={id} className={`py-24 px-6 sm:px-10 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="flex flex-col items-center mb-20 overflow-hidden">
            <motion.h2
              variants={titleVariants[animationType]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl sm:text-6xl font-black mb-6 text-center text-white uppercase tracking-tighter leading-[1.1] sm:leading-none"
            >
              {title}
            </motion.h2>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]"
            />
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
