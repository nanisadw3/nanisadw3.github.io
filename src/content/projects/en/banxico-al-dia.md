---
title: Banxico Daily
summary: 22 official Bank of Mexico indicators refreshed every business day by a GitHub Action, with CSV history and a daily summary written automatically from the data.
order: 3
featured: true
caseStudy: true
image: ../../../assets/projects/banxico-al-dia.jpg
imageAlt: USD/MXN FIX exchange rate chart on the Banxico Daily page
tags: [Open data, GitHub Actions, Python]
metric: 22 daily series
links:
  github: https://github.com/nanisadw3/banxico-datos
  demo: https://banxico-mcp.duckdns.org/
---

## Problem

Bank of Mexico data is public, but getting it means requesting a token, knowing the SIE series IDs
and building the history yourself. For someone who just wants to know how the peso or inflation is
doing, and for anyone who needs a clean CSV to analyze, that friction is unnecessary.

## Solution

A repository that updates itself and a page (in Spanish) that explains the numbers in plain
language. It covers **22 indicators**: exchange rates (US dollar, euro, pound, yen and Canadian
dollar), target rate, TIIE, CETES, headline and core inflation, INPC, UDIS and international
reserves. Each has its own CSV with two columns (`fecha`, `valor`) and history since January 2024.

The page includes a **daily reading** generated from the data, for example how much the dollar
moved against the previous business day and over the last month.

## Architecture

- A GitHub Action runs Monday to Friday at 19:45 and 23:30 UTC, after Banxico publishes the FIX.
- The script downloads the last 60 days of each series (Banxico sometimes revises recent data),
  merges them with the history and **commits only if something changed**. A day with no
  publications produces no commit, so the git history doubles as the history of Banxico's
  publications.
- The page's server only runs `git pull`; it doesn't need the token.
- The script uses only the Python standard library.

## Results

- Data refreshed every business day with no manual work.
- Reusable CSVs with a verifiable source (the SIE series).
- Uses the same series as [mcp-banxico](/en/projects/mcp-banxico/), so the two projects validate
  each other.

## Stack

Python (standard library), GitHub Actions, git scraping, HTML and JavaScript for the page, Nginx.
