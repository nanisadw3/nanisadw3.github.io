import type { Lang } from "../i18n/ui.ts";

export const contact = {
  email: "yo@inakisobera.me",
  github: "https://github.com/nanisadw3",
  githubUser: "nanisadw3",
  linkedin: "https://www.linkedin.com/in/inakisobera/",
  x: "https://x.com/InakiSobera",
  cv: "/cv/cv_inaki_sobera.pdf",
  siteSource: "https://github.com/nanisadw3/nanisadw3.github.io",
} as const;

/** Which live number backs a specialty's evidence line (see src/data/live.json). */
export type Evidence = "xerebro" | "pypi" | "gordito";

export interface Specialty {
  path: string;
  title: string;
  text: string;
  project: { slug: string; name: string };
  evidence: Evidence;
}

export interface Profile {
  name: { first: string; last: string };
  role: string;
  summary: string;
  specialties: Specialty[];
  also: string;
  experience: { period: string; role: string; company: string; text: string }[];
  education: { period: string; title: string; place: string }[];
  certifications: { title: string; issuer?: string; file?: string; verifyUrl?: string }[];
  /** neofetch rows; values may contain {repos} which is replaced with the live repo count. */
  neofetch: [string, string][];
}

const oracleVerify =
  "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6D1FB7CBF3FBA537BBEDA88165A459092AB4323ECAD0D17D0900742075E69B19";
const hack4uVerify = "https://hack4u.io/check-certificate/";

export const profile: Record<Lang, Profile> = {
  es: {
    name: { first: "Iñaki", last: "Sobera Sotomayor" },
    role: "Ingeniero de IA · RAG y agentes en producción",
    summary:
      "Diseño y opero sistemas de IA que se pueden verificar: un RAG en producción en PEMEX y servidores MCP de código abierto que conectan agentes con datos oficiales.",
    specialties: [
      {
        path: "rag/",
        title: "RAG en producción",
        text: "Respuestas en lenguaje natural que citan su fuente, enrutamiento por intención y failover automático entre proveedores de LLM.",
        project: { slug: "xerebro", name: "Xerebro" },
        evidence: "xerebro",
      },
      {
        path: "mcp/",
        title: "Servidores MCP",
        text: "Conectar agentes de IA con datos y herramientas reales mediante Model Context Protocol, publicados y usados por otros.",
        project: { slug: "mcp-banxico", name: "mcp-banxico" },
        evidence: "pypi",
      },
      {
        path: "agentes/",
        title: "Agentes de IA",
        text: "Agentes que razonan y actúan con herramientas reales: sistema de archivos, web, navegador y servidores MCP.",
        project: { slug: "gordito", name: "Gordito" },
        evidence: "gordito",
      },
    ],
    also: "automatización con n8n y Python · infra: Docker, Nginx, systemd, Linux, Ollama",
    experience: [
      {
        period: "may 2026 — hoy",
        role: "Analista en Tecnologías de Operación",
        company: "PEMEX",
        text: "Diseñé y opero la plataforma RAG del Sistema Nacional de Refinación, con cascada de LLMs y failover; automatizo procesos con n8n, Python y Docker.",
      },
    ],
    education: [
      { period: "2026 — 2027", title: "Maestría en Dirección de Proyectos", place: "UNITEC · en curso" },
      { period: "2023 — 2026", title: "Ingeniería en Sistemas Computacionales", place: "UNITEC Atizapán" },
    ],
    certifications: [
      { title: "Oracle AI Foundations", file: "/cr/eCertificate.pdf", verifyUrl: oracleVerify },
      { title: "Linux avanzado", issuer: "Hack4u", file: "/cr/inaki_sobera_cr_linux.pdf", verifyUrl: hack4uVerify },
      { title: "Python ofensivo", issuer: "Hack4u", file: "/cr/inaki_sobera_cr_python.pdf", verifyUrl: hack4uVerify },
      { title: "GitHub Foundations" },
    ],
    neofetch: [
      ["OS", "Ingeniero de IA x86_64"],
      ["Host", "PEMEX · Tec. de Operación"],
      ["Kernel", "Ing. Sistemas · UNITEC"],
      ["Uptime", "3 años programando"],
      ["Packages", "{repos} (github), 1 (pypi)"],
      ["Shell", "zsh"],
      ["Editor", "Neovim"],
      ["Languages", "Python, Java, TS, SQL"],
      ["AI", "RAG, MCP, agentes, Ollama"],
      ["Infra", "Docker, Nginx, systemd"],
      ["Certs", "Oracle AI, Linux, GitHub"],
      ["Locale", "es_MX, en_US"],
    ],
  },
  en: {
    name: { first: "Iñaki", last: "Sobera Sotomayor" },
    role: "AI engineer · RAG and agents in production",
    summary:
      "I design and run AI systems you can verify: a production RAG at PEMEX and open-source MCP servers that connect agents to official data.",
    specialties: [
      {
        path: "rag/",
        title: "Production RAG",
        text: "Natural-language answers that cite their source, intent-based routing and automatic failover between LLM providers.",
        project: { slug: "xerebro", name: "Xerebro" },
        evidence: "xerebro",
      },
      {
        path: "mcp/",
        title: "MCP servers",
        text: "Connecting AI agents to real data and tools through the Model Context Protocol, published and used by others.",
        project: { slug: "mcp-banxico", name: "mcp-banxico" },
        evidence: "pypi",
      },
      {
        path: "agents/",
        title: "AI agents",
        text: "Agents that reason and act with real tools: file system, web, browser and MCP servers.",
        project: { slug: "gordito", name: "Gordito" },
        evidence: "gordito",
      },
    ],
    also: "automation with n8n and Python · infra: Docker, Nginx, systemd, Linux, Ollama",
    experience: [
      {
        period: "May 2026 — now",
        role: "Operations Technology Analyst",
        company: "PEMEX",
        text: "Designed and run the RAG platform of Mexico's National Refining System, with an LLM cascade and failover; I automate processes with n8n, Python and Docker.",
      },
    ],
    education: [
      { period: "2026 — 2027", title: "Master's in Project Management", place: "UNITEC · in progress" },
      { period: "2023 — 2026", title: "B.Eng. Computer Systems Engineering", place: "UNITEC Atizapán" },
    ],
    certifications: [
      { title: "Oracle AI Foundations", file: "/cr/eCertificate.pdf", verifyUrl: oracleVerify },
      { title: "Advanced Linux", issuer: "Hack4u", file: "/cr/inaki_sobera_cr_linux.pdf", verifyUrl: hack4uVerify },
      { title: "Offensive Python", issuer: "Hack4u", file: "/cr/inaki_sobera_cr_python.pdf", verifyUrl: hack4uVerify },
      { title: "GitHub Foundations" },
    ],
    neofetch: [
      ["OS", "AI Engineer x86_64"],
      ["Host", "PEMEX · Operations Tech"],
      ["Kernel", "Computer Systems Eng. · UNITEC"],
      ["Uptime", "3 years coding"],
      ["Packages", "{repos} (github), 1 (pypi)"],
      ["Shell", "zsh"],
      ["Editor", "Neovim"],
      ["Languages", "Python, Java, TS, SQL"],
      ["AI", "RAG, MCP, agents, Ollama"],
      ["Infra", "Docker, Nginx, systemd"],
      ["Certs", "Oracle AI, Linux, GitHub"],
      ["Locale", "es_MX, en_US"],
    ],
  },
};
