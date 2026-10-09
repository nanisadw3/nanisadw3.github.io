# inakisobera.me

Portafolio personal de Iñaki Sobera, hecho con [Astro](https://astro.build) y Tailwind CSS.
Español en `/`, inglés en `/en/`.

## Comandos

```bash
npm install        # dependencias (Node >= 22.12)
npm run dev        # servidor local en http://localhost:4321 (muestra borradores)
npm run build      # genera dist/
npm run preview    # sirve dist/ como en producción
npm run check      # tipos y validación del contenido
npm test           # tests de i18n + enlaces rotos en dist/ (correr después de build)
```

Al hacer push a `main`, `.github/workflows/deploy.yml` compila y publica `dist/` en la rama
`gh-pages`.

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Titular, métricas, experiencia, formación, certificaciones, stack | `src/data/profile.ts` |
| Textos de la interfaz (menú, botones, títulos) | `src/i18n/ui.ts` |
| Un proyecto | `src/content/projects/{es,en}/<slug>.md` |
| Un artículo | `src/content/blog/{es,en}/<slug>.md` |
| Colores y fuentes | `src/styles/global.css` |

## Agregar un proyecto

Crea `src/content/projects/es/<slug>.md` (y su versión en `en/` con el mismo slug):

```md
---
title: Mi proyecto
summary: Una o dos frases de qué hace y por qué importa.
order: 7                # posición en la lista
featured: false         # true = tarjeta grande en la home (se muestran los 3 primeros)
caseStudy: false        # true = tiene página propia con el cuerpo de este archivo
image: ../../../assets/projects/mi-proyecto.png
imageAlt: Descripción de la imagen
tags: [Python, MCP]
metric: 500 usuarios    # opcional, se muestra en verde
links:
  github: https://github.com/...
  demo: https://...     # también: pypi, video, pr
---

## Problema
...
```

## Publicar un artículo

Crea `src/content/blog/es/<slug>.md` con `title`, `description`, `date` y `tags`. Mientras tenga
`draft: true` solo se ve en `npm run dev`. Cuando haya al menos un artículo publicado, aparecen el
enlace "Blog" en el menú y la sección de artículos en la home.
