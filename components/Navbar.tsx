"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Briefcase,
  Code2, 
  BookOpen, 
  Mail, 
  ExternalLink,
  Globe
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navItems = [
    { name: t.ui.nav.home, href: "#", icon: Home },
    { name: t.ui.nav.profile, href: "#about", icon: User },
    { name: t.ui.nav.exp, href: "#experience", icon: Briefcase },
    { name: t.ui.nav.projects, href: "#portfolio", icon: Code2 },
    { name: t.ui.nav.skills, href: "#skills", icon: BookOpen },
    { name: t.ui.nav.contact, href: "#contact", icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center pt-6"
    >
      <nav className={`flex items-center justify-between sm:justify-start gap-2 sm:gap-10 px-4 sm:px-8 py-3 rounded-2xl transition-all duration-500 w-[calc(100%-2rem)] sm:w-auto ${
        isScrolled 
          ? "neo-blur shadow-[0_0_50px_rgba(0,0,0,0.5)] border-primary/20 scale-95" 
          : "bg-white/5 border border-white/10"
      }`}>
        <a href="#" className="flex items-center gap-3 group mr-0 sm:mr-4 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-[360deg] transition-transform duration-700">
            IS
          </div>
          <span className="hidden sm:block font-black text-sm tracking-widest text-white uppercase">
            Iñaki Sobera
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-2 py-2 sm:px-4 sm:py-2 text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-zinc-400 hover:text-white transition-all group flex items-center gap-2"
            >
              <item.icon className="w-3.5 h-3.5 sm:hidden" />
              <span className="hidden sm:inline">{item.name}</span>
              <span className="absolute bottom-0 left-2 right-2 sm:left-4 sm:right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-0 sm:ml-4 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer shadow-lg"
            title={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <Globe className="w-3 h-3 text-zinc-500" />
            <span>{language === "es" ? "EN" : "ES"}</span>
          </button>

          <a
            href="#contact"
            className="p-2.5 bg-white text-black rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group shadow-lg"
          >
            <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
