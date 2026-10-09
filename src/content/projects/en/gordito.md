---
title: Gordito — local agent
summary: AI agent that runs in your terminal on local Ollama models. It uses system tools, searches the web, drives a real browser through MCP and even plays music.
order: 4
featured: false
caseStudy: true
image: ../../../assets/projects/gordito.png
imageAlt: Terminal interface of the Gordito agent
tags: [Ollama, MCP, Playwright, Python]
links:
  github: https://github.com/nanisadw3/Gordito_AI
---

## Problem

I wanted an assistant that works on my own machine, without sending my files to an external API,
and that can do real things: read and write files, run commands, search the web and use MCP tools.
I also wanted to see how it reasons, step by step.

## Solution

Gordito is a terminal agent running on **local Ollama models**, on macOS and Arch Linux. It has two
interfaces:

- **Minimal**, for daily use: Markdown answers with syntax highlighting, token-by-token streaming
  and an ASCII Tux that changes expression.
- **Inspector**, for debugging: shows the reasoning, the exact JSON the model produces, the call
  executed on the system and the result fed back.

## Architecture

- **System tools:** browse folders, read and write files, run commands.
- **Web:** DuckDuckGo search and page reading.
- **MCP servers** configured in `mcp_servers.json`: ships [mcp-banxico](/en/projects/mcp-banxico/)
  and `@playwright/mcp` to drive a real Chromium (navigate, click, fill forms).
- **Mission mode** (`/mision`): solves multi-step tasks autonomously.
- **Spotify:** AppleScript on macOS and MPRIS via `playerctl` on Arch Linux.
- Slash commands to switch models (`/models`), list tools (`/tools`) and check MCP status (`/mcp`).

## Results

A local agent that's useful day to day and taught me the tool-calling loop in depth: what the model
generates, how it's validated and how the result is fed back.

## Stack

Python, Ollama, Rich, Model Context Protocol, Playwright, DuckDuckGo, AppleScript, MPRIS.
