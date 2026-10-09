# Rediseño en Astro — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el portafolio Next.js por un sitio Astro multipágina, bilingüe y sobrio (estilo "B + métricas de C").

**Architecture:** Astro estático con colecciones de contenido Markdown (`projects`, `blog`) y datos de perfil en módulos TS por idioma. Cada página ES/EN es un archivo delgado que renderiza una "vista" compartida (`src/views/*.astro`) con `lang` como prop, para no duplicar marcado. Sin JS de cliente salvo el menú móvil.

**Tech Stack:** Astro 7.3, Tailwind CSS 4.3 (`@tailwindcss/vite`), `@tailwindcss/typography`, `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/check`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`, Node ≥ 22.12.

**Spec:** `docs/superpowers/specs/2026-10-09-astro-redesign-design.md`

## Global Constraints

- Node ≥ 22.12 (requisito de Astro 7); CI usa Node 22.
- Colores: fondo `#09090b`, superficie `#18181b`, borde `#27272a`, texto `#fafafa` / `#a1a1aa` / `#71717a`, acento único `#34d399`.
- Fuentes: Inter (texto), JetBrains Mono (métricas, etiquetas, fechas, código).
- Nada de glitch, partículas, texto cifrado ni contenido que dependa de animación para verse; respetar `prefers-reduced-motion`.
- Correo público: `yo@inakisobera.me`. Sin formulario de contacto.
- Rutas que no pueden romperse: `/mcp-banxico/`, `/cv/cv_inaki_sobera.pdf`, `/cr/*.pdf`, `/og-image.jpg`, `/googlee4033e5a981dc905.html`, `CNAME`.
- Ningún dato inventado: todo texto de proyectos/experiencia sale de los README, del CV (`public/cv/cv_inaki_sobera.pdf`) o de `lib/data.ts` actual.
- Trabajo solo en la rama local `astro`. **No hacer push ni merge.**

---

## Estructura de archivos

```
astro.config.mjs              config: site, i18n, integraciones, vite tailwind
package.json / tsconfig.json  scripts: dev, build, preview, check, test
src/styles/global.css         Tailwind + tokens de color/fuente + estilos .prose
src/i18n/ui.ts                textos de UI por idioma y mapa de rutas ES↔EN
src/i18n/utils.ts             helpers puros: t(), localizePath(), altPath()
src/i18n/utils.test.ts        tests node:test de los helpers
src/data/profile.ts           perfil, métricas, experiencia, formación, certs, stack, contacto (es/en)
src/content.config.ts         colecciones projects y blog (glob loader + zod)
src/content/projects/{es,en}/*.md
src/content/blog/es/*.md
src/assets/projects/*.jpg     imágenes optimizadas por astro:assets
src/layouts/BaseLayout.astro  <head> SEO, Nav, Footer, slot
src/components/*.astro        Nav, Footer, Hero, Metrics, ProjectCard, ProjectRow,
                              ExperienceItem, PostItem, ContactLinks, Section
src/views/*.astro             HomeView, ProjectsView, ProjectView, BlogView, PostView, AboutView
src/pages/...                 rutas ES; src/pages/en/... rutas EN; rss.xml.ts; 404.astro
scripts/check-links.mjs       verificador de enlaces internos sobre dist/
.github/workflows/deploy.yml  build Astro → gh-pages
```

---

### Task 1: Reemplazar Next.js por el esqueleto de Astro

**Files:**
- Delete: `app/`, `components/`, `lib/`, `out/`, `next.config.ts`, `next-env.d.ts`, `components.json`, `eslint.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.tsbuildinfo`, `package-lock.json`, imágenes de `public/` no usadas
- Move: `public/images/{mcp-banxico,rag-xerebro,banxico-datos,mcp-guard,Agente_gordito,MCP,pokemon,Rentas,yolo,api_nasa,inteligentes,chat,Spotify}.*` → `src/assets/projects/`; `public/images/yo.png` → `src/assets/yo.png`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro` (temporal)

- [ ] **Step 1:** Antes de borrar, copiar `lib/data.ts` a `/tmp/.../scratchpad/old-data.ts` como referencia de contenido.
- [ ] **Step 2:** Borrar archivos de Next y mover imágenes con `git mv`.
- [ ] **Step 3:** `package.json`:

```json
{
  "name": "inakisobera-me",
  "type": "module",
  "private": true,
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "node --test src/i18n/utils.test.ts && node scripts/check-links.mjs"
  }
}
```

Instalar: `npm i astro @astrojs/sitemap @astrojs/rss @tailwindcss/vite tailwindcss @tailwindcss/typography @fontsource-variable/inter @fontsource-variable/jetbrains-mono` y `npm i -D @astrojs/check typescript`.

- [ ] **Step 4:** `astro.config.mjs`:

```js
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
    sitemap({ i18n: { defaultLocale: "es", locales: { es: "es-MX", en: "en-US" } } }),
  ],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 5:** `tsconfig.json` extiende `astro/tsconfigs/strict` con `include: [".astro/types.d.ts", "**/*"]`, `exclude: ["dist"]`.
- [ ] **Step 6:** `src/styles/global.css` con `@import "tailwindcss"; @plugin "@tailwindcss/typography";`, `@theme` con los colores y fuentes de Global Constraints, `body` con fondo/texto base y `@media (prefers-reduced-motion: reduce)` que anula transiciones.
- [ ] **Step 7:** Página temporal `src/pages/index.astro` que importa `global.css`. Run: `npm run build` → Expected: build OK, `dist/index.html` existe.
- [ ] **Step 8:** Commit `chore: reemplazar Next.js por esqueleto de Astro`.

---

### Task 2: i18n — textos de UI y helpers de rutas (TDD)

**Files:**
- Create: `src/i18n/ui.ts`, `src/i18n/utils.ts`, `src/i18n/utils.test.ts`

**Interfaces — Produces:**
- `type Lang = "es" | "en"`; `const languages: Record<Lang, string>`
- `const ui: Record<Lang, Record<UiKey, string>>` (nav, botones, títulos de sección, fechas)
- `t(lang: Lang, key: UiKey): string`
- `localizePath(lang: Lang, page: PageKey, slug?: string): string` — `PageKey = "home" | "projects" | "project" | "blog" | "post" | "about"`; ES: `/`, `/proyectos/`, `/proyectos/<slug>/`, `/blog/`, `/blog/<slug>/`, `/sobre-mi/`; EN con prefijo `/en` y `projects`, `about`.
- `getLangFromUrl(url: URL): Lang`
- `formatDate(lang: Lang, date: Date): string` (`es-MX` / `en-US`, día mes año)

- [ ] **Step 1:** Tests (`node:test` + `assert/strict`) que cubren: `localizePath("es","project","mcp-banxico") === "/proyectos/mcp-banxico/"`, `localizePath("en","about") === "/en/about/"`, `localizePath("en","home") === "/en/"`, `getLangFromUrl(new URL("https://x/en/blog/"))==="en"` y `/proyectos/` → `"es"`, `t("en","nav.projects")==="Projects"`.
- [ ] **Step 2:** Run `node --test src/i18n/utils.test.ts` → FAIL (módulo no existe). Node 22.18+ ejecuta TS por *type stripping*; los imports usan extensión `.ts` y `utils.ts` solo usa sintaxis borrable (sin enums).
- [ ] **Step 3:** Implementar `ui.ts` y `utils.ts`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: i18n de UI y rutas`.

---

### Task 3: Datos de perfil y colecciones de contenido

**Files:**
- Create: `src/data/profile.ts`, `src/content.config.ts`, `src/content/projects/{es,en}/*.md` (13 por idioma), `src/content/blog/es/como-conecte-claude-a-banxico.md`

**Interfaces — Produces:**
- `profile: Record<Lang, Profile>` con `name`, `role`, `headline` (2 partes: `lead`, `muted`), `intro`, `bio: string[]`, `metrics: {value: string; label: string}[]`, `experience: {role; company; period; summary; highlights: {title; text}[]; tags: string[]}[]`, `education: {title; institution; period; note?}[]`, `certifications: {title; issuer; date; file?; verifyUrl?; code?}[]`, `skills: {group: string; items: string[]}[]`, `languages: {name; level}[]`.
- `contact = { email: "yo@inakisobera.me", github, linkedin, x, cv: "/cv/cv_inaki_sobera.pdf" }`
- Colección `projects`: schema `({ image }) => z.object({ title, summary, order: z.number(), featured: z.boolean().default(false), caseStudy: z.boolean().default(false), image: image(), imageAlt: z.string(), tags: z.array(z.string()), metric: z.string().optional(), role: z.string().optional(), links: z.object({ github, demo, pypi, video, pr }).partial() })` con URLs `z.url()`; id del glob = `es/mcp-banxico` → slug = parte tras `/`.
- Colección `blog`: `z.object({ title, description, date: z.coerce.date(), tags: z.array(z.string()).default([]), draft: z.boolean().default(false) })`.
- Helpers en `src/content/queries.ts`: `getProjects(lang)` (ordenados por `order`), `getPosts(lang)` (sin drafts en producción, más recientes primero), `slugOf(entry)`.

Contenido (sin inventar):
- Métricas: `1.7k` descargas/mes en PyPI (oct 2026) · `706` reportes vectorizados en el RAG (CV) · `22` series diarias de Banxico · `PR #35` aceptado en MCP Guard.
- Casos de estudio (`caseStudy: true`, `featured: true` los 3 primeros): mcp-banxico (order 1), xerebro (2), banxico-al-dia (3), gordito (4, no featured). Cuerpo: secciones `## Problema`, `## Solución`, `## Arquitectura`, `## Resultados`, `## Stack` sacadas de los README de `nanisadw3/mcp-banxico`, `RAG_pemex`, `banxico-datos`, `Gordito_AI` y del CV.
- Resto (`caseStudy: false`): mcp-gateway, mcp-guard (`role: "Contribución open source"`, links `github` al upstream y `pr`), pokemon, rentas, yolo, nasa, survival, chat, spotify — resúmenes del `lib/data.ts` actual.
- Experiencia PEMEX con los 3 logros del CV (RAG de punta a punta con 706 reportes, automatización n8n/Python/Docker, cascada de LLMs con failover e intención).
- Artículo borrador (`draft: true`) basado en el README de mcp-banxico y el video `https://www.youtube.com/watch?v=saaD665cn9g`.

- [ ] **Step 1:** Escribir `content.config.ts`, `profile.ts`, `queries.ts`.
- [ ] **Step 2:** Escribir los Markdown.
- [ ] **Step 3:** Run `npx astro sync && npx astro check` → Expected: 0 errores (el schema valida todo el contenido).
- [ ] **Step 4:** Commit `feat: contenido de proyectos, blog y perfil`.

---

### Task 4: Layout base, SEO y componentes

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/{Nav,Footer,Section,Hero,Metrics,ProjectCard,ProjectRow,ExperienceItem,PostItem,ContactLinks}.astro`

**Interfaces — Produces:**
- `BaseLayout` props: `{ lang: Lang; title: string; description: string; image?: ImageMetadata | string; altHref?: string | null; type?: "website" | "article"; jsonLd?: object }`. Emite title, description, canonical (`Astro.url`), OG/Twitter (imagen por defecto `/og-image.jpg`), `hreflang` es/en/x-default si `altHref` no es null, `<html lang>`.
- `Nav` props `{ lang; altHref: string | null; showBlog: boolean }`; menú móvil con `<details>` (sin JS).
- `Hero` `{ lang }` · `Metrics` `{ items: {value,label}[] }` · `ProjectCard` `{ lang; project: CollectionEntry<"projects"> }` (usa `<Image>` de `astro:assets`) · `ProjectRow` igual pero compacto · `ExperienceItem` `{ item }` · `PostItem` `{ lang; post }` · `ContactLinks` `{ lang }` · `Section` `{ id?; title; eyebrow?; href?; hrefLabel? }`.

- [ ] **Step 1:** Implementar layout y componentes según la paleta y tipografía de Global Constraints.
- [ ] **Step 2:** Página temporal que monta todos los componentes; `npm run build` → OK.
- [ ] **Step 3:** Commit `feat: layout base y componentes`.

---

### Task 5: Vistas y rutas ES/EN

**Files:**
- Create: `src/views/{HomeView,ProjectsView,ProjectView,BlogView,PostView,AboutView}.astro`
- Create: `src/pages/{index,sobre-mi,404}.astro`, `src/pages/proyectos/{index,[slug]}.astro`, `src/pages/blog/{index,[slug]}.astro`, `src/pages/rss.xml.ts`
- Create: `src/pages/en/{index,about}.astro`, `src/pages/en/projects/{index,[slug]}.astro`, `src/pages/en/blog/{index,[slug]}.astro`, `src/pages/en/rss.xml.ts`

Reglas:
- Cada archivo de `pages` solo hace `getStaticPaths` (si aplica) y `<XView lang="es|en" .../>`.
- `[slug]` de proyectos genera rutas solo para `caseStudy: true`; las filas de proyectos sin caso de estudio enlazan a GitHub/demo.
- `altHref`: en páginas de detalle, la ruta equivalente solo si existe la entrada en el otro idioma; si no, `null`.
- Si `getPosts(lang)` está vacío: sin sección de artículos en la home, sin "Blog" en el menú, `/blog/` muestra "próximamente".
- JSON-LD `Person` en Home, `Article` en PostView.

- [ ] **Step 1:** Implementar vistas y rutas.
- [ ] **Step 2:** `npm run build` → OK; `ls dist` muestra `index.html`, `proyectos/mcp-banxico/index.html`, `en/projects/mcp-banxico/index.html`, `sobre-mi/index.html`, `en/about/index.html`, `sitemap-index.xml`, `rss.xml`.
- [ ] **Step 3:** Commit `feat: páginas y rutas en español e inglés`.

---

### Task 6: Verificación de enlaces, robots y deploy

**Files:**
- Create: `scripts/check-links.mjs`
- Modify: `public/robots.txt`, `.github/workflows/deploy.yml`, `.gitignore`

- [ ] **Step 1:** `scripts/check-links.mjs`: recorre `dist/**/*.html`, extrae `href`/`src` que empiezan con `/`, resuelve a archivo (`x/` → `x/index.html`, sin extensión → `.html` o `/index.html`) y falla con lista de rotos; además exige que existan las rutas conservadas de Global Constraints. Debe fallar primero con un `dist` que tenga un enlace roto a propósito (probar con `echo '<a href="/nope/">' > dist/zz.html`), luego pasar al borrarlo.
- [ ] **Step 2:** `robots.txt` → `Sitemap: https://inakisobera.me/sitemap-index.xml`.
- [ ] **Step 3:** `deploy.yml`: solo rama `main`, Node 22, `npm ci`, `npm run build`, `folder: dist`, `cname: inakisobera.me`.
- [ ] **Step 4:** `.gitignore`: `dist/`, `.astro/`, `node_modules/`.
- [ ] **Step 5:** `npm run check && npm run build && npm test` → todo OK.
- [ ] **Step 6:** Commit `ci: build de Astro y verificación de enlaces`.

---

### Task 7: Revisión visual

- [ ] **Step 1:** `npx astro preview` en segundo plano; con Playwright, capturar en 390px y 1280px: `/`, `/proyectos/`, `/proyectos/xerebro/`, `/sobre-mi/`, `/en/`.
- [ ] **Step 2:** Revisar: contraste, desbordes horizontales en móvil, imágenes, selector de idioma, consola sin errores. Corregir y repetir.
- [ ] **Step 3:** Commit de ajustes `style: ajustes tras revisión visual`.
- [ ] **Step 4:** Dejar el preview corriendo para el autor y reportar URL, rama y cómo verlo (`npm run dev`).
