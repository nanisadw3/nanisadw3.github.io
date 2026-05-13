"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Code2, 
  BookOpen, 
  Mail, 
  ExternalLink 
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navItems = [
    { name: "Inicio", href: "#", icon: Home },
    { name: "Perfil", href: "#about", icon: User },
    { name: "Proyectos", href: "#portfolio", icon: Code2 },
    { name: "Especialidad", href: "#skills", icon: BookOpen },
    { name: "Contacto", href: "#contact", icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center pt-6"
    >
      <nav className={`flex items-center gap-10 px-8 py-3 rounded-2xl transition-all duration-500 ${
        isScrolled 
          ? "neo-blur shadow-[0_0_50px_rgba(0,0,0,0.5)] border-primary/20 scale-95" 
          : "bg-white/5 border border-white/10"
      }`}>
        <a href="#" className="flex items-center gap-3 group mr-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-[360deg] transition-transform duration-700">
            IS
          </div>
          <span className="hidden sm:block font-black text-sm tracking-widest text-white uppercase">
            Iñaki Sobera
          </span>
        </a>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all group flex items-center gap-2"
            >
              <item.icon className="w-3.5 h-3.5 sm:hidden" />
              <span className="hidden sm:inline">{item.name}</span>
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="ml-4 p-2.5 bg-white text-black rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group shadow-lg"
        >
          <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </a>
      </nav>
    </motion.header>
  );
}
