---
title: Mi primer PR aceptado en un proyecto que no es mío
description: Le agregué reglas de bloqueo a MCP Guard, un escáner de seguridad para servidores MCP. Cerraba un issue abierto y lo aceptaron el mismo día.
date: 2026-09-18
tags: [Open Source, MCP, Seguridad]
---

Hasta septiembre de 2026, todos los PRs de mi GitHub eran míos, a mis propios repos (incluidos los
famosos "Create uno.txt" de 2024). El 18 de septiembre eso cambió.

## El proyecto

[MCP Guard](https://github.com/yunaremaia/mcp-guard) es un escáner de seguridad para servidores MCP, de
[yunaremaia](https://github.com/yunaremaia). La idea es revisar qué servidores y
herramientas MCP tienes configurados y avisarte si algo huele raro. Tenía un issue abierto, el #10:
poder **bloquear** servidores o herramientas específicas.

## Lo que hice

El [PR #35](https://github.com/yunaremaia/mcp-guard/pull/35) agrega reglas de bloqueo:

- Coincidencias exactas, comodines y herramientas por servidor (bloquear solo
  `servidor/herramienta-peligrosa` sin bloquear todo el servidor).
- Configuración en YAML y también por flags en la CLI.
- Si algo bloqueado aparece, el hallazgo hace fallar el CI. Si no rompe el build, nadie le hace
  caso.

## Lo que aprendí

Contribuir a un repo ajeno es otro deporte. Tienes que leer cómo está organizado el código,
respetar su estilo aunque tú lo harías distinto y escribir el PR para que el maintainer lo entienda
sin tener que preguntarte nada. Ese mismo día me animé a mandar
[mcp-banxico](/blog/como-conecte-claude-a-banxico/) a las listas *awesome* de MCP. Y cinco días
después me fui por algo más grande: [el kernel de Linux](/blog/parche-kernel-linux/).
