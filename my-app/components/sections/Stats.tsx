"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Section from "../ui/Section";
import { Github, Users, Calendar, Clock, Trophy, BarChart3 } from "lucide-react";

export default function Stats() {
  const [githubData, setGithubData] = useState<any>(null);

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
    { 
      label: "Seguidores", 
      value: githubData.followers, 
      Icon: Users, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10" 
    },
    { 
      label: "En GitHub desde", 
      value: new Date(githubData.created_at).getFullYear(), 
      Icon: Calendar, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10" 
    },
    { 
      label: "Última Actividad", 
      value: formatDate(githubData.updated_at), 
      Icon: Clock, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10" 
    },
    { 
      label: "Siguiendo", 
      value: githubData.following, 
      Icon: Github, 
      color: "text-zinc-400", 
      bg: "bg-zinc-500/10" 
    }
  ] : [];

  return (
    <Section id="stats" title="GitHub Insights">
      <div className="space-y-12">
        {/* Grid de Stats Detalladas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${stat.bg} border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center gap-4 hover:border-blue-500/30 transition-all group`}
            >
              <div className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de Medallas / Trophies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* GitHub Trophies */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center gap-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 self-start mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Medallas de Logros</h4>
            </div>
            
            <div className="w-full overflow-hidden rounded-2xl">
              <img 
                src="https://github-profile-trophy.vercel.app/?username=nanisadw3&theme=darkhub&no-frame=true&column=4&margin-w=15" 
                alt="GitHub Trophies"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-zinc-500 font-mono text-center">
              Basado en commits, PRs y actividad global en GitHub.
            </p>
          </motion.div>

          {/* GitHub Contribution Chart / Most Used Languages */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center gap-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 self-start mb-2">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Resumen de Ingeniería</h4>
            </div>
            
            <div className="w-full space-y-4">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=nanisadw3&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=3b82f6&text_color=94a3b8&icon_color=3b82f6" 
                alt="GitHub Stats Card"
                className="w-full h-auto"
              />
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=nanisadw3&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=10b981&text_color=94a3b8" 
                alt="Top Languages"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
