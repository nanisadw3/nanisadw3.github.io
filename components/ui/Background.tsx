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
      {/* 1. Base Gradient Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(10,25,60,0.5)_0%,transparent_100%)] opacity-40" />
      
      {/* 2. Professional Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} 
      />
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} 
      />

      {/* 3. Deep Cyber Ambient Orbs (More subtle and professional) */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-900/10 blur-[150px] rounded-full animate-pulse duration-[10s]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-900/5 blur-[150px] rounded-full animate-pulse duration-[15s]" />
      <div className="absolute top-[20%] right-[5%] w-[50%] h-[50%] bg-indigo-900/5 blur-[120px] rounded-full animate-pulse duration-[12s]" />

      {/* 4. Vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* 5. Professional Grain/Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          filter: 'contrast(120%) brightness(100%)'
        }} 
      />
      
      {/* 6. Scanlines effect (very subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%'
      }} />
    </div>
  );
}
