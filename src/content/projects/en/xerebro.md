---
title: Xerebro — operational RAG
summary: Production RAG assistant over the daily operational reports of Mexico's National Refining System. Answers in natural language citing its source, with automatic failover between LLMs.
order: 2
featured: true
caseStudy: true
image: ../../../assets/projects/xerebro.jpg
imageAlt: Xerebro Operativo sign-in screen, PEMEX's RAG assistant
tags: [RAG, Qdrant, Flask, LLMs]
metric: 706 reports indexed
links:
  github: https://github.com/nanisadw3/RAG_pemex
---

## Problem

The refineries of Mexico's National Refining System produce operational reports every day:
throughput, equipment failures, shutdowns and start-ups. The information exists, but finding out
"what happened to pump P-101 at Salina Cruz on August 15" means opening and reading reports one by
one. And an AI answer with no source is useless in an operational setting: it has to be verifiable.

## Solution

Xerebro is a RAG platform that answers technical and operational questions in natural language,
**citing the report, refinery, date and shift** each fact comes from. I designed and built it, and
have run it in production since March 2026, with **706 reports vectorized**.

Before searching, the system classifies the question's intent to avoid wasted calls:

- **Conceptual** ("what is hydrodesulfurization?"): answered from a technical knowledge base
  (glossary, refinery profiles, business rules) without touching the vector store.
- **Operational** ("how many barrels did Tula process yesterday?"): semantic search in Qdrant with
  date, refinery and equipment pre-filters.
- **Hybrid**: combines both sources.

## Architecture

1. **Retrieval:** question embeddings and Qdrant search, with deterministic parsing of natural
   language dates ("yesterday", "on Monday", "August 15") and equipment tag detection.
2. **Generation:** an LLM cascade (Gemini, Groq, OpenRouter). When a provider returns a quota
   error (429), it goes into cooldown and the request moves to the next one without the user
   noticing.
3. **Application:** Flask with SSE streaming, session auth, per-user history backed up to AWS S3
   and real-time admin notices.
4. **Security:** rate limiting on SQLite in WAL mode, temporary IP lockout on brute-force attempts
   and bot filtering.
5. **Operations:** Docker, Gunicorn and Nginx with TLS on Linux.

## Results

- In production since March 2026, with 706 reports indexed.
- **85 automated tests** that run offline.
- Fewer provider quota errors and fewer unnecessary vector-store queries thanks to intent routing.

## Stack

Python, Flask, Qdrant, Gemini, Groq, OpenRouter, SQLite (WAL), AWS S3, Docker, Gunicorn, Nginx,
Linux.
