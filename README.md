# inakisobera.me

Página de presentación de Iñaki Sobera, hecha con [Astro](https://astro.build) y Tailwind CSS,
con tema Tokyo Night. Español en `/`, inglés en `/en/`.

| Ruta | Qué es |
|---|---|
| `/` | Portada: hero + neofetch, y al hacer scroll un resumen de todo |
| `/proyectos/` | mcp-banxico, Xerebro y Gordito a fondo; "ver más" con el resto |
| `/github/` | Actividad completa en GitHub |
| `/blog/` | Notas técnicas |
| `/terminal/` | Terminal interactiva (`help`, `neofetch`, `banxico`, `cat <proyecto>`…) |

## Comandos

```bash
npm install        # dependencias (Node >= 22.12)
npm run dev        # servidor local en http://localhost:4321 (muestra borradores)
npm run fetch      # actualiza src/data/live.json (GitHub, PyPI, MCP de Xerebro y Banxico)
npm run build      # genera dist/
npm run preview    # sirve dist/ como en producción
npm run check      # tipos y validación del contenido
npm test           # tests + enlaces rotos en dist/ (correr después de build)
```

`npm run fetch` necesita `GH_TOKEN` (o `GITHUB_TOKEN`) para GitHub y `XEREBRO_TOKEN` para el MCP
de Xerebro; en local: `GH_TOKEN=$(gh auth token) npm run fetch`. Si una fuente falla, se conserva
su último valor en `live.json`.

## Datos en vivo

- **Cada día** (12:00 UTC) y en cada push a `main`, el workflow trae los datos nuevos y publica.
- **Xerebro:** usa el secret `XEREBRO_TOKEN` del repo. Para crearlo, en la rbp:
  `cd /mnt/ssd/Documents/mcp_pemexRag && venv/bin/python scripts/mcp_token.py crear sitio-inakisobera`
  y luego `gh secret set XEREBRO_TOKEN` con ese valor.
- **Banxico en el navegador:** requiere el CORS de `docs/servidor/nginx-banxico-cors.conf` en el
  nginx de `banxico-mcp.duckdns.org`. Sin él, la página muestra el último valor compilado.

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, resumen, especialidades, experiencia, educación, neofetch | `src/data/profile.ts` |
| Textos de la interfaz | `src/i18n/ui.ts` |
| Un proyecto | `src/content/projects/{es,en}/<slug>.md` |
| Una nota del blog | `src/content/blog/{es,en}/<slug>.md` (`draft: true` = solo en `npm run dev`) |
| Colores y fuentes | `src/styles/global.css` |
| Comandos de la terminal | `src/views/TerminalView.astro` |

## Agregar un proyecto

```md
---
title: Mi proyecto
summary: Una o dos frases de qué hace y por qué importa.
order: 7                # posición en la lista
featured: false         # true = uno de los 3 proyectos estrella
caseStudy: false        # true = página propia con el cuerpo de este archivo
image: ../../../assets/projects/mi-proyecto.png
imageAlt: Descripción de la imagen
tags: [Python, MCP]
repo: mi-repo           # nombre del repo en github.com/nanisadw3 (★, lenguaje, actualización)
metric: 500 usuarios    # opcional
links:
  github: https://github.com/...
  demo: https://...     # también: pypi, video, pr
---
```
