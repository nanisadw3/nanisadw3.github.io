"use client";

import { useEffect, useRef, useState } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const drawGrid = (width: number, height: number) => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 0.5;

      const gridSize = 50;
      const offsetX = (time * 10) % gridSize;
      const offsetY = (time * 10) % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawOrbs = (width: number, height: number) => {
      const orbs = [
        { x: 0.2, y: 0.3, r: 300, c: "rgba(37, 99, 235, 0.05)" },
        { x: 0.8, y: 0.7, r: 400, c: "rgba(16, 185, 129, 0.03)" },
        { x: 0.5, y: 0.5, r: 500, c: "rgba(59, 130, 246, 0.02)" }
      ];

      orbs.forEach(orb => {
        const x = (orb.x * width) + Math.sin(time * 0.5 + orb.x) * 50;
        const y = (orb.y * height) + Math.cos(time * 0.5 + orb.y) * 50;
        
        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        grad.addColorStop(0, orb.c);
        grad.addColorStop(1, "transparent");
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, width, height);
      
      time += 0.01;
      
      drawOrbs(width, height);
      drawGrid(width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <div className="fixed inset-0 -z-[100] bg-black overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
    </div>
  );
}
