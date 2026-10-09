import type { APIContext } from "astro";
import { blogFeed } from "../content/rss.ts";

export const GET = (context: APIContext) => blogFeed("es", context.site!);
