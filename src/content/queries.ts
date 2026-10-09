import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui.ts";

type Entry = CollectionEntry<"projects"> | CollectionEntry<"blog">;

/** Entry ids look like "es/mcp-banxico"; the slug is the part after the language. */
export function slugOf(entry: Entry): string {
  return entry.id.split("/").slice(1).join("/");
}

function langOf(entry: Entry): string {
  return entry.id.split("/")[0];
}

export async function getProjects(lang: Lang) {
  const all = await getCollection("projects", (e) => langOf(e) === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts(lang: Lang) {
  const all = await getCollection(
    "blog",
    (e) => langOf(e) === lang && (import.meta.env.DEV || !e.data.draft),
  );
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Whether an entry with the same slug exists in the other language. */
export async function hasTranslation(
  collection: "projects" | "blog",
  lang: Lang,
  slug: string,
): Promise<boolean> {
  const entries = collection === "projects" ? await getProjects(lang) : await getPosts(lang);
  return entries.some((e) => slugOf(e) === slug);
}
