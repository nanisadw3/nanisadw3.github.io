---
title: Mandé un parche al kernel de Linux y lo aceptaron
description: Fueron 15 líneas borradas en un driver de staging, pero las aceptó Greg Kroah-Hartman y ya están en linux-next.
date: 2026-09-23
tags: [Linux, Kernel, Open Source]
---

Uso Arch (sí, ya sé). Y desde hace tiempo traía la espinita de contribuir al kernel aunque fuera
con algo chiquito. El 23 de septiembre de 2026 por fin pasó.

## Qué cambié

El parche se llama:

```
staging: rtl8723bs: remove unused NDIS association and auth defines
```

En español: en el driver `rtl8723bs` (una tarjeta wifi de Realtek que vive en `staging`, la zona del
kernel donde están los drivers que todavía necesitan limpieza) había un montón de `#define` que
nadie usaba. Los borré. **Un archivo, 15 líneas eliminadas, cero agregadas.**

¿Suena a poco? Lo es. Y justo por eso es buen primer parche: `staging` existe para que la gente
pueda ayudar a limpiar código, y borrar cosas muertas es de lo más útil que puedes hacer ahí.

## Lo que no es tan chiquito

El parche es lo de menos; lo que cuesta es el proceso:

- Nada de pull requests: los parches se mandan **por correo**, en texto plano, a la lista de
  correo y a los maintainers correctos.
- El formato del mensaje importa muchísimo: el prefijo del subsistema, una descripción clara y
  tu `Signed-off-by`.
- Tienes que demostrar que de verdad nadie usa lo que borras, y que todo sigue compilando.

Lo aceptó Greg Kroah-Hartman, el maintainer de `staging`, y quedó como el commit
[`6f18b14bf35a`](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=6f18b14bf35a)
en linux-next. Puedes ver el [correo en la lista](https://lkml.iu.edu/2609.2/21330.html).

## Por qué lo cuento

Porque mucha gente cree que contribuir al kernel es solo para gurús. No: hay tareas pensadas para
empezar. Lo difícil no es el código, es animarte a mandar el primer correo.
