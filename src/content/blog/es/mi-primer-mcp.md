---
title: Mi primer MCP, o cómo le hablé a SQL Server en español
description: El MCP Relational AI Gateway fue mi primer contacto con Model Context Protocol. Le preguntas a tu base de datos en lenguaje natural y te arma la gráfica.
date: 2026-07-30
tags: [MCP, SQL, LLMs]
---

A finales de julio de 2026 todo mundo hablaba de **MCP** (Model Context Protocol) y yo no tenía
idea de qué era. La forma más rápida de entender algo es construirlo, así que el 30 de julio salió
el [MCP Relational AI Gateway](https://github.com/nanisadw3/MCP-Relational-AI-Gateway).

## MCP en una frase

Es un estándar para que un modelo de IA use herramientas externas. Escribes un servidor una vez y
cualquier cliente compatible (Claude, Cursor, lo que sea) lo puede usar. Si lo piensas, es un
"USB" para agentes.

## Qué hace el gateway

Te conectas a SQL Server o PostgreSQL, eliges la base de datos y le preguntas cosas como "¿cuáles
fueron las 10 películas más rentadas?". El modelo arma el SQL, lo ejecuta a través de las
herramientas MCP y, si tiene sentido, te dibuja una gráfica con zoom. Puedes cambiar entre Gemini y
Claude sin tocar código.

Ese mismo día le metí un montón de cosas: selector de bases de datos en el login, un sidebar
retráctil animado (porque claro), y quité una consola y unos logs que nomás estorbaban. Todo
corre con Docker.

## Lo que aprendí

- El modelo se equivoca menos si le das **el esquema** de la base en vez de dejar que adivine.
- Separar "lo que el modelo decide" de "lo que se ejecuta" es clave. El modelo propone, el
  servidor valida y ejecuta.
- MCP no es magia: al final son llamadas JSON-RPC con un esquema bien definido. Pero ese esquema
  bien definido es justo lo que hace que funcione con cualquier cliente.

Este proyecto fue el que me hizo pensar "ok, quiero hacer un MCP que la gente de verdad use". Eso
llegó un par de meses después con [mcp-banxico](/blog/como-conecte-claude-a-banxico/).
