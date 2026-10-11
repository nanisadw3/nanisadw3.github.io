---
title: Explaining embeddings with a 3D map (because I had to understand them too)
description: Two repos I built to learn RAG in public. A visual embeddings explorer and an end-to-end tutorial on the Pagila database.
date: 2026-08-06
tags: [RAG, Embeddings, PostgreSQL]
---

When you build RAG at work you learn fast, but in bits and pieces. So between late July and early
August 2026 I made two repos to organize what I'd learned and, along the way, explain it to
someone else.

## Que-son-los-Embeddings ("What are embeddings")

On July 28 I pushed [Que-son-los-Embeddings-](https://github.com/nanisadw3/Que-son-los-Embeddings-).
It's a Flask app with Qdrant where you type sentences and **see** them on a 2D or 3D map (with
Plotly). Sentences that mean similar things end up close together, even if they don't share a
single word.

That's the whole idea of embeddings: turning text into a vector of numbers where "close" means
"similar". Watching it spin in 3D makes it click in two seconds, which the textbook definition
never did for me.

## pagila-rag-tutorial

On August 5 I started [pagila-rag-tutorial](https://github.com/nanisadw3/pagila-rag-tutorial): an
end-to-end RAG pipeline over **Pagila**, the sample movie-rental database for PostgreSQL.

The funny part: the first commit says "Corrected Pagila schema, data and commands". Before doing
any AI I had to fix the sample database because it didn't load properly. Welcome to real life.

The next day I reorganized it into numbered folders (step 1, step 2...) so anyone can follow it in
order: load the data, generate embeddings, store them in PostgreSQL and run semantic searches like
"a horror movie with a dog".

## Why build "teaching" repos

Because explaining something forces you to really understand it. Several things I do today in
[Xerebro](/en/projects/xerebro/) only fully clicked while building these tutorials, not the other
way around.
