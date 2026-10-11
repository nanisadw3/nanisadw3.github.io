---
title: Cómo conecté Claude al Banco de México
description: Los asistentes de IA no saben cuánto vale hoy el dólar. Así nació mcp-banxico, mi servidor MCP que hoy pasa de 1,700 descargas al mes.
date: 2026-09-22
tags: [MCP, Banxico, Python]
---

Haz la prueba: pregúntale a cualquier asistente de IA cuánto está el dólar hoy. En el mejor de los
casos te dice que no tiene acceso a datos en tiempo real. En el peor, te avienta un número con toda
la seguridad del mundo, sacado de quién sabe qué parte de su entrenamiento. Para platicar da igual,
pero si hay dinero de por medio no.

En México la referencia oficial es el Banco de México, y sus datos son públicos en el SIE (Sistema
de Información Económica). Lo que faltaba era el puente entre esos datos y los asistentes. Eso es
[mcp-banxico](/proyectos/mcp-banxico/).

## La línea de tiempo

- **18 de septiembre:** primer commit, `v0.1.0`. Ese mismo día abrí el PR para meterlo a las
  listas *awesome* de servidores MCP.
- **22 de septiembre:** publicación automática en PyPI con Trusted Publishing (GitHub Actions, sin
  tokens guardados). Desde ahí, `uvx mcp-banxico` y listo.
- **28 de septiembre:** aceptaron el PR en la lista de TensorBlock, y otro más para agregar el
  endpoint público.

## La regla que más me importó: que se pueda comprobar

Cada respuesta trae **la fecha del dato y el ID oficial de la serie**:

```json
{
  "serie": "TIPO_CAMBIO_FIX",
  "id_serie": "SF43718",
  "fecha": "28/09/2026",
  "valor": "17.8413"
}
```

Si el modelo te dice "el dólar está en 17.84", puedes ir al SIE, buscar `SF43718` y comprobarlo.
Un número con fuente vale muchísimo más que un número suelto.

Son seis herramientas: tipo de cambio, inflación, UDIS, tasas, reservas y una genérica para
cualquier serie del SIE. Todas de solo lectura, así que un agente no puede hacer nada peligroso
con ellas.

## Úsalo sin instalar nada

Monté un endpoint público en mi propio servidor. En Claude Desktop basta con:

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

## Dos cosas que me hicieron perder un rato

Si lo pruebas a mano con curl o Postman:

1. A partir de la segunda petición tienes que mandar el header `mcp-session-id`. Si no, `400`.
2. Si mandas solo `Accept: application/json`, te regresa `406`. Hay que aceptar `application/json`
   **y** `text/event-stream`, porque la respuesta llega como evento SSE.

## Verlo funcionar

Grabé [un video de diez minutos sin cortes](https://www.youtube.com/watch?v=saaD665cn9g) donde un
modelo local (Qwen 2.5 en Ollama) y Claude Desktop pasan de "no tengo acceso en tiempo real" a
contestar con el tipo de cambio oficial. Lo bueno empieza en el minuto 2:52.

Hoy anda arriba de las 1,700 descargas al mes en PyPI, que para un proyecto de nicho mexicano
se me hace muchísimo. El código está en [GitHub](https://github.com/nanisadw3/mcp-banxico).
