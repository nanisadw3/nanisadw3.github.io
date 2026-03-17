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
    <section id={id} className={`py-20 px-6 sm:px-10 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
}
