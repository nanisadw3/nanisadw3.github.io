"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/lib/data";

const navLinks = [
  { name: "Inicio", href: "#hero" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Portafolio", href: "#portfolio" },
  { name: "GitHub Insights", href: "#stats" },
  { name: "Educación", href: "#education" },
  { name: "Habilidades", href: "#skills" },
  { name: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { contact } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto max-w-fit pointer-events-auto flex items-center gap-2 p-2 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-zinc-900/40 backdrop-blur-md border-white/5"
        }`}
      >
        <a 
          href="#hero" 
          className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white font-black text-sm hover:scale-110 transition-transform"
        >
          IS
        </a>

        <div className="hidden md:flex items-center px-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-white/5 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block w-px h-4 bg-white/10 mx-2" />

        <div className="hidden md:flex items-center gap-1 pr-2">
          <a href={contact.github} target="_blank" className="p-2 text-gray-400 hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={contact.linkedin} target="_blank" className="p-2 text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${contact.email}`} className="p-2 text-gray-400 hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[calc(100%-3rem)] max-w-sm bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-center gap-6 py-2">
                <a href={contact.github} target="_blank" className="text-gray-400 hover:text-white"><Github /></a>
                <a href={contact.linkedin} target="_blank" className="text-gray-400 hover:text-white"><Linkedin /></a>
                <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-white"><Mail /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
