---
title: How I connected Claude to Mexico's central bank
description: AI assistants don't know what the dollar is worth today. That's how mcp-banxico was born, my MCP server that now gets over 1,700 downloads a month.
date: 2026-09-22
tags: [MCP, Banxico, Python]
---

Try it: ask any AI assistant what the dollar is worth in pesos today. Best case, it tells you it
has no real-time access. Worst case, it hands you a number with total confidence, pulled from who
knows where in its training data. Fine for small talk, not fine when money is involved.

In Mexico the official reference is Banco de México (Banxico), and its data is public through the
SIE (Economic Information System). What was missing was a bridge between that data and the
assistants. That's [mcp-banxico](/en/projects/mcp-banxico/).

## The timeline

- **September 18:** first commit, `v0.1.0`. Same day I opened the PR to add it to the *awesome*
  MCP server lists.
- **September 22:** automatic PyPI publishing with Trusted Publishing (GitHub Actions, no stored
  tokens). From then on, `uvx mcp-banxico` and you're done.
- **September 28:** the PR to TensorBlock's list got merged, plus another one adding the public
  endpoint.

## The rule I cared about most: make it verifiable

Every response includes **the date of the data point and the official series ID**:

```json
{
  "serie": "TIPO_CAMBIO_FIX",
  "id_serie": "SF43718",
  "fecha": "28/09/2026",
  "valor": "17.8413"
}
```

If the model says "the dollar is at 17.84", you can go to the SIE, look up `SF43718` and check it.
A number with a source is worth way more than a number on its own.

There are six tools: exchange rate, inflation, UDIS, interest rates, reserves and a generic one for
any SIE series. All read-only, so an agent can't do anything dangerous with them.

## Use it without installing anything

I run a public endpoint on my own server. In Claude Desktop all you need is:

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

## Two things that cost me some time

If you test it by hand with curl or Postman:

1. From the second request on you must send the `mcp-session-id` header. Otherwise, `400`.
2. If you send only `Accept: application/json`, you get `406`. You have to accept
   `application/json` **and** `text/event-stream`, because the response comes back as an SSE event.

## See it in action

I recorded [a ten-minute uncut video](https://www.youtube.com/watch?v=saaD665cn9g) where a local
model (Qwen 2.5 on Ollama) and Claude Desktop go from "I don't have real-time access" to answering
with the official exchange rate. The good part starts at 2:52.

It's now over 1,700 downloads a month on PyPI, which for a niche Mexican project feels like a lot.
The code is on [GitHub](https://github.com/nanisadw3/mcp-banxico).
