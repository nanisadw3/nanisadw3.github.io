---
title: Gordito — agente local
summary: Agente de IA que corre en tu terminal con modelos locales de Ollama. Usa herramientas del sistema, busca en internet, controla un navegador real vía MCP y hasta pone música.
order: 4
featured: false
caseStudy: true
image: ../../../assets/projects/gordito.png
imageAlt: Interfaz de terminal del agente Gordito
tags: [Ollama, MCP, Playwright, Python]
links:
  github: https://github.com/nanisadw3/Gordito_AI
---

## Problema

Quería un asistente que trabajara sobre mi propia máquina, sin mandar mis archivos a una API
externa, y que pudiera hacer cosas reales: leer y escribir archivos, ejecutar comandos, buscar en
internet y usar herramientas MCP. Y quería poder ver cómo razona, paso a paso.

## Solución

Gordito es un agente que corre en la terminal sobre **modelos locales de Ollama**, en macOS y Arch
Linux. Tiene dos interfaces:

- **Minimalista**, para el día a día: respuestas en Markdown con resaltado de sintaxis, streaming
  token a token y un Tux en ASCII que cambia de expresión.
- **Inspector**, para depurar: muestra el razonamiento, el JSON exacto que genera el modelo, la
  llamada que se ejecuta en el sistema y el resultado que se le devuelve.

## Arquitectura

- **Herramientas del sistema:** navegar carpetas, leer y escribir archivos, ejecutar comandos.
- **Internet:** búsqueda en DuckDuckGo y lectura de páginas.
- **Servidores MCP** configurables en `mcp_servers.json`: integra [mcp-banxico](/proyectos/mcp-banxico/)
  y `@playwright/mcp` para controlar un Chromium real (navegar, hacer clic, llenar formularios).
- **Modo misión** (`/mision`): resuelve tareas de varios pasos de forma autónoma.
- **Spotify:** AppleScript en macOS y MPRIS con `playerctl` en Arch Linux.
- Comandos slash para cambiar de modelo (`/models`), ver herramientas (`/tools`) y estado de MCP
  (`/mcp`).

## Resultados

Un agente local útil para el trabajo diario que me sirvió para entender a fondo el ciclo de
*tool calling*: qué genera el modelo, cómo se valida y cómo se le devuelve el resultado.

## Stack

Python, Ollama, Rich, Model Context Protocol, Playwright, DuckDuckGo, AppleScript, MPRIS.
