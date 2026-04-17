"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrambleText from "../effects/ScrambleText";
import GlitchCanvas from "../effects/GlitchCanvas";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Code2, Terminal, Cpu, Sparkles, Star, Code } from "lucide-react";

export default function Hero() {
  const { hero, contact } = portfolioData;
  const [githubStats, setGithubStats] = useState({ repos: 0, stars: 0, topLanguage: "" });

  useEffect(() => {
    fetch(`https://api.github.com/users/nanisadw3`)
      .then(res => res.json())
      .then(userData => {
        fetch(`https://api.github.com/users/nanisadw3/repos?per_page=100`)
          .then(res => res.json())
          .then(repos => {
            if (Array.isArray(repos)) {
              const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
              const langs: Record<string, number> = {};
              repos.forEach(repo => {
                if (repo.language) {
                  langs[repo.language] = (langs[repo.language] || 0) + 1;
                }
              });
              const topLang = Object.keys(langs).reduce((a, b) => langs[a] > langs[b] ? a : b, "Software");

              setGithubStats({
                repos: userData.public_repos,
                stars: totalStars,
                topLanguage: topLang
              });
            }
          });
      })
      .catch(err => console.error("Error Hero stats:", err));
  }, []);

  const floatingIcons = [
    { Icon: Code2, color: "text-blue-500", top: "20%", left: "15%", delay: 0 },
    { Icon: Terminal, color: "text-emerald-500", top: "60%", left: "10%", delay: 1 },
    { Icon: Cpu, color: "text-purple-500", top: "25%", right: "15%", delay: 0.5 },
    { Icon: Sparkles, color: "text-yellow-500", top: "65%", right: "12%", delay: 1.5 },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 1.5 }}
        className="absolute left-6 bottom-32 hidden lg:flex flex-col gap-6 z-20"
      >
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white hover:scale-125 transition-all" aria-label="GitHub Profile">
          <Github className="w-6 h-6" />
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white hover:scale-125 transition-all" aria-label="LinkedIn Profile">
          <Linkedin className="w-6 h-6" />
        </a>
        <div className="w-[1px] h-20 bg-zinc-800 mx-auto mt-2" />
      </motion.div>

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            delay: item.delay, 
            ease: "easeInOut" 
          }}
          style={{ top: item.top, left: item.left, right: item.right }}
          className={`absolute z-0 hidden md:block ${item.color}`}
          aria-hidden="true"
        >
          <item.Icon className="w-12 h-12 blur-[1px]" />
        </motion.div>
      ))}

      <div className="container px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 40, damping: 25, duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <Code className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
              Ingeniería en Sistemas Computacionales
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-6">
            <ScrambleText text={hero.name} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light"
          >
            {hero.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 1.2 }}
            className="flex flex-col items-center gap-12"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 inline-block focus:ring-2 focus:ring-blue-500 outline-none"
            >
              Contáctame
            </motion.a>

            <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-3xl border-t border-zinc-800/50 pt-12">
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-black text-white">{githubStats.repos || "..."}</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Proyectos</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <p className="text-2xl md:text-3xl font-black text-white">{githubStats.stars || "0"}</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Estrellas</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-black text-blue-400">{githubStats.topLanguage || "..."}</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Main Stack</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-zinc-800 rounded-full flex justify-center p-2 backdrop-blur-sm">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-2 bg-blue-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
