---
title: "Itzamná: Mexico's public data, ready for AI"
description: After mcp-banxico I wanted to go beyond a single server. Itzamná is the project that will bring Mexico's official sources together as open-source MCP servers.
date: 2026-10-20
tags: [MCP, AI, Open data, Open Source]
---

<p align="center"><img src="/images/itzamna.svg" alt="Itzamná logo: a stepped fret in purple and blue" width="160" height="160" style="width:160px;height:160px;border-radius:36px;margin:0 auto"></p>

When I published [mcp-banxico](/en/blog/como-conecte-claude-a-banxico/) I noticed something: the hard
part wasn't connecting Claude to the Bank of Mexico, it was making every answer say **where the
figure came from and how current it is**. That's what turns an AI assistant into something you can
trust for real decisions.

And Banxico is just one source. Mexico has many more: INEGI, the SAT tax authority, fuel prices,
government procurement. Ask any model about them today and it will answer confidently… and often
with a stale or made-up number.

## The idea

Instead of a single server, I want to build **a family of MCP servers**, one for each major public
data source in Mexico, all following the same rules:

- **No figure without a source.** Every answer carries the official series or record and its
  cut-off date.
- **Open source and free.** MIT license, PyPI packages and public endpoints with no sign-up.
- **Made in Mexico, in Spanish**, for local use cases: invoices, CETES, inflation, the businesses
  in your neighborhood.

The first one already exists: mcp-banxico, with over a thousand monthly downloads on PyPI. Next up
are **mcp-inegi** (economic indicators and the directory of 5+ million businesses), **mcp-sat** (to
check whether an invoice is valid and whether the issuer is on the 69-B list) and **mcp-gasolina**
(prices by gas station).

## Why Itzamná

Itzamná was the Maya god of wisdom. Tradition says he **invented writing and the calendar**: the way
to keep a record of what is known and when it happened. That's exactly what I want these servers to
do for AI.

The logo is a stepped fret, the *xicalcoliuhqui*, found on temples all over Mexico.

## Where it's going

1. **MCP servers** for the country's main public data sources.
2. **The Itzamná agent:** an assistant that works with any model (Claude, GPT, Gemini or a local one
   with Ollama) and always checks the official source before answering anything about Mexico.
3. **Later on**, an open model fine-tuned to use these tools.

I'm not going to train a model from scratch: that costs millions. The value isn't in the model, it's
in clean data and in tools any model can use.

The project lives at [github.com/itzamna-mx](https://github.com/itzamna-mx) and has its own
[page here](/en/itzamna/). If you work with Mexican data and there's a source you'd like to see
connected to AI, get in touch.
