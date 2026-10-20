---
title: "Itzamná: los datos públicos de México, listos para la IA"
description: Después de mcp-banxico quise ir más allá de un solo servidor. Itzamná es el proyecto que va a juntar todas las fuentes oficiales de México en servidores MCP de código abierto.
date: 2026-10-20
tags: [MCP, IA, Datos abiertos, Open Source]
---

<p align="center"><img src="/images/itzamna.svg" alt="Logo de Itzamná: una greca escalonada en morado y azul" width="160" height="160" style="width:160px;height:160px;border-radius:36px;margin:0 auto"></p>

Cuando publiqué [mcp-banxico](/blog/como-conecte-claude-a-banxico/) me di cuenta de algo: la parte
difícil no fue conectar a Claude con el Banco de México, fue hacer que cada respuesta dijera **de
dónde salió el dato y de qué fecha es**. Eso es lo que convierte a un asistente de IA en algo en lo
que puedes confiar para tomar decisiones.

Y Banxico es solo una fuente. México tiene muchas más: el INEGI, el SAT, los precios de la gasolina,
las compras del gobierno. Pregúntale hoy a cualquier modelo por cualquiera de ellas y te va a
contestar con mucha seguridad… y muchas veces con un número viejo o inventado.

## La idea

En lugar de un servidor suelto, quiero construir **una familia de servidores MCP**, uno por cada
fuente pública importante de México, que sigan las mismas reglas:

- **Ningún dato sin fuente.** Cada respuesta trae la serie o el registro oficial y su fecha de corte.
- **Código abierto y gratis.** Licencia MIT, paquetes en PyPI y endpoints públicos sin registro.
- **Hechos en México, en español**, para los casos de uso de aquí: facturas, CETES, inflación,
  negocios de tu colonia.

El primero ya existe: mcp-banxico, con más de mil descargas al mes en PyPI. Los siguientes son
**mcp-inegi** (indicadores económicos y el directorio de más de 5 millones de negocios), **mcp-sat**
(para saber si una factura es válida y si el emisor está en la lista 69-B) y **mcp-gasolina**
(precios por estación).

## Por qué Itzamná

Itzamná era el dios maya de la sabiduría. Según la tradición, **inventó la escritura y el
calendario**: la forma de dejar registro de lo que se sabe y de cuándo pasó. Es justo lo que quiero
que hagan estos servidores para la IA.

El logo es una greca escalonada, el *xicalcoliuhqui*, que aparece en templos de todo México.

## Hacia dónde va

1. **Servidores MCP** para las principales fuentes públicas del país.
2. **El agente Itzamná:** un asistente que funcione con cualquier modelo (Claude, GPT, Gemini o uno
   local con Ollama) y que, antes de contestar algo de México, siempre consulte la fuente oficial.
3. **Más adelante**, un modelo abierto afinado para usar estas herramientas.

No voy a entrenar un modelo desde cero: eso cuesta millones. El valor no está en el modelo, está en
los datos limpios y en las herramientas que cualquier modelo puede usar.

El proyecto vive en [github.com/itzamna-mx](https://github.com/itzamna-mx) y tiene su propia
[página aquí](/itzamna/). Si trabajas con datos de México y hay una fuente que te gustaría ver
conectada a la IA, escríbeme.
