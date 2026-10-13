---
title: Dos parches más al kernel de Linux, ya van tres
description: Greg Kroah-Hartman aceptó otros dos parches míos en el driver rtl8723bs. Esta vez el reto no fue el código, fue mandarlos sobre la rama correcta.
date: 2026-10-13
tags: [Linux, Kernel, Open Source]
---

Hace unas semanas conté [cómo me aceptaron mi primer parche](/blog/parche-kernel-linux/) en el
kernel. El 13 de octubre de 2026 llegaron dos correos de Greg Kroah-Hartman con la misma frase:
"acabo de agregar el parche a mi árbol staging". Ya son tres.

## Qué cambié

Los dos siguen en el driver `rtl8723bs`, la tarjeta wifi de Realtek que vive en `staging`:

```
staging: rtl8723bs: remove unused EEPROM definitions
staging: rtl8723bs: remove unused PCI ASPM OSC definitions
```

- **EEPROM:** `RTL8712_EEPROM_ID`, dos tamaños de `HWSET`, `CLOCK_RATE` y cinco opcodes de EEPROM
  que venían del driver original del fabricante y nadie usaba. Dejé `HWSET_MAX_SIZE_512` porque
  `EEPROM_MAX_SIZE` sí depende de él. **12 líneas menos.**
- **PCI ASPM:** tres macros que describen cómo se reparte el ahorro de energía de PCI entre el
  sistema y el driver. Este driver es solo SDIO, no toca PCI, y las macros no aparecían en ningún
  lado del árbol. **5 líneas menos.**

Con el primero suman **32 líneas de código muerto fuera del kernel** y cero cambios de
comportamiento.

## Lo que aprendí esta vez

Estos dos parches los tenía escritos desde septiembre, pero sobre una rama vieja. Antes de
mandarlos tuve que:

- **Rebasarlos sobre `staging-testing`**, la rama de Greg, y no sobre el árbol de Linus, que va
  semanas atrás. Si mandas un parche contra la base equivocada, puede no aplicar o arreglar algo
  que ya se arregló.
- **Buscar en el archivo de la lista** que nadie los hubiera mandado ya. En `staging` pasa
  seguido: alguien manda casi lo mismo una semana antes que tú.
- **Compilar el driver con `W=1`** y pasar `checkpatch.pl --strict` sin un solo aviso.

Los mandé como una serie de dos el 6 de octubre y una semana después estaban aceptados.

## Dónde están

- [`f1124ffde07`](https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git/commit/?id=f1124ffde0749eaf910ad1e7ab4c7e9ed0449a9b): remove unused EEPROM definitions
- [`e6b71a87395`](https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git/commit/?id=e6b71a873954d6193e1f40b1f095138ef9c73d71): remove unused PCI ASPM OSC definitions

Ahora están en `staging-testing`. De ahí pasan a `staging-next`, luego a linux-next, y en la
próxima ventana de merge entran al kernel de Linus junto con el primero.
