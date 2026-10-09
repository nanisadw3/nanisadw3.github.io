import live from "./live.json";
import type { Lang } from "../i18n/ui.ts";

export interface RepoStat {
  url: string;
  description: string | null;
  stars: number;
  pushedAt: string;
  language: { name: string; color: string } | null;
}

export const github = live.github as typeof live.github & { repoStats: Record<string, RepoStat> };
export const pypi = live.pypi;
export const xerebro = live.xerebro;
export const banxico = live.banxico;

export function formatNumber(lang: Lang, n: number): string {
  return n.toLocaleString(lang === "es" ? "es-MX" : "en-US");
}

/** 1726 -> "1.7k" */
export function compact(n: number): string {
  return n >= 1000 ? `${(Math.round(n / 100) / 10).toString()}k` : String(n);
}

/** Total contributions per week, oldest first. */
export function weeklyTotals(days: [string, number][]): number[] {
  const weeks: number[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7).reduce((a, [, c]) => a + c, 0));
  }
  return weeks;
}

/**
 * Days for the last `weeks` calendar weeks. GitHub's calendar starts on a Sunday, so cutting at a
 * multiple of 7 keeps each column a Sunday-to-Saturday week (the current week may be partial).
 */
export function lastWeeks(days: [string, number][], weeks: number): [string, number][] {
  const start = (Math.ceil(days.length / 7) - weeks) * 7;
  return days.slice(Math.max(0, start));
}

export function relativeDays(lang: Lang, iso: string, now = new Date()): string {
  const days = Math.max(0, Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000));
  const rtf = new Intl.RelativeTimeFormat(lang === "es" ? "es-MX" : "en-US", { numeric: "auto" });
  if (days < 30) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.round(days / 30), "month");
  return rtf.format(-Math.round(days / 365), "year");
}

/** Short live evidence line for a project or specialty, e.g. "1.7k descargas/mes". */
export function evidenceText(lang: Lang, kind: "pypi" | "xerebro" | "gordito"): string {
  const es = lang === "es";
  if (kind === "pypi") return `${compact(pypi.lastMonth)} ${es ? "descargas/mes" : "downloads/mo"}`;
  if (kind === "xerebro") {
    return es
      ? `${formatNumber(lang, xerebro.daysWithReport)} días de reportes · ${xerebro.refineries.length} refinerías`
      : `${formatNumber(lang, xerebro.daysWithReport)} days of reports · ${xerebro.refineries.length} refineries`;
  }
  const stars = github.repoStats["Gordito_AI"]?.stars ?? 0;
  return es ? `Ollama + MCP · ★ ${stars}` : `Ollama + MCP · ★ ${stars}`;
}
