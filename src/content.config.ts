import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number(),
      featured: z.boolean().default(false),
      caseStudy: z.boolean().default(false),
      image: image(),
      imageAlt: z.string(),
      tags: z.array(z.string()),
      metric: z.string().optional(),
      role: z.string().optional(),
      /** A live number shown with the project, read from src/data/live.json. */
      live: z.enum(["pypi", "xerebro"]).optional(),
      /** Repository name under github.com/nanisadw3, for stars, language and last update. */
      repo: z.string().optional(),
      /** A public page built on the project that visitors can open right now. */
      liveSite: z.object({ url: z.url(), label: z.string(), text: z.string() }).optional(),
      links: z
        .object({
          github: z.url(),
          demo: z.url(),
          pypi: z.url(),
          video: z.url(),
          pr: z.url(),
        })
        .partial()
        .default({}),
    }),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
