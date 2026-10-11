---
title: El día que empecé un RAG para PEMEX
description: Cómo nació Xerebro, el asistente que lee los reportes diarios de las refinerías. La primera semana fue puro arreglar cosas que no sabía que podían fallar.
date: 2026-06-25
tags: [RAG, PEMEX, Qdrant]
---

El 25 de junio de 2026 hice el primer commit de `RAG_pemex`, que hoy se llama
[Xerebro](/proyectos/xerebro/). Ya llevaba un mes en PEMEX y el problema estaba clarísimo: las
refinerías generan reportes operativos **todos los días** (cargas, fallas de equipo, paros,
arranques) y encontrar algo ahí era abrir PDF por PDF.

La idea: que le puedas preguntar "¿qué pasó con la planta de Tula ayer?" y te conteste citando el
reporte, la refinería, la fecha y el turno. Si no cita la fuente, no sirve.

## La primera semana: aprender a la mala

Los primeros commits son una joya. Algunos de los que hice del 25 al 30 de junio:

- **"Fix timezone mismatch on cloud servers"**. El servidor estaba en UTC, así que cuando
  preguntabas por "hoy" en la noche te contestaba con lo de mañana. Tuve que forzar la hora de México.
- **"Implement refinery-balanced round-robin selection"**. Si preguntabas por varias refinerías,
  la búsqueda traía puros fragmentos de la que más texto tenía y las demás ni aparecían. Ahora
  reparto los resultados por refinería.
- **"Balanced round-robin date-based selection"**. Lo mismo pero con fechas: un día con mucho
  texto se "comía" a los demás.

Nada de eso sale en los tutoriales de RAG. Ahí te enseñan a meter documentos a una base vectorial
y listo; lo difícil empieza cuando los datos son reales y la gente pregunta como habla.

## Lo que fue creciendo

Al principio también tenía una versión aparte (`Rag_pemex_local`) que subí a Hugging Face Spaces
para probar. Con el tiempo todo se fue juntando en un solo proyecto:

- Enrutar por intención: si preguntas "¿qué es la hidrodesulfuración?" no hace falta buscar en la
  base vectorial, sale de una base de conocimiento técnica.
- Una cascada de LLMs (Gemini, Groq, OpenRouter). Si uno se queda sin cuota, pasa al siguiente
  sin que lo notes.
- Fechas en lenguaje natural ("ayer", "el lunes", "15 de agosto") interpretadas sin preguntarle al
  modelo.

Hoy el repo pasa de **320 commits** y sigue en producción, indexando un reporte nuevo cada día. Y
sí, hasta le hice un loader donde cae una gota y aparece el águila de PEMEX. Prioridades.
