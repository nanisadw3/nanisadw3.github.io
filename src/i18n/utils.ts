import { defaultLang, languages, routes, ui, type Lang, type UiKey } from "./ui.ts";

export type PageKey = "home" | "projects" | "project" | "blog" | "post" | "github" | "terminal";

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  return first in languages ? (first as Lang) : defaultLang;
}

/** Path of a page in the given language, always with a trailing slash. */
export function localizePath(lang: Lang, page: PageKey, slug?: string): string {
  const r = routes[lang];
  const parts: Record<PageKey, string> = {
    home: "",
    projects: `${r.projects}/`,
    project: `${r.projects}/${slug}/`,
    blog: `${r.blog}/`,
    post: `${r.blog}/${slug}/`,
    github: `${r.github}/`,
    terminal: `${r.terminal}/`,
  };
  return `${r.prefix}/${parts[page]}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

export function formatDate(lang: Lang, date: Date): string {
  return date.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
