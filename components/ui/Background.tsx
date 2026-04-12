"use client";

import { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-[100] bg-[#050505]" />;

  return (
    <div className="fixed inset-0 -z-[100] bg-[#050505] overflow-hidden pointer-events-none">
      {/* 1. Malla Técnica muy visible */}
      <div 
        className="absolute inset-0 opacity-[0.25]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* 2. Grandes orbes de color Brillantes (Nebulosa) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/15 blur-[120px] rounded-full" />
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full" />

      {/* 3. Destellos de luz dinámicos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* 4. Ruido digital visible para textura */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          filter: 'contrast(150%) brightness(100%)'
        }} 
      />
    </div>
  );
}
