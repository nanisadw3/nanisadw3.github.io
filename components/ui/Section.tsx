"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
}

export default function Section({ children, id, className = "", title }: SectionProps) {
  return (
    <section id={id} className={`py-24 px-6 sm:px-10 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="flex flex-col items-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl font-black mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-white to-emerald-500 uppercase tracking-tighter"
            >
              {title}
            </motion.h2>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              className="h-2 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]"
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
