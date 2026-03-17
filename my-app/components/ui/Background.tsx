"use client";

import { useEffect, useRef, useState } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const particleCount = isMobile ? 30 : 70;
    const connectionDistance = isMobile ? 90 : 160;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = isMobile ? "rgba(100, 160, 255, 0.4)" : "rgba(140, 200, 255, 0.8)"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      particles = Array.from({ length: particleCount }, () => new Particle(width, height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(width, height);
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const minDistSq = connectionDistance * connectionDistance;

          if (distSq < minDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = isMobile 
              ? `rgba(100, 160, 255, ${0.3 * (1 - dist / connectionDistance)})`
              : `rgba(140, 200, 255, ${0.4 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, isMobile]);

  return (
    <>
      {/* Fondo negro puro (En móviles se ve mucho mejor) */}
      <div className={`fixed inset-0 -z-[100] ${isMobile ? 'bg-black' : 'bg-[#020202]'}`} />
      
      {/* Canvas de partículas */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden ${isMobile ? '-z-50' : 'z-50'}`}>
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${isMobile ? 'opacity-30' : 'opacity-50'}`}
        />
        {/* Viñeta: Solo la dejamos en PC, en móviles a veces causa bandas de color */}
        {!isMobile && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
        )}
      </div>
    </>
  );
}
