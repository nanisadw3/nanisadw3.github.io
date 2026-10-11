---
title: Gordito, mi agente que corre en la terminal (y pone música)
description: Quería un agente que trabajara en mi máquina sin mandar mis archivos a ninguna API. Así nació Gordito, sobre Ollama, con herramientas, MCP y un Tux que cambia de cara.
date: 2026-09-21
tags: [Agentes, Ollama, MCP]
---

Después de [mcp-banxico](/blog/como-conecte-claude-a-banxico/) quería probarlo desde un agente
mío, uno que corriera en local. Así que el 21 de septiembre de 2026 hice el primer commit de
[Gordito](/proyectos/gordito/). Sí, se llama Gordito. No hay una gran historia detrás.

## Qué hace

Es un agente en la terminal que usa **modelos locales de Ollama** (en macOS y en mi Arch). Nada de
mandar mis archivos a una API externa. Puede:

- Navegar carpetas, leer y escribir archivos y ejecutar comandos.
- Buscar en internet (DuckDuckGo) y leer páginas.
- Usar servidores MCP: mcp-banxico para datos del Banco de México y `@playwright/mcp` para manejar
  un Chromium de verdad (navegar, hacer clic, llenar formularios).
- Poner música en Spotify. Con AppleScript en macOS y `playerctl` en Linux. Esto no tenía que
  hacerlo, pero aquí estamos.

Tiene un `/mision` para tareas de varios pasos y comandos como `/models`, `/tools` y `/mcp`.

## La parte que más me sirvió: el modo inspector

Gordito tiene dos interfaces. La minimalista, con Markdown, streaming y un Tux en ASCII que cambia
de expresión. Y la **inspector**, que te enseña todo: el razonamiento, el JSON exacto que genera el
modelo, la llamada que se ejecuta y lo que se le regresa.

Ahí fue donde de verdad entendí el *tool calling*. Los modelos chicos a veces generan JSON medio
roto o inventan argumentos, y si no lo ves no sabes por qué el agente "se puso tonto". Ver el
JSON crudo te ahorra horas de adivinar.

El 2 de octubre le metí gestión de herramientas y configuración interactiva. Sigue siendo mi
juguete favorito.
