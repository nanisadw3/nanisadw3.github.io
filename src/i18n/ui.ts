export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

const es = {
  "nav.projects": "proyectos",
  "nav.github": "github",
  "nav.blog": "blog",
  "nav.terminal": "terminal",
  "nav.home": "inicio",
  "nav.switch": "English",
  "nav.skip": "Saltar al contenido",

  "hero.cv": "Descargar CV",
  "hero.scroll": "desliza para ver más",
  "hero.open": "abierto a roles de IA · remoto o presencial",
  "hero.followers": "seguidores",
  "hero.contrib": "contrib. este año",

  "home.ai": "Lo que hago en IA",
  "home.also": "también",
  "home.experience": "Experiencia",
  "home.education": "Educación",
  "home.certs": "certificaciones",
  "home.github": "En GitHub",
  "home.githubMore": "actividad completa",
  "home.blog": "Del blog",
  "home.blogMore": "todas las notas",
  "home.contactTitle": "¿Buscas a alguien para IA?",
  "home.contactText": "Estoy abierto a roles de IA, remotos o presenciales. Escríbeme y te respondo pronto.",
  "home.caseStudy": "ver caso de estudio",

  "gh.contributions": "contribuciones · 12 meses",
  "gh.prs": "PRs aceptados en otros proyectos",
  "gh.repos": "repositorios",
  "gh.stars": "estrellas",
  "gh.followers": "seguidores",
  "gh.languages": "Lenguajes",
  "gh.less": "menos",
  "gh.more": "más",
  "gh.title": "GitHub",
  "gh.intro": "Todo lo que construyo está en GitHub. Estos datos se actualizan solos todos los días.",
  "gh.activity": "Contribuciones del último año",
  "gh.external": "Contribuciones a otros proyectos",
  "gh.merged": "aceptado",
  "gh.top": "Repositorios",
  "gh.updated": "actualizado",
  "gh.profile": "Ver perfil en GitHub",
  "gh.since": "en GitHub desde",

  "projects.title": "Proyectos",
  "projects.intro":
    "Los tres proyectos que mejor muestran cómo trabajo, explicados a fondo. Abajo, el resto de lo que he construido.",
  "projects.more": "ver más proyectos",
  "projects.less": "ocultar",
  "projects.code": "código",
  "projects.demo": "demo",
  "projects.pypi": "pypi",
  "projects.video": "video",
  "projects.pr": "pull request",
  "projects.back": "Todos los proyectos",
  "projects.caseStudy": "Leer caso de estudio",
  "projects.live": "en vivo",

  "blog.title": "Blog",
  "blog.intro": "Notas sobre lo que aprendo construyendo con IA, MCP y RAG.",
  "blog.empty": "Las primeras notas vienen pronto.",
  "blog.back": "Todas las notas",
  "blog.read": "leer",

  "terminal.title": "Terminal",
  "terminal.intro": "Una forma distinta de conocerme. Escribe help o toca un comando.",
  "terminal.placeholder": "escribe un comando…",

  "bubble.open": "explorar",
  "bubble.projects": "3 proyectos a fondo",
  "bubble.github": "actividad completa",
  "bubble.blog": "notas técnicas",
  "bubble.terminal": "escribe help",

  "footer.made": "hecho con Astro",

  "notFound.title": "Esta página no existe",
  "notFound.text": "Puede que el enlace haya cambiado con el rediseño del sitio.",
  "notFound.home": "Ir al inicio",

  "meta.homeTitle": "Iñaki Sobera — Ingeniero de IA: RAG y agentes en producción",
  "meta.homeDescription":
    "Ingeniero de IA. Opero un RAG en producción en PEMEX y publico servidores MCP de código abierto como mcp-banxico. Abierto a roles de IA.",
  "meta.projectsDescription": "Proyectos de Iñaki Sobera: mcp-banxico, Xerebro (RAG en producción), Gordito y más.",
  "meta.githubDescription": "Actividad de Iñaki Sobera en GitHub: contribuciones, lenguajes, repositorios y PRs aceptados.",
  "meta.blogDescription": "Notas técnicas de Iñaki Sobera sobre IA aplicada, MCP y RAG.",
  "meta.terminalDescription": "Conoce a Iñaki Sobera desde una terminal interactiva.",
} as const;

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  "nav.projects": "projects",
  "nav.github": "github",
  "nav.blog": "blog",
  "nav.terminal": "terminal",
  "nav.home": "home",
  "nav.switch": "Español",
  "nav.skip": "Skip to content",

  "hero.cv": "Download CV",
  "hero.scroll": "scroll for more",
  "hero.open": "open to AI roles · remote or on-site",
  "hero.followers": "followers",
  "hero.contrib": "contrib. this year",

  "home.ai": "What I do in AI",
  "home.also": "also",
  "home.experience": "Experience",
  "home.education": "Education",
  "home.certs": "certifications",
  "home.github": "On GitHub",
  "home.githubMore": "full activity",
  "home.blog": "From the blog",
  "home.blogMore": "all notes",
  "home.contactTitle": "Looking for someone in AI?",
  "home.contactText": "I'm open to AI roles, remote or on-site. Drop me a line and I'll get back to you soon.",
  "home.caseStudy": "see case study",

  "gh.contributions": "contributions · 12 months",
  "gh.prs": "PRs merged in other projects",
  "gh.repos": "repositories",
  "gh.stars": "stars",
  "gh.followers": "followers",
  "gh.languages": "Languages",
  "gh.less": "less",
  "gh.more": "more",
  "gh.title": "GitHub",
  "gh.intro": "Everything I build lives on GitHub. These numbers refresh on their own every day.",
  "gh.activity": "Contributions in the last year",
  "gh.external": "Contributions to other projects",
  "gh.merged": "merged",
  "gh.top": "Repositories",
  "gh.updated": "updated",
  "gh.profile": "View GitHub profile",
  "gh.since": "on GitHub since",

  "projects.title": "Projects",
  "projects.intro":
    "The three projects that best show how I work, explained in depth. Below, the rest of what I've built.",
  "projects.more": "show more projects",
  "projects.less": "hide",
  "projects.code": "code",
  "projects.demo": "demo",
  "projects.pypi": "pypi",
  "projects.video": "video",
  "projects.pr": "pull request",
  "projects.back": "All projects",
  "projects.caseStudy": "Read case study",
  "projects.live": "live",

  "blog.title": "Blog",
  "blog.intro": "Notes on what I learn building with AI, MCP and RAG.",
  "blog.empty": "First notes are coming soon.",
  "blog.back": "All notes",
  "blog.read": "read",

  "terminal.title": "Terminal",
  "terminal.intro": "A different way to meet me. Type help or tap a command.",
  "terminal.placeholder": "type a command…",

  "bubble.open": "explore",
  "bubble.projects": "3 projects in depth",
  "bubble.github": "full activity",
  "bubble.blog": "technical notes",
  "bubble.terminal": "type help",

  "footer.made": "built with Astro",

  "notFound.title": "This page doesn't exist",
  "notFound.text": "The link may have changed with the site redesign.",
  "notFound.home": "Go home",

  "meta.homeTitle": "Iñaki Sobera — AI engineer: RAG and agents in production",
  "meta.homeDescription":
    "AI engineer. I run a production RAG system at PEMEX and publish open-source MCP servers like mcp-banxico. Open to AI roles.",
  "meta.projectsDescription": "Projects by Iñaki Sobera: mcp-banxico, Xerebro (production RAG), Gordito and more.",
  "meta.githubDescription": "Iñaki Sobera's GitHub activity: contributions, languages, repositories and merged PRs.",
  "meta.blogDescription": "Technical notes by Iñaki Sobera on applied AI, MCP and RAG.",
  "meta.terminalDescription": "Meet Iñaki Sobera through an interactive terminal.",
};

export const ui: Record<Lang, Record<UiKey, string>> = { es, en };

/** Path segments per language. Spanish lives at the root, English under /en. */
export const routes = {
  es: { prefix: "", projects: "proyectos", blog: "blog", github: "github", terminal: "terminal" },
  en: { prefix: "/en", projects: "projects", blog: "blog", github: "github", terminal: "terminal" },
} as const satisfies Record<Lang, Record<"prefix" | "projects" | "blog" | "github" | "terminal", string>>;
