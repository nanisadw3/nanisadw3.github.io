---
title: Explicar embeddings con un mapa 3D (porque yo también tuve que entenderlos)
description: Dos repos que hice para aprender RAG en público. Un explorador visual de embeddings y un tutorial de punta a punta con la base de datos Pagila.
date: 2026-08-06
tags: [RAG, Embeddings, PostgreSQL]
---

Cuando haces un RAG en el trabajo aprendes rápido, pero a pedazos. Así que entre finales de julio
y principios de agosto de 2026 hice dos repos para ordenar lo que había aprendido y, de paso,
explicárselo a alguien más.

## Que-son-los-Embeddings

El 28 de julio subí [Que-son-los-Embeddings-](https://github.com/nanisadw3/Que-son-los-Embeddings-).
Es una app en Flask con Qdrant que te deja meter frases y **verlas** en un mapa 2D o 3D (con
Plotly). Las frases que significan algo parecido quedan juntitas, aunque no compartan ni una
palabra.

Esa es toda la idea de los embeddings: convertir texto en un vector de números donde "cerca"
significa "parecido". Cuando lo ves girando en 3D se entiende en dos segundos, cosa que con la
definición de libro nunca me pasó.

## pagila-rag-tutorial

El 5 de agosto empecé [pagila-rag-tutorial](https://github.com/nanisadw3/pagila-rag-tutorial): un
RAG de punta a punta sobre **Pagila**, la base de datos de ejemplo de una renta de películas en
PostgreSQL.

Lo chistoso es que el primer commit dice "Corrected Pagila schema, data and commands". O sea, antes
de hacer nada de IA tuve que arreglar la base de ejemplo porque no cargaba bien. Bienvenido a la
vida real.

Al día siguiente lo reorganicé en carpetas numeradas (paso 1, paso 2...) para que alguien pueda
seguirlo en orden: cargar datos, generar embeddings, guardarlos en PostgreSQL y hacer búsqueda
semántica tipo "una película de terror con un perro".

## Por qué hacer repos "didácticos"

Porque explicar algo te obliga a entenderlo de verdad. Varias cosas que hoy hago en
[Xerebro](/proyectos/xerebro/) las terminé de entender armando estos tutoriales, no al revés.
