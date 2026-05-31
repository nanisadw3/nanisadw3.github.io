"use client";

import Navbar from "./Navbar";
import Background from "./ui/Background";
import ScrollToTop from "./ui/ScrollToTop";
import { LanguageProvider } from "@/lib/LanguageContext";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Background />
      <Navbar />
      <ScrollToTop />
      {children}
    </LanguageProvider>
  );
}
