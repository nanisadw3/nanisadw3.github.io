---
title: Cómo conecté Claude al Banco de México
description: Los asistentes de IA no saben cuánto vale hoy el dólar. Así construí mcp-banxico, un servidor MCP que les da acceso a los datos oficiales con fecha y fuente.
date: 2026-10-09
tags: [MCP, Banxico, Python]
draft: true
---

> **Borrador.** Revisa, ajusta el tono a tu voz y cambia `draft: true` a `false` para publicarlo.

Pregúntale a cualquier asistente de IA cuánto está el dólar hoy. En el mejor caso te dirá que no
tiene acceso a datos en tiempo real; en el peor, te dará un número con toda seguridad, sacado de
algún punto de sus datos de entrenamiento. Para una pregunta casual da igual. Para cualquier cosa
que involucre dinero, no.

En México la referencia oficial es el Banco de México, y sus datos son públicos a través del
Sistema de Información Económica (SIE). Lo que faltaba era un puente entre esos datos y los
asistentes. Eso es [mcp-banxico](/proyectos/mcp-banxico/).

## Qué es MCP, en una línea

El **Model Context Protocol** es un estándar abierto para que los modelos de IA usen herramientas
externas. Escribes un servidor MCP una vez y funciona con Claude Desktop, Cursor, Cline, Gemini
CLI y cualquier cliente compatible.

## La regla de diseño: que se pueda auditar

La decisión más importante no fue técnica. Cada respuesta del servidor incluye **la fecha del dato
y el ID oficial de la serie** del SIE:

```json
{
  "serie": "TIPO_CAMBIO_FIX",
  "id_serie": "SF43718",
  "nombre": "Tipo de cambio FIX (Pesos por Dólar)",
  "unidad": "Pesos por dólar",
  "fecha": "28/09/2026",
  "valor": "17.8413"
}
```

Así, cuando el modelo responde "el dólar está en 17.84", tú puedes ir al SIE, buscar `SF43718` y
comprobarlo. Un número con fuente vale mucho más que un número.

## Seis herramientas, solo lectura

El servidor expone seis herramientas: tipo de cambio, inflación, UDIS, tasas de interés, reservas
internacionales y una genérica, `consultar_serie_sie`, que trae cualquier serie por ID y rango de
fechas. Todas son de solo lectura: un agente no puede hacer nada peligroso con ellas.

## Dos formas de usarlo

**Sin instalar nada:** hay un endpoint público con transporte `streamable-http`. En Claude Desktop
basta con:

```json
{
  "mcpServers": {
    "banxico": {
      "type": "streamable-http",
      "url": "https://banxico-mcp.duckdns.org/mcp"
    }
  }
}
```

**En local**, con tu propio token gratuito del SIE:

```bash
uvx mcp-banxico
```

## Dos cosas que me costaron (y te pueden costar)

Al probar el endpoint a mano con curl o Postman:

1. El header `mcp-session-id` es obligatorio a partir de la segunda petición. Sin él, la respuesta
   es `400`.
2. Si mandas `Accept: application/json` a secas, obtienes `406`. El servidor exige aceptar
   `application/json` **y** `text/event-stream`, porque la respuesta llega como evento SSE.

## Verlo funcionar

Grabé [un video de diez minutos sin cortes](https://www.youtube.com/watch?v=saaD665cn9g) donde un
modelo local (Qwen 2.5 en Ollama) y Claude Desktop pasan de "no tengo acceso en tiempo real" a
responder con el tipo de cambio oficial. El momento clave está en el minuto 2:52.

Hoy mcp-banxico tiene más de 1,700 descargas al mes en PyPI. El código está en
[GitHub](https://github.com/nanisadw3/mcp-banxico).
