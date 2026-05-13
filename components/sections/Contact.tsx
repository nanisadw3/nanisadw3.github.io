"use client";

import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Mail, Github, Linkedin, Send, ArrowUpRight, MessageSquare, Zap, Share2, Twitter } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { contact } = portfolioData;
  const [focused, setFocused] = useState<string | null>(null);

  const contactLinks = [
    {
      label: "Direct Mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "LinkedIn",
      value: "Iñaki Sobera",
      href: contact.linkedin,
      icon: Linkedin,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      label: "WhatsApp",
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace('+', '')}`,
      icon: MessageSquare,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-brutalist-grid opacity-10 pointer-events-none" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, -45, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-accent/15 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 w-fit backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Connection: Active</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85]">
              LET&apos;S <br />
              <span className="gradient-text">SYNC.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed mb-16 max-w-sm">
              Iniciemos una conversación sobre sistemas, arquitectura o innovación. El canal está abierto.
            </motion.p>

            <div className="space-y-4">
              {contactLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={link.href}
                  target="_blank"
                  whileHover={{ x: 15, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-between p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-500 shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl ${link.bg} transition-transform duration-500 group-hover:rotate-12`}>
                      <link.icon className={`w-7 h-7 ${link.color}`} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-1.5">{link.label}</p>
                      <p className="text-white font-bold text-lg tracking-tight">{link.value}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 350 }}
            whileInView={{ opacity: 1, y: 300 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative p-12 md:p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-hidden group/form shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover/form:opacity-[0.08] transition-opacity duration-700">
                <Share2 className="w-48 h-48 text-white rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Transmission Protocol</h3>
                </div>

                <form action={`https://api.web3forms.com/submit`} method="POST" className="space-y-10">
                  <input type="hidden" name="access_key" value={contact.web3FormsKey} />
                  
                  <div className="relative group/input">
                    <label className={`absolute left-8 transition-all duration-300 pointer-events-none font-black uppercase tracking-[0.4em] text-[10px] ${focused === 'name' ? '-top-3 text-primary bg-background px-4 py-1 rounded-full' : 'top-5 text-zinc-600'}`}>Identity</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      onFocus={() => setFocused('name')}
                      onBlur={(e) => !e.target.value && setFocused(null)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold"
                    />
                  </div>

                  <div className="relative group/input">
                    <label className={`absolute left-8 transition-all duration-300 pointer-events-none font-black uppercase tracking-[0.4em] text-[10px] ${focused === 'email' ? '-top-3 text-primary bg-background px-4 py-1 rounded-full' : 'top-5 text-zinc-600'}`}>Signal Source</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      onFocus={() => setFocused('email')}
                      onBlur={(e) => !e.target.value && setFocused(null)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold"
                    />
                  </div>

                  <div className="relative group/input">
                    <label className={`absolute left-8 transition-all duration-300 pointer-events-none font-black uppercase tracking-[0.4em] text-[10px] ${focused === 'message' ? '-top-3 text-primary bg-background px-4 py-1 rounded-full' : 'top-5 text-zinc-600'}`}>Payload Data</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      onFocus={() => setFocused('message')}
                      onBlur={(e) => !e.target.value && setFocused(null)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(139,92,246,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 group overflow-hidden relative shadow-xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Transmission
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                      style={{ mixBlendMode: 'difference' }}
                    />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { contact } = portfolioData;
  return (
    <footer className="py-16 bg-background relative overflow-hidden border-t border-white/5">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-primary transition-colors duration-500">
              <span className="text-primary font-black text-xl">IS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Iñaki Sobera</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-600">Engineering Portfolio</span>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-10">
            {[
              { icon: Github, href: contact.github },
              { icon: Linkedin, href: contact.linkedin },
              { icon: Twitter, href: contact.twitter }
            ].map((social, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -5, color: "#8b5cf6" }}
                href={social.href} 
                target="_blank" 
                className="text-zinc-600 transition-colors duration-300"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-1">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
            <p className="text-[8px] font-bold text-zinc-800 uppercase tracking-widest">
              Design & Dev by Sobera Labs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
