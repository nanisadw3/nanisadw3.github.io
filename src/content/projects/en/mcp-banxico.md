---
title: mcp-banxico
summary: MCP server on PyPI that connects Claude, Cursor and any AI agent to the official Bank of Mexico API. Every answer carries its cut-off date and official series ID.
order: 1
featured: true
caseStudy: true
image: ../../../assets/projects/mcp-banxico.jpg
imageAlt: mcp-banxico page showing the public remote endpoint
tags: [MCP, Python, PyPI, Open Source]
links:
  github: https://github.com/nanisadw3/mcp-banxico
  pypi: https://pypi.org/project/mcp-banxico/
  demo: https://inakisobera.me/mcp-banxico/
  video: https://www.youtube.com/watch?v=saaD665cn9g
live: pypi
repo: mcp-banxico
---

## Problem

AI assistants don't know what the peso is worth today. Ask them for the exchange rate, inflation or
UDIS and they answer with stale training data or, worse, a made-up number. For any financial use
in Mexico that's unacceptable: the official reference is the Bank of Mexico (Banxico), and an
answer with no source or date is useless.

## Solution

mcp-banxico is a **Model Context Protocol** server that gives any compatible client (Claude
Desktop, Cursor, Cline, Gemini CLI) direct access to Banxico's Economic Information System (SIE).
It's not a scraper or a third-party mirror: it queries the official source, and every answer
includes the **cut-off date** and the **series ID**, so it can be audited.

It exposes six read-only tools:

| Tool | What it reads |
|---|---|
| `tipo_cambio_usd` | USD/MXN exchange rate (FIX) |
| `inflacion_mexico` | INPC inflation, annual or monthly |
| `valor_udis` | UDI value |
| `tasa_interes_banxico` | Target rate and TIIE |
| `reservas_internacionales` | International reserves |
| `consultar_serie_sie` | Any SIE series by ID and date range |

## Architecture

There are two ways to use it:

- **Locally**, with `uvx mcp-banxico` or `pip install mcp-banxico`, using the free SIE token. The
  client talks to the server over stdio (JSON-RPC).
- **Public remote endpoint** at `https://banxico-mcp.duckdns.org/mcp`, over `streamable-http`. No
  install and no token; it is rate-limited per IP and runs on my own infrastructure (Linux, Nginx
  and TLS).

```json
{
  "mcpServers": {
    "banxico": {
      "type": "streamable-http",
      "url": "https://banxico-mcp.duckdns.org/mcp"
    }
  }
}
```

## Results

- Monthly PyPI downloads growing steadily (live number above).
- Listed in [TensorBlock/awesome-mcp-servers](https://github.com/TensorBlock/awesome-mcp-servers).
- Foundation for other projects: [Banxico Daily](/en/projects/banxico-al-dia/) uses its series, and
  the [Gordito](/en/projects/gordito/) agent ships it as a tool.
- A [ten-minute uncut video](https://www.youtube.com/watch?v=saaD665cn9g) (in Spanish) shows a local
  model (Qwen 2.5 on Ollama) and Claude Desktop going from "I don't have real-time access" to
  answering with the official exchange rate.

## Stack

Python 3.10+, official MCP SDK, Banxico SIE REST API, PyPI publishing, Nginx and Let's Encrypt for
the remote endpoint.
