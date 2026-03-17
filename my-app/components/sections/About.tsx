"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import Image from "next/image";
import { Download } from "lucide-react";

export default function About() {
  const { about } = portfolioData;

  return (
    <Section id="about" title="Sobre Mí">
      <div className="flex flex-col md:flex-row gap-12 items-center lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 shrink-0"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 -z-10 opacity-20 blur-xl animate-pulse" />
          <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl -rotate-3 -z-10" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
            <Image
              src={`/${about.imageUrl}`}
              alt="Iñaki Sobera"
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 256px, 320px"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-gray-300"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Perfil Profesional</h3>
          {about.bio.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          
          <div className="pt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Habilidades y Herramientas</h4>
            <p className="text-lg leading-relaxed mb-8">
              {about.skillsSummary}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-white font-medium">Abierto a nuevas oportunidades laborales:</span>
              <a
                href={`/${about.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl transition-all group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Descargar CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
