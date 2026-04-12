"use client";

import { useEffect, useRef } from "react";

export default function GlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId: number;
    let letters: { char: string; color: string }[] = [];
    let grid = { columns: 0, rows: 0 };
    let lastGlitchTime = Date.now();

    const glitchColors = ["#2b4539", "#61dca3", "#61b3dc"];
    const glitchSpeed = 100;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789";
    const fontSize = 16;
    const charWidth = 12;
    const charHeight = 22;

    const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const calculateGrid = (width: number, height: number) => {
      const columns = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / charHeight);
      return { columns, rows };
    };

    const initializeLetters = (columns: number, rows: number) => {
      grid = { columns, rows };
      letters = Array.from({ length: columns * rows }, () => ({
        char: getRandomChar(),
        color: getRandomColor(),
      }));
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
    };

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = `${fontSize}px monospace`;
      context.textBaseline = "top";

      letters.forEach((letter, index) => {
        const x = (index % grid.columns) * charWidth;
        const y = Math.floor(index / grid.columns) * charHeight;
        context.fillStyle = letter.color;
        context.globalAlpha = 0.15;
        context.fillText(letter.char, x, y);
      });
    };

    const update = () => {
      const updateCount = Math.floor(letters.length * 0.01);
      for (let i = 0; i < updateCount; i++) {
        const index = Math.floor(Math.random() * letters.length);
        letters[index].char = getRandomChar();
        letters[index].color = getRandomColor();
      }
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastGlitchTime >= glitchSpeed) {
        update();
        draw();
        lastGlitchTime = now;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
}
