---
title: A repo that updates itself with Banxico's data
description: Banxico al Día collects 22 Banco de México indicators every business day with a GitHub Action. The git history ends up being Banxico's publication history.
date: 2026-10-08
tags: [Open data, GitHub Actions, Python]
---

With [mcp-banxico](/en/blog/como-conecte-claude-a-banxico/) agents could already query Banco de
México. But regular people don't use agents to check the dollar, and anyone analyzing data wants a
clean CSV, not a token and a list of series IDs. So on October 8, 2026 I pushed
[Banxico al Día](/en/projects/banxico-al-dia/).

## How it works

It's pure *git scraping*:

1. A GitHub Action runs Monday to Friday, after Banxico publishes the FIX rate.
2. A Python script (standard library only, zero dependencies) downloads the last 60 days of each
   series. Why 60 and not just the latest? Because Banxico sometimes revises recent data.
3. It merges that with the history and **only commits if something changed**.

That last point is my favorite: a day without new data creates no commit, so the git history
literally becomes Banxico's publication history.

## What's in it

22 indicators: dollar, euro, pound, yen, Canadian dollar, target rate, TIIE, CETES, headline and
core inflation, INPC, UDIS and reserves. Each one in its own CSV with two columns (`fecha`,
`valor`) and history back to January 2024.

And the page has a **daily summary** that writes itself from the data: how much the dollar moved
versus the previous day and over the last month. The exchange rate you see on this site's
[mcp-banxico](/en/projects/mcp-banxico/) page comes live from there.

## What I like about this project

The data needs no server: GitHub stores it, versions it and serves it. My server only runs
`git pull` for the page, and doesn't even need the token. Sometimes the best architecture is the
one that barely exists.
