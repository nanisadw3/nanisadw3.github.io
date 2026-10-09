import type { Lang } from "../i18n/ui.ts";

export const contact = {
  email: "yo@inakisobera.me",
  github: "https://github.com/nanisadw3",
  linkedin: "https://www.linkedin.com/in/inakisobera/",
  x: "https://x.com/InakiSobera",
  cv: "/cv/cv_inaki_sobera.pdf",
  siteSource: "https://github.com/nanisadw3/nanisadw3.github.io",
} as const;

export interface Metric {
  value: string;
  label: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: { title: string; text: string }[];
  tags: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  note?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  file?: string;
  verifyUrl?: string;
  code?: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: { lead: string; muted: string };
  intro: string;
  bio: string[];
  metrics: Metric[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: { group: string; items: string[] }[];
  languages: { name: string; level: string }[];
}

const certFiles = {
  oracle: "/cr/eCertificate.pdf",
  linux: "/cr/inaki_sobera_cr_linux.pdf",
  python: "/cr/inaki_sobera_cr_python.pdf",
};
const oracleVerify =
  "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6D1FB7CBF3FBA537BBEDA88165A459092AB4323ECAD0D17D0900742075E69B19";
const hack4uVerify = "https://hack4u.io/check-certificate/";

const stack = {
  ai: ["RAG", "Embeddings", "Qdrant", "MCP", "Ollama", "Gemini", "Groq", "OpenRouter", "OpenCV / YOLO"],
  backend: ["Python", "Flask", "Java", "Spring Boot", "SQL", "C#", "TypeScript", "Bash"],
  data: ["PostgreSQL", "SQL Server", "MySQL", "Redis", "Power BI"],
  infra: ["Linux", "Docker", "Nginx", "Gunicorn", "systemd", "GitHub Actions", "AWS S3", "n8n"],
};

export const profile: Record<Lang, Profile> = {
  es: {
    name: "Iñaki Sobera Sotomayor",
    role: "Ingeniero de software · IA y automatización",
    headline: { lead: "Construyo IA que", muted: "se puede auditar." },
    intro:
      "Ingeniero de software en PEMEX. Diseño sistemas RAG que responden citando su fuente y publico servidores MCP de código abierto que conectan agentes de IA con datos oficiales.",
    bio: [
      "Soy Ingeniero en Sistemas Computacionales por UNITEC y trabajo como Analista en Tecnologías de Operación en PEMEX. Ahí diseñé, construí y opero una plataforma RAG que responde preguntas en lenguaje natural sobre los reportes operativos del Sistema Nacional de Refinación.",
      "Me interesa la IA que se puede verificar: respuestas con fuente, datos con fecha de corte y sistemas que siguen funcionando cuando un proveedor falla. Fuera del trabajo publico herramientas abiertas alrededor del Model Context Protocol, como mcp-banxico, y contribuyo a proyectos de seguridad para agentes.",
      "Vengo del mundo Linux y backend, así que me siento cómodo de punta a punta: desde el pipeline de embeddings hasta Nginx, systemd y el certificado TLS.",
    ],
    metrics: [
      { value: "1.7k", label: "Descargas/mes · PyPI" },
      { value: "706", label: "Reportes en el RAG" },
      { value: "22", label: "Series diarias Banxico" },
      { value: "PR #35", label: "Aceptado en MCP Guard" },
    ],
    experience: [
      {
        role: "Analista en Tecnologías de Operación",
        company: "PEMEX",
        period: "May 2026 — actualidad",
        summary:
          "Automatización de procesos operativos, analítica de datos e IA aplicada para el área de tecnologías de operación.",
        highlights: [
          {
            title: "Plataforma RAG del SNR",
            text: "La diseñé y desplegué de punta a punta: 706 reportes vectorizados desde marzo de 2026 para responder en lenguaje natural sobre la operación de las refinerías, citando la fuente.",
          },
          {
            title: "Cascada de LLMs con failover",
            text: "Enrutamiento por intención (conceptual, operativa o híbrida) y cambio automático de proveedor ante errores de cuota, con menos llamadas innecesarias a la base vectorial.",
          },
          {
            title: "Automatización",
            text: "Flujos de IA en n8n y Python orquestados en Docker que reducen captura manual, más dashboards de Power BI que consolidan métricas operativas.",
          },
        ],
        tags: ["RAG", "Qdrant", "n8n", "Python", "Docker", "Power BI"],
      },
    ],
    education: [
      {
        title: "Maestría en Dirección de Proyectos",
        institution: "UNITEC",
        period: "2026 — actualidad",
        note: "Graduación esperada en 2027.",
      },
      {
        title: "Ingeniería en Sistemas Computacionales",
        institution: "UNITEC Campus Atizapán",
        period: "2023 — 2026",
        note: "Egresado, en proceso de titulación.",
      },
    ],
    certifications: [
      { title: "Oracle AI Foundations", issuer: "Oracle", date: "Oct 2025", file: certFiles.oracle, verifyUrl: oracleVerify },
      { title: "Administración Avanzada de Linux", issuer: "Hack4u.io", date: "Jul 2025", file: certFiles.linux, verifyUrl: hack4uVerify, code: "2154-4957-5308-3366" },
      { title: "Python Ofensivo", issuer: "Hack4u.io", date: "2024", file: certFiles.python, verifyUrl: hack4uVerify, code: "4240-5530-1286-1447" },
      { title: "GitHub Foundations", issuer: "GitHub", date: "2026" },
    ],
    skills: [
      { group: "IA", items: stack.ai },
      { group: "Backend", items: stack.backend },
      { group: "Datos", items: stack.data },
      { group: "Infraestructura", items: stack.infra },
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Avanzado" },
    ],
  },
  en: {
    name: "Iñaki Sobera Sotomayor",
    role: "Software engineer · AI and automation",
    headline: { lead: "I build AI that", muted: "can be audited." },
    intro:
      "Software engineer at PEMEX. I design RAG systems that answer citing their sources and publish open-source MCP servers that connect AI agents to official data.",
    bio: [
      "I hold a Computer Systems Engineering degree from UNITEC and work as an Operations Technology Analyst at PEMEX, Mexico's state oil company. There I designed, built and run a RAG platform that answers natural-language questions about the operational reports of the National Refining System.",
      "I care about AI you can verify: answers with sources, data with cut-off dates, and systems that keep working when a provider fails. Outside work I publish open tools around the Model Context Protocol, such as mcp-banxico, and contribute to security projects for agents.",
      "I come from Linux and backend, so I'm comfortable end to end: from the embeddings pipeline to Nginx, systemd and the TLS certificate.",
    ],
    metrics: [
      { value: "1.7k", label: "Downloads/mo · PyPI" },
      { value: "706", label: "Reports in the RAG" },
      { value: "22", label: "Daily Banxico series" },
      { value: "PR #35", label: "Merged in MCP Guard" },
    ],
    experience: [
      {
        role: "Operations Technology Analyst",
        company: "PEMEX",
        period: "May 2026 — present",
        summary:
          "Operational process automation, data analytics and applied AI for the operations technology area.",
        highlights: [
          {
            title: "Refining System RAG platform",
            text: "Designed and deployed it end to end: 706 reports vectorized since March 2026 to answer natural-language questions about refinery operations, citing the source.",
          },
          {
            title: "LLM cascade with failover",
            text: "Intent-based routing (conceptual, operational or hybrid) and automatic provider switching on quota errors, with fewer unnecessary vector-store calls.",
          },
          {
            title: "Automation",
            text: "AI workflows in n8n and Python orchestrated with Docker that cut manual data entry, plus Power BI dashboards consolidating operational metrics.",
          },
        ],
        tags: ["RAG", "Qdrant", "n8n", "Python", "Docker", "Power BI"],
      },
    ],
    education: [
      {
        title: "Master's in Project Management",
        institution: "UNITEC",
        period: "2026 — present",
        note: "Expected graduation in 2027.",
      },
      {
        title: "B.Eng. in Computer Systems Engineering",
        institution: "UNITEC Campus Atizapán",
        period: "2023 — 2026",
        note: "Coursework completed; degree in process.",
      },
    ],
    certifications: [
      { title: "Oracle AI Foundations", issuer: "Oracle", date: "Oct 2025", file: certFiles.oracle, verifyUrl: oracleVerify },
      { title: "Advanced Linux Administration", issuer: "Hack4u.io", date: "Jul 2025", file: certFiles.linux, verifyUrl: hack4uVerify, code: "2154-4957-5308-3366" },
      { title: "Offensive Python", issuer: "Hack4u.io", date: "2024", file: certFiles.python, verifyUrl: hack4uVerify, code: "4240-5530-1286-1447" },
      { title: "GitHub Foundations", issuer: "GitHub", date: "2026" },
    ],
    skills: [
      { group: "AI", items: stack.ai },
      { group: "Backend", items: stack.backend },
      { group: "Data", items: stack.data },
      { group: "Infrastructure", items: stack.infra },
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Advanced" },
    ],
  },
};
