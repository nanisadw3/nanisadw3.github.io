# Rediseño de inakisobera.me en Astro (v2)

Fecha: 2026-10-09 · Estado: aprobado en conversación (reemplaza la v1 de este archivo)

## Objetivo

Página de presentación de Iñaki como **ingeniero de IA que busca trabajo activamente** (roles de
IA, remotos o presenciales). Primera impresión buscada: "sabe muchísimo de IA". Bilingüe (ES en
`/`, EN en `/en/`).

## Mapa del sitio

| ES | EN | Contenido |
|---|---|---|
| `/` | `/en/` | Portada tipo SPA (ver abajo) |
| `/proyectos/` | `/en/projects/` | Los 3 proyectos estrella a fondo + "ver más" con el resto |
| `/proyectos/<slug>/` | `/en/projects/<slug>/` | Caso de estudio |
| `/github/` | `/en/github/` | Actividad completa en GitHub |
| `/blog/`, `/blog/<slug>/` | `/en/blog/…` | Notas técnicas, sin fechas prominentes |
| `/terminal/` | `/en/terminal/` | Terminal interactiva (extra) |
| `/404` | — | Error |

Se conservan: `/mcp-banxico/`, `/cv/cv_inaki_sobera.pdf`, `/cr/*.pdf`, `/og-image.jpg`,
`/googlee4033e5a981dc905.html`, `CNAME`. Se elimina `/sobre-mi/` (su contenido vive en la portada).

## Portada

1. **Hero:** nombre, "Ingeniero de IA · RAG y agentes en producción", resumen de 2 líneas,
   `● abierto a roles de IA · remoto o presencial`, botones CV / correo / LinkedIn.
   Línea sutil de GitHub: usuario, lenguaje principal %, ★, seguidores, repos y mini gráfica de
   contribuciones (enlaza a `/github/`).
   A la derecha, **neofetch** con logo ASCII grande de Arch y ~13 campos.
2. Al hacer scroll, secciones que aparecen suavemente:
   1. **Lo que hago en IA:** 3 especialidades, cada una con su proyecto como enlace al caso de
      estudio — RAG en producción → Xerebro; Servidores MCP → mcp-banxico; Agentes de IA →
      Gordito. Debajo, una línea: automatización (n8n, Python) e infra (Docker, Nginx, Linux, Ollama).
   2. **Experiencia y Educación** lado a lado (PEMEX; maestría, ingeniería, certificaciones).
   3. **En GitHub:** últimos 6 meses de contribuciones, contribuciones/año, PRs externos aceptados,
      repos, ★, seguidores y barra de lenguajes.
   4. **Del blog:** última nota publicada (sección oculta si no hay).
   5. **Contacto.**
3. **Burbuja "explorar"** fija abajo al centro: al hacer clic se expande en un panel con
   /proyectos, /github, /blog y /terminal. Se cierra con clic, Esc o al navegar. Persiste entre
   páginas.

Sin sección "Proyectos destacados" en la portada (evita repetir lo de "Lo que hago en IA").

## Datos en vivo

| Dato | Fuente | Cuándo |
|---|---|---|
| Tipo de cambio en la terminal y en el caso de mcp-banxico | MCP público `banxico-mcp.duckdns.org/mcp` llamado desde el navegador | En vivo |
| Cobertura de Xerebro (días con reporte, fragmentos, refinerías, último reporte) | MCP de Xerebro con token Bearer (`XEREBRO_TOKEN`, GitHub Secret) | Al compilar |
| GitHub (contribuciones, repos, ★, seguidores, lenguajes, PRs externos) | API de GitHub (`GITHUB_TOKEN`) | Al compilar |
| Descargas de mcp-banxico | pypistats.org | Al compilar |

- `scripts/fetch-live.mjs` escribe `src/data/live.json`. Si una fuente falla, conserva el valor
  anterior del archivo (que está versionado), así el build nunca se rompe.
- El workflow corre en cada push a `main` **y todos los días a las 12:00 UTC** (cron).
- El token de Xerebro nunca llega al navegador.
- En vivo en el navegador: requiere CORS en nginx de `banxico-mcp` solo para
  `https://inakisobera.me` (y `localhost:4321` en desarrollo), y que nginx no reenvíe ese `Origin`
  al servidor MCP (el SDK lo rechaza). Si la llamada falla, la terminal usa el último valor
  compilado y lo indica.

## Estilo

Tokyo Night: fondo `#1a1b26`, oscuro `#16161e`, panel `#1f2335`, línea `#292e42`, texto
`#c0caf5` / `#a9b1d6` / `#565f89`; azul `#7aa2f7`, cian `#7dcfff`, lila `#bb9af7`, verde
`#9ece6a`, naranja `#ff9e64`, amarillo `#e0af68`, rojo `#f7768e`; azul Arch `#1793d1` solo en el
neofetch. JetBrains Mono para títulos, etiquetas y datos; Inter para texto corrido. Degradado
lila→azul→cian en el apellido. Sin prompts `user@host:~$` fuera de la terminal interactiva.
Transiciones suaves entre páginas con View Transitions de Astro. Respeta `prefers-reduced-motion`.

## Proyectos

- Estrella (con caso de estudio y en `/proyectos/` a fondo): mcp-banxico, Xerebro, Gordito.
- Banxico al Día conserva su caso de estudio y aparece como parte de la historia de mcp-banxico.
- El resto aparece en `/proyectos/` tras "ver más" (lista desplegable).
- Cada proyecto muestra lenguaje, ★ y última actualización desde GitHub cuando tiene repo propio.

## Terminal interactiva

Comandos: `help`, `whoami`, `neofetch`, `especialidades`, `proyectos`, `cat <proyecto>` (navega al
caso), `experiencia`, `github`, `banxico` (llama al MCP en vivo), `xerebro` (cobertura compilada),
`cv`, `contacto`, `clear`, `lang es|en`, `exit` (vuelve a la portada). Historial con ↑/↓,
autocompletado con Tab, comandos sugeridos clicables. Arranca ejecutando `neofetch` y `help`.

## Verificación

`astro check`, `astro build`, tests de i18n, verificador de enlaces internos y rutas conservadas,
revisión visual en 390 px y 1280 px de portada, /proyectos, /github, /terminal y /en/.
