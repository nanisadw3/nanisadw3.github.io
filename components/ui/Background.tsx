"use client";

import { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-[100] bg-[#020202]" />;

  return (
    <div className="fixed inset-0 -z-[100] bg-[#020202] overflow-hidden pointer-events-none">
      {/* Cuadrícula Principal - Claramente visible */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />

      {/* Puntos de intersección */}
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />

      {/* Orbes de luz de fondo para dar profundidad */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Textura de ruido para acabado premium */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
      
      {/* Viñeta para centrar la atención */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)]" />
    </div>
  );
}
