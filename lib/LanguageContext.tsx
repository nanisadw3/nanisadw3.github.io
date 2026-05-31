"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolioDataEs, portfolioDataEn } from "./data";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof portfolioDataEs; // Typing it automatically with our ES structure
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  };

  const t = language === "es" ? portfolioDataEs : portfolioDataEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
