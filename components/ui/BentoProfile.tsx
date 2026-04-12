"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { ShieldCheck, Cpu, Fingerprint, Activity, Github, Users, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubUserData {
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
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
    <section className="py-24 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {/* Profile Identity Card (Large) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 lg:col-span-3 row-span-2 glass-card rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Identity // Core</span>
              <Fingerprint className="w-5 h-5 text-zinc-700" />
            </div>
            <div className="flex items-center gap-8 mb-10">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border border-white/10 group-hover:border-blue-500 transition-colors duration-500">
                <img src={`/${about.imageUrl}`} alt="Iñaki" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{hero.name}</h3>
                <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Systems Engineer</p>
              </div>
            </div>
            <p className="text-xl leading-relaxed text-zinc-400 font-light">
              {about.bio[0]}
            </p>
          </div>

          <div className="mt-10 pt-10 border-t border-white/5 relative z-10 flex justify-between items-center">
            <div className="flex gap-4">
              <a href={contact.linkedin} target="_blank" className="p-3 glass rounded-xl hover:text-blue-400 transition-all" aria-label="LinkedIn"><Github className="w-4 h-4" /></a>
              <a href={contact.github} target="_blank" className="p-3 glass rounded-xl hover:text-blue-400 transition-all" aria-label="GitHub"><Users className="w-4 h-4" /></a>
            </div>
            <a href={`/${about.cvUrl}`} target="_blank" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Download CV</a>
          </div>
        </motion.div>

        {/* System Activity (Contribution Matrix) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 lg:col-span-3 glass-card rounded-[2.5rem] p-8 flex flex-col justify-between group overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Contribution Pulse</h4>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="w-full overflow-hidden rounded-2xl bg-black/20 p-4 border border-white/5 group-hover:border-emerald-500/20 transition-colors duration-500">
            <img 
              src="https://ghchart.rshah.org/3b82f6/nanisadw3" 
              alt="GitHub Contributions"
              className="w-full h-auto filter brightness-110 contrast-125 opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </motion.div>

        {/* Tech Stack (Skills Grid - Compact) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 lg:col-span-2 glass-card rounded-[2.5rem] p-8 flex flex-col group overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest">System Core</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.programming.slice(0, 4).map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default">{skill}</span>
            ))}
            {skills.tools.slice(0, 3).map(tool => (
              <span key={tool} className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-default">{tool}</span>
            ))}
          </div>
        </motion.div>

        {/* System Metrics (Small Cards) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 lg:col-span-1 glass-card rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-2 hover:border-blue-500/30 transition-all"
        >
          <p className="text-3xl font-black text-white tracking-tighter">{githubData?.public_repos || "30+"}</p>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-tight">Public<br/>Nodes</p>
        </motion.div>

        {/* Security / Certification Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:col-span-4 lg:col-span-3 glass-card rounded-[2.5rem] p-8 flex items-center justify-between group overflow-hidden"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:border-emerald-500 transition-colors">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Security Clearance</h4>
              <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-wider">Certified Linux & Offensive Python</p>
            </div>
          </div>
          <Terminal className="w-5 h-5 text-zinc-800" />
        </motion.div>

      </div>
    </section>
  );
}
