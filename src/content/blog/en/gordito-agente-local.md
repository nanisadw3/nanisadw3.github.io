---
title: Gordito, my agent that lives in the terminal (and plays music)
description: I wanted an agent that worked on my machine without sending my files to any API. That's how Gordito was born, on Ollama, with tools, MCP and a Tux that changes faces.
date: 2026-09-21
tags: [Agents, Ollama, MCP]
---

After [mcp-banxico](/en/blog/como-conecte-claude-a-banxico/) I wanted to try it from an agent of my
own, one that ran locally. So on September 21, 2026 I made the first commit of
[Gordito](/en/projects/gordito/). Yes, it's called Gordito ("chubby"). There's no big story behind it.

## What it does

It's a terminal agent running **local Ollama models** (on macOS and on my Arch box). No sending my
files to an external API. It can:

- Browse folders, read and write files and run commands.
- Search the web (DuckDuckGo) and read pages.
- Use MCP servers: mcp-banxico for Banco de México data and `@playwright/mcp` to drive a real
  Chromium (navigate, click, fill forms).
- Play music on Spotify. AppleScript on macOS, `playerctl` on Linux. It didn't need to do this,
  but here we are.

It has `/mision` for multi-step tasks and commands like `/models`, `/tools` and `/mcp`.

## The part that helped me most: inspector mode

Gordito has two interfaces. The minimal one, with Markdown, streaming and an ASCII Tux that
changes expression. And the **inspector**, which shows you everything: the reasoning, the exact
JSON the model generates, the call that gets executed and what's returned to it.

That's where I really understood tool calling. Small models sometimes produce half-broken JSON or
make up arguments, and if you can't see it you have no idea why the agent "went dumb". Seeing the
raw JSON saves you hours of guessing.

On October 2 I added tool management and interactive setup. It's still my favorite toy.
