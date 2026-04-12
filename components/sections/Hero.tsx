"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrambleText from "../effects/ScrambleText";
import GlitchCanvas from "../effects/GlitchCanvas";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Star, Terminal, Shield, Cpu, Activity } from "lucide-react";
import { Reveal, FadeIn } from "../ui/Reveal";

export default function Hero() {
  const { hero, contact } = portfolioData;
  const [githubStats, setGithubStats] = useState({ repos: 0, stars: 0 });

  useEffect(() => {
    fetch(`https://api.github.com/users/nanisadw3`)
      .then(res => res.json())
      .then(userData => {
        fetch(`https://api.github.com/users/nanisadw3/repos?per_page=100`)
          .then(res => res.json())
          .then(repos => {
            if (Array.isArray(repos)) {
              const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
              setGithubStats({
                repos: userData.public_repos,
                stars: totalStars,
              });
            }
          });
      })
      .catch(err => console.error("Error Hero stats:", err));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid" aria-label="Hero Section">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <GlitchCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#020202]" />
      </div>

      {/* Floating Status Bar (Top) */}
      <div className="absolute top-10 left-0 w-full px-10 flex justify-between items-center z-20">
        <FadeIn delay={0.5}>
          <div className="flex items-center gap-4 px-4 py-2 glass rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">System Online // v2.0.26</span>
          </div>
        </FadeIn>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "LATENCY", value: "24ms" },
            { label: "UPTIME", value: "99.9%" },
            { label: "ENCRYPTION", value: "AES-256" }
          ].map((item, i) => (
            <FadeIn key={i} delay={0.6 + i * 0.1}>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-zinc-600 tracking-[0.2em]">{item.label}</span>
                <span className="text-[10px] font-mono text-blue-500 font-bold">{item.value}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="container px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          
          <Reveal delay={0.2} width="100%">
            <span className="inline-block text-blue-500 font-black uppercase tracking-[0.5em] text-xs mb-6 px-4 py-1 border-l border-r border-blue-500/30">
              {hero.tagline}
            </span>
          </Reveal>

          <Reveal delay={0.4} width="100%">
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white mb-10 leading-[0.85] uppercase">
              <ScrambleText text={hero.name.split(' ')[0]} /><br/>
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                <ScrambleText text={hero.name.split(' ')[1]} />
              </span>
            </h1>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center mt-10">
            <div className="lg:col-span-4 text-left order-2 lg:order-1">
              <FadeIn delay={0.8}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20 group-hover:border-blue-500 transition-colors">
                      <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Focus</p>
                      <p className="text-sm font-bold text-white tracking-wide uppercase">Backend Engineering</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="p-3 bg-emerald-600/10 rounded-xl border border-emerald-500/20 group-hover:border-emerald-500 transition-colors">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Security Core</p>
                      <p className="text-sm font-bold text-white tracking-wide uppercase">Infrastructure Defense</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
              <FadeIn delay={1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <a 
                    href="#portfolio"
                    className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-white/10 flex flex-col items-center justify-center gap-4 glass group-hover:border-blue-500 transition-all duration-700"
                  >
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                      <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Initiate Sequence</span>
                  </a>
                </motion.div>
              </FadeIn>
            </div>

            <div className="lg:col-span-4 text-right order-3">
              <FadeIn delay={1.2}>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-4 mb-4">
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:text-blue-400 hover:border-blue-500/50 transition-all">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:text-blue-400 hover:border-blue-500/50 transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Available for projects</p>
                  <p className="text-xl font-black text-white uppercase tracking-tighter">Remote // Global</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Sidebar Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <FadeIn delay={1.5}>
          <div className="space-y-4">
            <div className="w-px h-20 bg-gradient-to-t from-blue-500 to-transparent mx-auto" />
            <span className="text-[8px] font-mono text-zinc-700 [writing-mode:vertical-lr] tracking-[0.5em] uppercase">Architecture // Security // AI</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
