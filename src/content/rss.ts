import rss from "@astrojs/rss";
import type { Lang } from "../i18n/ui.ts";
import { localizePath, t } from "../i18n/utils.ts";
import { getPosts, slugOf } from "./queries.ts";

export async function blogFeed(lang: Lang, site: URL) {
  const posts = await getPosts(lang);
  return rss({
    title: `Iñaki Sobera — ${t(lang, "blog.title")}`,
    description: t(lang, "meta.blogDescription"),
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: localizePath(lang, "post", slugOf(post)),
    })),
    customData: `<language>${lang === "es" ? "es-mx" : "en-us"}</language>`,
  });
}
