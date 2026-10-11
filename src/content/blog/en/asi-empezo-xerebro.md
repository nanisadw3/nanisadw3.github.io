---
title: The day I started a RAG system for PEMEX
description: How Xerebro was born, the assistant that reads the refineries' daily reports. The first week was all about fixing things I didn't know could break.
date: 2026-06-25
tags: [RAG, PEMEX, Qdrant]
---

On June 25, 2026 I made the first commit to `RAG_pemex`, now called [Xerebro](/en/projects/xerebro/).
I'd been at PEMEX for a month and the problem was obvious: the refineries produce operational
reports **every single day** (throughput, equipment failures, shutdowns, start-ups), and finding
anything meant opening PDFs one by one.

The idea: you ask "what happened at the Tula plant yesterday?" and it answers citing the report,
the refinery, the date and the shift. If it doesn't cite the source, it's useless.

## Week one: learning the hard way

The early commits are gold. A few from June 25–30:

- **"Fix timezone mismatch on cloud servers"**. The server ran on UTC, so asking about "today" late
  at night gave you tomorrow. I had to pin it to Mexico time.
- **"Implement refinery-balanced round-robin selection"**. Ask about several refineries and the
  search returned chunks from whichever one had the most text, while the rest never showed up. Now
  results are spread across refineries.
- **"Balanced round-robin date-based selection"**. Same thing with dates: one wordy day would "eat"
  all the others.

None of this is in RAG tutorials. They teach you to drop documents into a vector database and call
it a day; the hard part starts when the data is real and people ask questions the way they talk.

## How it grew

At first I also had a separate version (`Rag_pemex_local`) on Hugging Face Spaces for testing.
Over time everything merged into one project:

- Intent routing: "what is hydrodesulfurization?" doesn't need the vector database, it comes from
  a technical knowledge base.
- An LLM cascade (Gemini, Groq, OpenRouter). If one runs out of quota, the next one takes over and
  you never notice.
- Natural-language dates ("yesterday", "on Monday", "August 15") parsed without asking the model.

Today the repo has **over 320 commits** and it's still in production, indexing a new report every
day. And yes, I even made a loader where a drop falls and the PEMEX eagle appears. Priorities.
