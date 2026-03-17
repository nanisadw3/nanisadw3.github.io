"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./Navbar";
import Background from "./ui/Background";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <Background />
      <Navbar />
      {children}
    </>
  );
}
