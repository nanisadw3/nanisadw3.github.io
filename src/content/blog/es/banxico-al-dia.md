---
title: Un repo que se actualiza solo con los datos de Banxico
description: Banxico al Día junta 22 indicadores del Banco de México cada día hábil con una GitHub Action. El historial de git termina siendo el historial de Banxico.
date: 2026-10-08
tags: [Datos abiertos, GitHub Actions, Python]
---

Con [mcp-banxico](/blog/como-conecte-claude-a-banxico/) los agentes ya podían consultar al Banco de
México. Pero la gente normal no usa agentes para ver cuánto está el dólar, y quien quiere analizar
datos lo que quiere es un CSV limpio, no un token y una lista de IDs de series. Así que el 8 de
octubre de 2026 subí [Banxico al Día](/proyectos/banxico-al-dia/).

## Cómo funciona

Es *git scraping* puro:

1. Una GitHub Action corre de lunes a viernes, después de que Banxico publica el FIX.
2. Un script en Python (solo biblioteca estándar, cero dependencias) descarga los últimos 60 días
   de cada serie. ¿Por qué 60 y no solo el último? Porque Banxico a veces corrige datos recientes.
3. Lo mezcla con el histórico y **solo hace commit si algo cambió**.

Ese último punto es mi favorito: un día sin publicaciones no genera commit, así que el historial de
git termina siendo, literal, el historial de publicaciones de Banxico.

## Qué trae

22 indicadores: dólar, euro, libra, yen, dólar canadiense, tasa objetivo, TIIE, CETES, inflación
general y subyacente, INPC, UDIS y reservas. Cada uno en su CSV con dos columnas (`fecha`,
`valor`) e histórico desde enero de 2024.

Y la página tiene una **lectura del día** que se escribe sola con los datos: cuánto se movió el
dólar contra el día anterior y en el último mes. El tipo de cambio que ves en la página de
[mcp-banxico](/proyectos/mcp-banxico/) de este sitio sale de ahí mismo, en vivo.

## Lo que me gusta de este proyecto

Que no necesita servidor para los datos: GitHub los guarda, los versiona y los sirve. Mi servidor
solo hace `git pull` para la página, y ni siquiera necesita el token. A veces la mejor
arquitectura es la que casi no existe.
