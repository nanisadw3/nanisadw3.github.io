import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://inakisobera.me/", changeFrequency: "monthly", priority: 1 },
    { url: "https://inakisobera.me/mcp-banxico/", changeFrequency: "monthly", priority: 0.8 },
  ];
}
