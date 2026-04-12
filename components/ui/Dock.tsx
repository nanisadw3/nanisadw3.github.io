"use client";

import { motion, useScroll } from "framer-motion";
import { Home, User, Briefcase, Mail, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolioData } from "@/lib/data";

export default function Dock() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > lastScroll && latest > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScroll(latest);
    });
  }, [scrollY, lastScroll]);

  const navItems = [
    { icon: Home, label: "Home", href: "#hero" },
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Work", href: "#portfolio" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 glass-morphism rounded-full flex items-center gap-2"
    >
      {navItems.map((item, i) => (
        <a
          key={i}
          href={item.href}
          className="p-3 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 group relative"
          aria-label={item.label}
        >
          <item.icon className="w-5 h-5" />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {item.label}
          </span>
        </a>
      ))}
      <div className="w-px h-6 bg-white/10 mx-2" />
      <a 
        href={`/${portfolioData.about.cvUrl}`} 
        target="_blank" 
        className="p-3 text-blue-500 hover:bg-blue-500/10 rounded-full transition-all"
        aria-label="Resume"
      >
        <FileText className="w-5 h-5" />
      </a>
    </motion.div>
  );
}
