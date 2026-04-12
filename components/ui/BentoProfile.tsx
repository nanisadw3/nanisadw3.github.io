"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { ShieldCheck, Cpu, Fingerprint, Activity, Github, Users, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubUserData {
  followers: number;
  public_repos: number;
}

export default function BentoProfile() {
  const { about, hero, skills, contact } = portfolioData;
  const [githubData, setGithubData] = useState<GitHubUserData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/nanisadw3`)
      .then(res => res.json())
      .then(data => setGithubData(data))
      .catch(err => console.error("Error Bento stats:", err));
  }, []);

  return (
    <section className="py-32 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto" id="about">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-6 md:grid-rows-4">
        
        {/* Main Identity (Big Card) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 md:row-span-2 glass-morphism rounded-[3rem] p-12 flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 font-display">System // Identity</span>
              </div>
              <Fingerprint className="w-6 h-6 text-zinc-800" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-10 mb-12">
              <div className="relative w-32 h-32 shrink-0">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                <img 
                  src={`/${about.imageUrl}`} 
                  alt="Iñaki" 
                  className="relative w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10" 
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-5xl font-black text-white tracking-tighter uppercase font-display leading-none mb-4">
                  {hero.firstName}<br/>{hero.lastName}
                </h3>
                <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Senior Systems Architect</p>
              </div>
            </div>
            
            <p className="text-xl leading-relaxed text-zinc-400 font-light max-w-2xl">
              {about.bio[0]}
            </p>
          </div>

          <div className="mt-12 pt-10 border-t border-white/5 relative z-10 flex flex-wrap gap-10 items-center justify-between">
            <div className="flex gap-6">
              <a href={contact.linkedin} target="_blank" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href={contact.github} target="_blank" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
            </div>
            <a 
              href={`/${about.cvUrl}`} 
              target="_blank" 
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all"
            >
              Access Protocol (CV)
            </a>
          </div>
        </motion.div>

        {/* Dynamic Activity Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 glass-morphism rounded-[3rem] p-10 flex flex-col justify-between group overflow-hidden bg-black/40"
        >
          <div className="flex items-center gap-4 mb-8">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display">Neural Pulse</h4>
          </div>
          
          <div className="flex-grow flex items-center justify-center py-6">
            <img 
              src="https://ghchart.rshah.org/3b82f6/nanisadw3" 
              alt="GitHub Pulse"
              className="w-full h-auto filter brightness-125 contrast-150 grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Efficiency</span>
              <span className="text-xs font-mono text-emerald-500">99.2%</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed italic">
              "Continuous delivery is the only standard for engineering excellence."
            </p>
          </div>
        </motion.div>

        {/* Tech Stack Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3 md:row-span-2 glass-morphism rounded-[3rem] p-12 group"
        >
          <div className="flex items-center gap-4 mb-10">
            <Cpu className="w-6 h-6 text-blue-500" />
            <h4 className="text-lg font-black text-white uppercase tracking-tighter font-display">Stack Infrastructure</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Backend Core</p>
              <div className="flex flex-wrap gap-2">
                {skills.backend.slice(0, 4).map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-zinc-400 font-bold">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Deployment</p>
              <div className="flex flex-wrap gap-2">
                {skills.devops.slice(0, 4).map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-zinc-400 font-bold">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quantitative Metrics Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-1 md:row-span-2 glass-morphism rounded-[3rem] p-8 flex flex-col items-center justify-center text-center group"
        >
          <div className="space-y-1">
            <p className="text-6xl font-black text-white tracking-tighter font-display group-hover:scale-110 transition-transform duration-500">
              {githubData?.public_repos || "30"}
            </p>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Nodes</p>
          </div>
          <div className="w-px h-12 bg-white/5 my-6" />
          <div className="space-y-1">
            <p className="text-2xl font-black text-zinc-500 tracking-tight font-display">SQL</p>
            <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Mastery</p>
          </div>
        </motion.div>

        {/* Security / Authority Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 glass-morphism rounded-[3rem] p-10 flex flex-col justify-between group overflow-hidden"
        >
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-display">Authorization</h4>
          </div>
          
          <div className="space-y-2">
            <p className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Security<br/>Clearance</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Level 4 // Offensive Ops</p>
          </div>

          <div className="relative h-12 flex items-center justify-center border-t border-white/5 mt-6">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Terminal className="w-5 h-5 text-zinc-800 relative z-10" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import { Linkedin } from "lucide-react";
