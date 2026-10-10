import type { Lang } from "../i18n/ui.ts";

export const contact = {
  email: "yo@inakisobera.me",
  /** WhatsApp number in international format, digits only (for wa.me links). */
  whatsapp: "525510310275",
  github: "https://github.com/nanisadw3",
  githubUser: "nanisadw3",
  linkedin: "https://www.linkedin.com/in/inakisobera/",
  x: "https://x.com/InakiSobera",
  cv: "/cv/cv_inaki_sobera.pdf",
  siteSource: "https://github.com/nanisadw3/nanisadw3.github.io",
} as const;

/** wa.me link that opens a chat with a greeting already typed in the visitor's language. */
export function whatsappUrl(lang: Lang): string {
  const text =
    lang === "es"
      ? "Hola Iñaki, vi tu página y me gustaría platicar contigo sobre una oportunidad en IA."
      : "Hi Iñaki, I saw your website and would like to talk with you about an AI opportunity.";
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

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
  experience: {
    period: string;
    role: string;
    company: string;
    text: string;
    highlights: { title: string; text: string }[];
    tags: string[];
  }[];
  education: { period: string; title: string; place: string; note?: string }[];
  certifications: { title: string; issuer?: string; date: string; file?: string; verifyUrl?: string }[];
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
        highlights: [
          {
            title: "Plataforma RAG del SNR, de punta a punta",
            text: "Responde en lenguaje natural sobre los reportes operativos de las siete refinerías, citando el reporte, la fecha y el turno de cada dato.",
          },
          {
            title: "Cascada de LLMs con failover",
            text: "Enrutamiento por intención (conceptual, operativa o híbrida) y cambio automático de proveedor ante errores de cuota.",
          },
          {
            title: "Automatización con IA",
            text: "Flujos en n8n y Python orquestados en Docker que reducen captura manual, y dashboards de Power BI con métricas operativas.",
          },
        ],
        tags: ["RAG", "Qdrant", "Gemini/Groq", "n8n", "Python", "Docker", "Power BI"],
      },
    ],
    education: [
      { period: "2026 — 2027", title: "Maestría en Dirección de Proyectos", place: "UNITEC", note: "En curso · graduación esperada en 2027. Gestión ágil, alcance, presupuesto y equipos multidisciplinarios." },
      { period: "2023 — 2026", title: "Ingeniería en Sistemas Computacionales", place: "UNITEC Campus Atizapán", note: "Egresado, en proceso de titulación. Proyecto destacado: videojuego con agentes controlados por IA." },
    ],
    certifications: [
      { title: "Oracle AI Foundations", issuer: "Oracle", date: "oct 2025", file: "/cr/eCertificate.pdf", verifyUrl: oracleVerify },
      { title: "Linux avanzado", issuer: "Hack4u", date: "jul 2025", file: "/cr/inaki_sobera_cr_linux.pdf", verifyUrl: hack4uVerify },
      { title: "Python ofensivo", issuer: "Hack4u", date: "2024", file: "/cr/inaki_sobera_cr_python.pdf", verifyUrl: hack4uVerify },
      { title: "GitHub Foundations", issuer: "GitHub", date: "2026" },
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
        highlights: [
          {
            title: "Refining System RAG platform, end to end",
            text: "Answers natural-language questions about the operational reports of all seven refineries, citing the report, date and shift behind each fact.",
          },
          {
            title: "LLM cascade with failover",
            text: "Intent-based routing (conceptual, operational or hybrid) and automatic provider switching on quota errors.",
          },
          {
            title: "AI automation",
            text: "n8n and Python workflows orchestrated with Docker that cut manual data entry, plus Power BI dashboards for operational metrics.",
          },
        ],
        tags: ["RAG", "Qdrant", "Gemini/Groq", "n8n", "Python", "Docker", "Power BI"],
      },
    ],
    education: [
      { period: "2026 — 2027", title: "Master's in Project Management", place: "UNITEC", note: "In progress · expected 2027. Agile management, scope, budget and cross-functional teams." },
      { period: "2023 — 2026", title: "B.Eng. Computer Systems Engineering", place: "UNITEC Campus Atizapán", note: "Coursework completed, degree in process. Highlight project: a game with AI-controlled agents." },
    ],
    certifications: [
      { title: "Oracle AI Foundations", issuer: "Oracle", date: "Oct 2025", file: "/cr/eCertificate.pdf", verifyUrl: oracleVerify },
      { title: "Advanced Linux", issuer: "Hack4u", date: "Jul 2025", file: "/cr/inaki_sobera_cr_linux.pdf", verifyUrl: hack4uVerify },
      { title: "Offensive Python", issuer: "Hack4u", date: "2024", file: "/cr/inaki_sobera_cr_python.pdf", verifyUrl: hack4uVerify },
      { title: "GitHub Foundations", issuer: "GitHub", date: "2026" },
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
