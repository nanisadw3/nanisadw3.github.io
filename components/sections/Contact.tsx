"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { FadeIn, Reveal } from "../ui/Reveal";

export default function Contact() {
  const { contact } = portfolioData;

  return (
    <Section id="contact" title="System Connection" className="bg-transparent">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        {/* Info Column */}
        <div className="lg:w-1/3 space-y-12">
          <div className="space-y-6">
            <Reveal delay={0.2}>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Transmission</h3>
            </Reveal>
            <p className="text-zinc-400 text-xl font-light leading-relaxed">
              Available for high-impact engineering projects and strategic technical collaborations.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { href: `mailto:${contact.email}`, icon: Mail, label: "Data Stream", value: contact.email, color: "text-blue-400" },
              { href: `https://wa.me/${contact.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}`, icon: MessageSquare, label: "Direct Comms", value: "WhatsApp Terminal", color: "text-emerald-400" }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.4 + i * 0.1}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/5 rounded-[2rem] hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{item.label}</p>
                    <p className="text-white font-bold tracking-tight">{item.value}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="flex-1 w-full bg-[#0a0a0a] border border-white/5 p-10 sm:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-10 relative z-10">
            <input type="hidden" name="access_key" value={contact.web3FormsKey} />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Identifier</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Subject Name"
                  required
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700 font-light"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Data Source</label>
                <input
                  type="email"
                  name="email"
                  placeholder="secure@connection.com"
                  required
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700 font-light"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Encrypted Message</label>
              <textarea
                name="message"
                placeholder="Initialize message sequence..."
                required
                rows={5}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700 resize-none font-light"
              />
            </div>

            <button
              type="submit"
              className="group relative flex items-center justify-center gap-4 w-full bg-white text-black font-black uppercase tracking-[0.3em] text-xs py-6 rounded-2xl transition-all hover:bg-blue-500 hover:text-white shadow-2xl active:scale-[0.98]"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Broadcast Signal
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

export function Footer() {
  const { contact } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-white/5 bg-[#020202] relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="container px-6 mx-auto flex flex-col items-center space-y-12 text-center">
        <div className="flex gap-8">
          {[
            { href: contact.github, icon: Github, label: "GitHub" },
            { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: contact.twitter, icon: Twitter, label: "Twitter" },
            { href: "https://gravatar.com/inakisobera8", icon: Globe, label: "Network" }
          ].map((item, i) => (
            <motion.a 
              key={i}
              href={item.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -5, scale: 1.1 }}
              className="p-4 glass rounded-2xl text-zinc-500 hover:text-white transition-all"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
        
        <div className="space-y-4">
          <p className="text-white font-black uppercase tracking-[0.5em] text-xs">Iñaki Sobera Sotomayor</p>
          <p className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
            Architecting the future of software with integrity and precision.
          </p>
          <p className="text-zinc-800 text-[8px] font-mono mt-10">
            &copy; {currentYear} {"//"} ALL RIGHTS RESERVED {"//"} SECURE CONNECTION
          </p>
        </div>
      </div>
    </footer>
  );
}
