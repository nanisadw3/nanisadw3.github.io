---
title: My first MCP, or how I talked to SQL Server in plain Spanish
description: The MCP Relational AI Gateway was my first contact with the Model Context Protocol. Ask your database in natural language and it draws the chart.
date: 2026-07-30
tags: [MCP, SQL, LLMs]
---

By late July 2026 everyone was talking about **MCP** (Model Context Protocol) and I had no idea
what it was. The fastest way to understand something is to build it, so on July 30 the
[MCP Relational AI Gateway](https://github.com/nanisadw3/MCP-Relational-AI-Gateway) was born.

## MCP in one sentence

It's a standard that lets an AI model use external tools. You write a server once and any
compatible client (Claude, Cursor, whatever) can use it. Think of it as USB for agents.

## What the gateway does

You connect to SQL Server or PostgreSQL, pick a database and ask things like "what were the 10
most rented movies?". The model writes the SQL, runs it through the MCP tools and, when it makes
sense, draws a zoomable chart. You can switch between Gemini and Claude without touching code.

That same day I piled on features: a database picker on the login screen, an animated collapsible
sidebar (of course), and I removed a console and some logs that were just in the way. Everything
runs in Docker.

## What I learned

- The model makes fewer mistakes when you give it **the schema** instead of letting it guess.
- Separating "what the model decides" from "what gets executed" is key. The model proposes, the
  server validates and runs.
- MCP isn't magic: under the hood it's JSON-RPC calls with a well-defined schema. But that
  well-defined schema is exactly what makes it work with any client.

This project is what made me think "ok, I want to build an MCP server people actually use". That
came a couple of months later with [mcp-banxico](/en/blog/como-conecte-claude-a-banxico/).
