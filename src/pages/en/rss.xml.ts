import type { APIContext } from "astro";
import { blogFeed } from "../../content/rss.ts";

export const GET = (context: APIContext) => blogFeed("en", context.site!);
