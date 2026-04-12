"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Section from "../ui/Section";
import { Github, Users, Calendar, Clock, Activity, Shield } from "lucide-react";
import { FadeIn } from "../ui/Reveal";

interface GitHubUserData {
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  public_repos: number;
}

export default function Stats() {
  const [githubData, setGithubData] = useState<GitHubUserData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/nanisadw3`)
      .then(res => res.json())
      .then(data => setGithubData(data))
      .catch(err => console.error("Error Stats section:", err));
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const statCards = githubData ? [
    { label: "Network", value: `${githubData.followers} Connections`, Icon: Users, color: "text-purple-400" },
    { label: "Legacy", value: `Since ${new Date(githubData.created_at).getFullYear()}`, Icon: Calendar, color: "text-emerald-400" },
    { label: "Active Ops", value: formatDate(githubData.updated_at), Icon: Clock, color: "text-blue-400" },
    { label: "Repositories", value: githubData.public_repos, Icon: Github, color: "text-zinc-400" }
  ] : [];

  return (
    <Section id="stats" title="System Insights">
      <div className="space-y-12">
        
        {/* Contributions Grid */}
        <FadeIn>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Contribution Matrix</h4>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Live Sync</span>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-black/40 p-6 text-center border border-white/5 relative z-10 group-hover:border-emerald-500/20 transition-colors duration-500">
              <img 
                src="https://ghchart.rshah.org/3b82f6/nanisadw3" 
                alt="GitHub Contributions Chart"
                className="w-full h-auto filter brightness-110 contrast-125 inline-block"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        {/* Numerical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center gap-6 hover:border-blue-500/30 hover:translate-y-[-5px] transition-all duration-500 group"
            >
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-500">
                <stat.Icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform duration-500`} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-white tracking-tighter">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Chart - Streak */}
        <div className="flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 flex flex-col gap-8 shadow-2xl w-full max-w-3xl group hover:border-blue-500/20 transition-all duration-700"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Commit Commitment</h4>
            </div>
            
            <div className="w-full overflow-hidden rounded-3xl bg-black/40 p-4 border border-white/5 group-hover:border-blue-500/10 transition-colors duration-500">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=nanisadw3&theme=dark&hide_border=true&background=00000000&stroke=3b82f6&ring=3b82f6&fire=3b82f6&currStreakLabel=3b82f6" 
                alt="GitHub Streak"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] whitespace-nowrap">
                Consistency is the key to engineering excellence
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
