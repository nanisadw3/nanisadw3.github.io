---
title: mcp-banxico
summary: Servidor MCP en PyPI que conecta a Claude, Cursor y cualquier agente de IA con la API oficial del Banco de México. Cada respuesta trae su fecha de corte y el ID de serie oficial.
order: 1
featured: true
caseStudy: true
image: ../../../assets/projects/mcp-banxico.jpg
imageAlt: Página de mcp-banxico con el endpoint remoto público
tags: [MCP, Python, PyPI, Open Source]
metric: 1.7k descargas/mes
links:
  github: https://github.com/nanisadw3/mcp-banxico
  pypi: https://pypi.org/project/mcp-banxico/
  demo: https://inakisobera.me/mcp-banxico/
  video: https://www.youtube.com/watch?v=saaD665cn9g
---

## Problema

Los asistentes de IA no saben cuánto vale hoy el dólar. Si les preguntas por el tipo de cambio, la
inflación o las UDIS, responden con datos viejos de su entrenamiento o, peor, con un número
inventado. Para cualquier uso financiero en México eso es inaceptable: la referencia oficial es el
Banco de México, y una respuesta sin fuente ni fecha no sirve.

## Solución

mcp-banxico es un servidor de **Model Context Protocol** que le da a cualquier cliente compatible
(Claude Desktop, Cursor, Cline, Gemini CLI) acceso directo al Sistema de Información Económica
(SIE) de Banxico. No es un scraper ni un espejo de terceros: consulta la fuente oficial y cada
respuesta incluye la **fecha de corte** y el **ID de la serie**, así que se puede auditar.

Expone seis herramientas de solo lectura:

| Herramienta | Qué consulta |
|---|---|
| `tipo_cambio_usd` | Tipo de cambio peso-dólar (FIX) |
| `inflacion_mexico` | Inflación del INPC, anual o mensual |
| `valor_udis` | Valor de la UDI |
| `tasa_interes_banxico` | Tasa objetivo y TIIE |
| `reservas_internacionales` | Reservas internacionales |
| `consultar_serie_sie` | Cualquier serie del SIE por ID y rango de fechas |

## Arquitectura

Hay dos formas de usarlo:

- **Local**, con `uvx mcp-banxico` o `pip install mcp-banxico`, usando el token gratuito del SIE.
  El cliente habla con el servidor por stdio (JSON-RPC).
- **Endpoint remoto público** en `https://banxico-mcp.duckdns.org/mcp`, con transporte
  `streamable-http`. No requiere instalar nada ni sacar token; tiene límite de peticiones por IP y
  corre en infraestructura propia (Linux, Nginx y TLS).

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

## Resultados

- **Más de 1,700 descargas al mes** en PyPI (octubre de 2026).
- Incluido en la lista [TensorBlock/awesome-mcp-servers](https://github.com/TensorBlock/awesome-mcp-servers).
- Base de otros proyectos: [Banxico al Día](/proyectos/banxico-al-dia/) usa sus series, y el
  agente [Gordito](/proyectos/gordito/) lo integra como herramienta.
- Un [video de diez minutos sin cortes](https://www.youtube.com/watch?v=saaD665cn9g) muestra a un
  modelo local (Qwen 2.5 en Ollama) y a Claude Desktop pasar de "no tengo acceso en tiempo real" a
  responder con el tipo de cambio oficial.

## Stack

Python 3.10+, SDK oficial de MCP, API REST del SIE de Banxico, publicación en PyPI, Nginx y
Let's Encrypt para el endpoint remoto.
