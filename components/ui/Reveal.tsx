"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const Reveal = ({ children, width = "fit-content", delay = 0.25 }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ 
          duration: 0.5, 
          delay, 
          ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smoother motion
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const FadeIn = ({ children, delay = 0, duration = 0.8 }: { children: React.ReactNode, delay?: number, duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ 
        duration, 
        delay, 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
    >
      {children}
    </motion.div>
  );
};
