"use client";

import { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const startScramble = () => {
      const length = text.length;
      queueRef.current = [];
      for (let i = 0; i < length; i++) {
        const from = "";
        const to = text[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queueRef.current.push({ from, to, start, end });
      }
      frameRef.current = 0;
      update();
    };

    const update = () => {
      let output = "";
      let complete = 0;
      const queue = queueRef.current;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end, char: existingChar } = queue[i];
        let char = existingChar;
        if (frameRef.current >= end) {
          complete++;
          output += to;
        } else if (frameRef.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete !== queue.length) {
        frameRef.current++;
        requestRef.current = requestAnimationFrame(update);
      }
    };

    const timer = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}
