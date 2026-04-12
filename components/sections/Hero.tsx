"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrambleText from "../effects/ScrambleText";
import GlitchCanvas from "../effects/GlitchCanvas";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Code2, Terminal, Cpu, Sparkles, Star } from "lucide-react";
import { Reveal, FadeIn } from "../ui/Reveal";

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
    { Icon: Code2, color: "text-blue-500/40", top: "15%", left: "10%", delay: 0 },
    { Icon: Terminal, color: "text-emerald-500/40", top: "70%", left: "15%", delay: 1 },
    { Icon: Cpu, color: "text-purple-500/40", top: "20%", right: "10%", delay: 0.5 },
    { Icon: Sparkles, color: "text-yellow-500/40", top: "60%", right: "15%", delay: 1.5 },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Hero Section">
      <GlitchCanvas />

      {/* Social Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 1.5 }}
        className="absolute left-8 bottom-32 hidden lg:flex flex-col gap-8 z-20"
      >
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 hover:scale-125 transition-all duration-300" aria-label="GitHub Profile">
          <Github className="w-6 h-6" />
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 hover:scale-125 transition-all duration-300" aria-label="LinkedIn Profile">
          <Linkedin className="w-6 h-6" />
        </a>
        <div className="w-[1px] h-24 bg-gradient-to-b from-zinc-800 to-transparent mx-auto mt-2" />
      </motion.div>

      {/* Floating Elements with organic motion */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.2, 0.5, 0.2]
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
          <item.Icon className="w-16 h-16 blur-[1px]" />
        </motion.div>
      ))}

      <div className="container px-6 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 mb-10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400/80">
                {hero.tagline}
              </span>
            </div>
          </FadeIn>

          <Reveal delay={0.4} width="100%">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              <ScrambleText text={hero.name} />
            </h1>
          </Reveal>

          <Reveal delay={0.6} width="100%">
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              {hero.summary}
            </p>
          </Reveal>

          <FadeIn delay={1.2}>
            <div className="flex flex-col items-center gap-16">
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest transition-all shadow-2xl hover:shadow-white/10 inline-block focus:ring-2 focus:ring-white outline-none"
                >
                  View Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-6 bg-transparent border border-white/10 text-white rounded-full font-black uppercase tracking-widest transition-all hover:bg-white/5 inline-block focus:ring-2 focus:ring-white outline-none"
                >
                  Get in Touch
                </motion.a>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-8 md:gap-20 max-w-4xl border-t border-zinc-800/30 pt-16">
                {[
                  { label: "Proyectos", value: githubStats.repos || "30+" },
                  { label: "Estrellas", value: githubStats.stars || "12", icon: Star },
                  { label: "Main Stack", value: githubStats.topLanguage || "Java/Python", color: "text-blue-400" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + (i * 0.1), type: "spring" }}
                    className="space-y-2 group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {stat.icon && <stat.icon className="w-4 h-4 text-yellow-500 fill-yellow-500 group-hover:scale-125 transition-transform" />}
                      <p className={`text-3xl md:text-4xl font-black text-white ${stat.color || ""}`}>
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold group-hover:text-zinc-300 transition-colors">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
