---
title: Banxico al Día
summary: 22 indicadores oficiales del Banco de México actualizados cada día hábil por una GitHub Action, con histórico en CSV y una lectura del día que se redacta sola a partir de los datos.
order: 4
featured: false
caseStudy: true
image: ../../../assets/projects/banxico-al-dia.jpg
imageAlt: Gráficas de inflación por componente y tasa objetivo contra inflación en Banxico al Día
tags: [Datos abiertos, GitHub Actions, Python]
metric: 22 series diarias
links:
  github: https://github.com/nanisadw3/banxico-datos
  demo: https://banxico-mcp.duckdns.org/
repo: banxico-datos
---

## Problema

Los datos del Banco de México son públicos, pero consultarlos exige un token, conocer los IDs de
las series del SIE y armar tú mismo el histórico. Para alguien que solo quiere saber cómo va el
dólar o la inflación, y para quien necesita un CSV limpio para analizar, esa fricción sobra.

## Solución

Un repositorio que se actualiza solo y una página que explica los números en lenguaje sencillo.
Cubre **22 indicadores**: tipo de cambio (dólar, euro, libra, yen y dólar canadiense), tasa
objetivo, TIIE, CETES, inflación general y subyacente, INPC, UDIS y reservas internacionales.
Cada uno tiene su CSV con dos columnas (`fecha`, `valor`) e histórico desde enero de 2024.

La página incluye una **lectura del día** generada a partir de los datos: por ejemplo, cuánto subió
o bajó el dólar respecto al día hábil anterior y en el último mes.

## Arquitectura

- Una GitHub Action corre de lunes a viernes a las 19:45 y 23:30 UTC, después de que Banxico
  publica el FIX.
- El script descarga los últimos 60 días de cada serie (Banxico a veces corrige datos recientes),
  los mezcla con el histórico y **hace commit solo si algo cambió**. Un día sin publicaciones no
  genera commit, así que el historial de git es también el historial de publicaciones de Banxico.
- El servidor de la página solo hace `git pull`; no necesita el token.
- El script usa únicamente la biblioteca estándar de Python.

## Resultados

- Datos actualizados cada día hábil sin intervención manual.
- CSV reutilizables por cualquiera, con una fuente verificable (la serie del SIE).
- Usa las mismas series que [mcp-banxico](/proyectos/mcp-banxico/), así que ambos proyectos se
  validan entre sí.

## Stack

Python (biblioteca estándar), GitHub Actions, git scraping, HTML y JavaScript para la página,
Nginx.
