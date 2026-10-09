// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://inakisobera.me",
  trailingSlash: "ignore",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-MX", en: "en-US" } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
