"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#030303] overflow-hidden pointer-events-none">
      {mounted && (
        <>
          {/* 1. Malla de Puntos (Dot Grid) */}
          <div 
            className="absolute inset-0 opacity-25" 
            style={{ 
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px' 
            }}
          />

          {/* 2. Nebulosas Animadas (Blobs) */}
          <motion.div
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -120, 120, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[-5%] left-[-5%] w-[70%] h-[70%] bg-blue-600/30 rounded-full blur-[120px]"
          />

          <motion.div
            animate={{
              x: [0, -100, 60, 0],
              y: [0, 120, -120, 0],
              scale: [1, 1.1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-emerald-600/25 rounded-full blur-[120px]"
          />

          {/* 3. Filtro de Grano */}
          <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* 4. Viñeta */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
        </>
      )}
    </div>
  );
}
