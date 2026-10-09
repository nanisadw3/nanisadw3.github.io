export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

const es = {
  "nav.projects": "Proyectos",
  "nav.blog": "Blog",
  "nav.about": "Sobre mí",
  "nav.cv": "CV",
  "nav.menu": "Menú",
  "nav.switch": "English",

  "hero.ctaProjects": "Ver proyectos",
  "hero.ctaCv": "Descargar CV",

  "home.featured": "Proyectos destacados",
  "home.allProjects": "Todos los proyectos",
  "home.experience": "Experiencia",
  "home.writing": "Artículos",
  "home.allPosts": "Todos los artículos",
  "home.contact": "Contacto",

  "contact.title": "¿Hablamos?",
  "contact.text":
    "Si tienes un proyecto de IA, automatización o backend, o una vacante donde encaje, escríbeme. Respondo en uno o dos días.",

  "projects.title": "Proyectos",
  "projects.intro":
    "Sistemas de IA en producción, herramientas de código abierto y proyectos de aprendizaje. Los destacados tienen su caso de estudio completo.",
  "projects.featured": "Casos de estudio",
  "projects.more": "Más proyectos",

  "project.caseStudy": "Leer caso de estudio",
  "project.github": "Código",
  "project.demo": "Demo en vivo",
  "project.pypi": "PyPI",
  "project.video": "Video",
  "project.pr": "Pull request",
  "project.back": "Todos los proyectos",
  "project.links": "Enlaces",

  "blog.title": "Blog",
  "blog.intro": "Notas sobre IA aplicada, MCP, RAG y lo que voy aprendiendo al construir.",
  "blog.empty": "Los primeros artículos vienen pronto.",
  "blog.back": "Todos los artículos",

  "about.title": "Sobre mí",
  "about.experience": "Experiencia",
  "about.education": "Formación",
  "about.certs": "Certificaciones",
  "about.skills": "Stack",
  "about.languages": "Idiomas",
  "about.verify": "Verificar",
  "about.certificate": "Certificado (PDF)",
  "about.code": "Folio",

  "footer.rights": "Iñaki Sobera Sotomayor",
  "footer.source": "Código del sitio",

  "notFound.title": "Esta página no existe",
  "notFound.text": "Puede que el enlace haya cambiado con el rediseño del sitio.",
  "notFound.home": "Ir al inicio",

  "meta.homeTitle": "Iñaki Sobera — Ingeniero de software: IA, RAG y MCP",
  "meta.homeDescription":
    "Ingeniero de software en PEMEX. Construyo sistemas RAG que citan su fuente y servidores MCP de código abierto como mcp-banxico.",
  "meta.projectsDescription":
    "Proyectos de Iñaki Sobera: servidores MCP, sistemas RAG en producción, datos abiertos de Banxico y más.",
  "meta.blogDescription": "Artículos de Iñaki Sobera sobre IA aplicada, MCP y RAG.",
  "meta.aboutDescription":
    "Experiencia, formación, certificaciones y stack técnico de Iñaki Sobera Sotomayor.",
} as const;

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  "nav.projects": "Projects",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.cv": "CV",
  "nav.menu": "Menu",
  "nav.switch": "Español",

  "hero.ctaProjects": "See projects",
  "hero.ctaCv": "Download CV",

  "home.featured": "Featured projects",
  "home.allProjects": "All projects",
  "home.experience": "Experience",
  "home.writing": "Writing",
  "home.allPosts": "All posts",
  "home.contact": "Contact",

  "contact.title": "Let's talk",
  "contact.text":
    "If you have an AI, automation or backend project, or a role where I'd fit, drop me a line. I reply within a day or two.",

  "projects.title": "Projects",
  "projects.intro":
    "AI systems in production, open-source tools and learning projects. Featured ones have a full case study.",
  "projects.featured": "Case studies",
  "projects.more": "More projects",

  "project.caseStudy": "Read case study",
  "project.github": "Code",
  "project.demo": "Live demo",
  "project.pypi": "PyPI",
  "project.video": "Video",
  "project.pr": "Pull request",
  "project.back": "All projects",
  "project.links": "Links",

  "blog.title": "Blog",
  "blog.intro": "Notes on applied AI, MCP, RAG and what I learn while building.",
  "blog.empty": "First posts are coming soon.",
  "blog.back": "All posts",

  "about.title": "About",
  "about.experience": "Experience",
  "about.education": "Education",
  "about.certs": "Certifications",
  "about.skills": "Stack",
  "about.languages": "Languages",
  "about.verify": "Verify",
  "about.certificate": "Certificate (PDF)",
  "about.code": "ID",

  "footer.rights": "Iñaki Sobera Sotomayor",
  "footer.source": "Site source",

  "notFound.title": "This page doesn't exist",
  "notFound.text": "The link may have changed with the site redesign.",
  "notFound.home": "Go home",

  "meta.homeTitle": "Iñaki Sobera — Software engineer: AI, RAG and MCP",
  "meta.homeDescription":
    "Software engineer at PEMEX. I build RAG systems that cite their sources and open-source MCP servers like mcp-banxico.",
  "meta.projectsDescription":
    "Projects by Iñaki Sobera: MCP servers, production RAG systems, Banxico open data and more.",
  "meta.blogDescription": "Posts by Iñaki Sobera on applied AI, MCP and RAG.",
  "meta.aboutDescription":
    "Experience, education, certifications and tech stack of Iñaki Sobera Sotomayor.",
};

export const ui: Record<Lang, Record<UiKey, string>> = { es, en };

/** Path segments per language. Spanish lives at the root, English under /en. */
export const routes = {
  es: { prefix: "", projects: "proyectos", blog: "blog", about: "sobre-mi" },
  en: { prefix: "/en", projects: "projects", blog: "blog", about: "about" },
} as const satisfies Record<Lang, { prefix: string; projects: string; blog: string; about: string }>;
