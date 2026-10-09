# Rediseño de inakisobera.me en Astro

Fecha: 2026-10-09 · Estado: aprobado en conversación

## Objetivo

Reemplazar el portafolio actual (Next.js de una sola página, estética glitch/neón) por un sitio
en Astro de varias páginas, sobrio y profesional, que:

1. Muestre en segundos qué hace Iñaki y con qué evidencia (métricas reales).
2. Tenga páginas indexables por proyecto y un blog, para que el dominio atraiga tráfico orgánico.
3. Sea bilingüe (ES en `/`, EN en `/en/`).

No es objetivo: mantener los componentes actuales ni sus animaciones.

## Enfoque técnico

Astro (v7) estático + Tailwind CSS v4 + colecciones de contenido en Markdown. Sin framework de
UI en el cliente; JS solo donde haga falta (ninguno previsto salvo el menú móvil, en `<script>`
inline de Astro). Fuentes Inter y JetBrains Mono autoalojadas con `@fontsource`.

Alternativas descartadas: reutilizar los componentes React actuales (arrastran el estilo que se
quiere abandonar) y temas prefabricados (se notan como plantilla).

## Páginas y rutas

| Ruta ES | Ruta EN | Contenido |
|---|---|---|
| `/` | `/en/` | Hero + métricas, 3 proyectos destacados, experiencia, 3 últimos artículos, contacto |
| `/proyectos/` | `/en/projects/` | Destacados en tarjetas; el resto en lista compacta |
| `/proyectos/<slug>/` | `/en/projects/<slug>/` | Caso de estudio |
| `/blog/` | `/en/blog/` | Lista de artículos del idioma |
| `/blog/<slug>/` | `/en/blog/<slug>/` | Artículo |
| `/sobre-mi/` | `/en/about/` | Bio, formación, certificaciones con verificación, stack |
| `/rss.xml` | `/en/rss.xml` | RSS del blog |
| `/404` | — | Página de error |

Rutas que se conservan sin cambios: `/mcp-banxico/` (página estática enlazada desde
awesome-remote-mcp-servers), `/cv/cv_inaki_sobera.pdf`, `/cr/*.pdf`, `/og-image.jpg`,
`/googlee4033e5a981dc905.html` (verificación de Search Console), `CNAME`.

Un artículo puede existir solo en un idioma; la lista de cada idioma muestra solo los suyos.

## Contenido

### Colecciones

- `projects`: un archivo Markdown por proyecto y por idioma (`src/content/projects/{es,en}/<slug>.md`).
  Frontmatter: `title`, `summary`, `order`, `featured` (bool), `caseStudy` (bool), `image`,
  `tags[]`, `metric` (texto corto opcional, p. ej. "1.7k descargas/mes"), `links`
  (`github`, `demo`, `pypi`, `video`, `pr` opcionales), `role` (opcional, p. ej. "Contribución").
  El cuerpo es el caso de estudio (solo si `caseStudy`).
- `blog`: `src/content/blog/{es,en}/<slug>.md`. Frontmatter: `title`, `description`, `date`,
  `tags[]`, `draft` (bool).

Datos no repetitivos (experiencia, formación, certificaciones, stack, contacto, métricas del
hero, textos de UI) viven en `src/data/` como módulos TypeScript por idioma.

### Casos de estudio iniciales

mcp-banxico, Xerebro (RAG operativo), Banxico al Día y Gordito. Estructura: problema → solución →
arquitectura → resultados → stack → enlaces. Contenido basado en los README de cada repo; nada
inventado.

Proyectos en lista compacta: MCP Relational AI Gateway, Open Source: MCP Guard (PR #35),
BattleNet Pokémon, Property Management System, YOLO Kinetic Vision, Cosmos Telemetry,
AI Survival Ecosystem, Cipher-Stream Chat, Sync Spotify Client.

### Blog

Un artículo inicial en español, marcado como borrador para revisión del autor: "Cómo conecté
Claude al Banco de México", basado en el README de mcp-banxico y su video. `draft: true` lo
excluye del build de producción pero se ve en `astro dev`. Si no hay artículos publicados, la
sección de artículos de la home y el enlace "Blog" del menú se ocultan; `/blog/` muestra un
mensaje de "próximamente".

### Métricas del hero

1.7k descargas/mes (PyPI, oct 2026) · 7 refinerías cubiertas por el RAG · 22 series diarias de
Banxico · PR #35 aceptado en MCP Guard. Son valores estáticos en `src/data/`; se actualizan a mano.

## Estilo visual

Dirección "B + métricas de C" elegida en mockups:

- Fondo `#09090b`, superficies `#18181b`, bordes `#27272a`, texto `#fafafa` / `#a1a1aa` / `#71717a`.
- Un acento: esmeralda (`#34d399`) para enlaces, estados y foco.
- Inter para texto; JetBrains Mono para métricas, etiquetas, fechas y código.
- Fila de métricas en retícula con bordes (de la dirección C).
- Sin efectos glitch, partículas ni texto cifrado. Transiciones de hover sutiles; nada que dependa
  de animación para mostrar contenido. Respeta `prefers-reduced-motion`.
- Mobile-first; ancho máximo de lectura ~68ch en artículos.

## Componentes

`BaseLayout` (head, SEO, nav, footer) · `Nav` (con selector ES/EN que apunta a la página
equivalente) · `Hero` · `Metrics` · `ProjectCard` · `ProjectRow` · `ExperienceItem` · `PostItem` ·
`ContactLinks` · `Prose` (estilos de artículo/caso de estudio). Cada uno recibe sus datos por
props; ninguno lee colecciones por su cuenta salvo las páginas.

## SEO

Por página: `<title>`, `description`, canonical, Open Graph/Twitter con imagen (la del proyecto o
`/og-image.jpg`), `hreflang` es/en/x-default cuando existe la página equivalente. Sitemap con
`@astrojs/sitemap` (con i18n), RSS con `@astrojs/rss`, JSON-LD `Person` en la home y `Article` en
artículos. `robots.txt` apunta al sitemap generado (`/sitemap-index.xml`).

## Contacto

Botones directos: `mailto:yo@inakisobera.me`, LinkedIn, GitHub. Se elimina el formulario de
Web3Forms.

## Build y deploy

- El proyecto Astro reemplaza al de Next.js en el mismo repositorio (se eliminan `app/`,
  `components/`, `lib/`, configuración de Next).
- Workflow `deploy.yml`: Node 22, `npm ci`, `npm run build`, publica `dist/` en `gh-pages` con
  `cname: inakisobera.me`. Ramas que despliegan: solo `main`.
- El trabajo se hace en la rama local `astro`; no se sube ni se fusiona hasta que el autor lo revise.

## Verificación

- `astro check` y `astro build` sin errores.
- Revisión de enlaces internos rotos sobre `dist/` (script simple).
- Las rutas conservadas existen en `dist/`.
- Revisión visual con Playwright en 390px y 1280px de las páginas principales en ambos idiomas.
