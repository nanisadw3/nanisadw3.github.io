"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { portfolioData } from "@/lib/data";
import { Mail, Phone, MessageSquare, Send, Github, Linkedin, Twitter, UserCircle } from "lucide-react";

export default function Contact() {
  const { contact } = portfolioData;

  return (
    <Section id="contact" title="Contacto" className="bg-transparent">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3 space-y-10"
        >
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">¡Hablemos!</h3>
            <p className="text-gray-400 text-lg">
              ¿Interesado en colaborar o tienes alguna pregunta? No dudes en escribirme por cualquiera de estos medios.
            </p>
          </div>

          <div className="space-y-6">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-5 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-blue-600/10 rounded-xl group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm text-zinc-500">Correo Electrónico</p>
                <p className="text-white font-medium">{contact.email}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all backdrop-blur-sm"
            >
              <div className="p-3 bg-emerald-600/10 rounded-xl group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm text-zinc-500">WhatsApp</p>
                <p className="text-white font-medium">Contáctame</p>
              </div>
            </a>

            <div className="group flex items-center gap-5 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
              <div className="p-3 bg-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm text-zinc-500">Teléfono</p>
                <p className="text-white font-medium">{contact.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full bg-zinc-900/50 border border-zinc-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-sm"
        >
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-8">
            <input type="hidden" name="access_key" value={contact.web3FormsKey} />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 px-1">Tu Nombre</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ej. Juan Pérez"
                  required
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 px-1">Tu Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  required
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-400 px-1">Mensaje</label>
              <textarea
                name="message"
                placeholder="¿En qué puedo ayudarte?"
                required
                rows={5}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Enviar Mensaje
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
    <footer className="py-12 border-t border-zinc-900 bg-transparent relative z-10">
      <div className="container px-6 mx-auto flex flex-col items-center space-y-8">
        <div className="flex gap-6">
          <a href={contact.github} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href={contact.linkedin} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href={contact.twitter} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="https://gravatar.com/inakisobera8" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
            <UserCircle className="w-6 h-6" />
          </a>
        </div>
        
        <p className="text-zinc-500 text-sm">
          &copy; {currentYear} Iñaki Sobera. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
