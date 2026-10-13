---
title: Two more Linux kernel patches, that makes three
description: Greg Kroah-Hartman accepted two more of my patches to the rtl8723bs driver. This time the hard part wasn't the code, it was sending them against the right branch.
date: 2026-10-13
tags: [Linux, Kernel, Open Source]
---

A few weeks ago I wrote about [how my first kernel patch got accepted](/en/blog/parche-kernel-linux/).
On October 13, 2026 two emails from Greg Kroah-Hartman arrived with the same line: "I've just added
the patch to my staging tree". That makes three.

## What I changed

Both are in the `rtl8723bs` driver again, the Realtek wifi chip that lives in `staging`:

```
staging: rtl8723bs: remove unused EEPROM definitions
staging: rtl8723bs: remove unused PCI ASPM OSC definitions
```

- **EEPROM:** `RTL8712_EEPROM_ID`, two `HWSET` sizes, `CLOCK_RATE` and five EEPROM opcodes left
  over from the vendor's original driver and used nowhere. I kept `HWSET_MAX_SIZE_512` because
  `EEPROM_MAX_SIZE` expands to it. **12 lines gone.**
- **PCI ASPM:** three macros describing how PCI power saving is arbitrated between the OS and the
  driver. This driver is SDIO only, it never touches PCI, and the macros weren't referenced
  anywhere in the tree. **5 lines gone.**

Together with the first one that's **32 lines of dead code out of the kernel** and zero behavior
changes.

## What I learned this time

I had written these two back in September, on top of an old branch. Before sending them I had to:

- **Rebase them onto `staging-testing`**, Greg's branch, not onto Linus's tree, which lags weeks
  behind. A patch against the wrong base may not apply, or may fix something already fixed.
- **Search the mailing list archive** to make sure nobody had sent them already. In `staging` it
  happens a lot: someone sends nearly the same patch a week before you.
- **Build the driver with `W=1`** and get `checkpatch.pl --strict` to zero warnings.

I sent them as a two-patch series on October 6 and a week later they were accepted.

## Where they are

- [`f1124ffde07`](https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git/commit/?id=f1124ffde0749eaf910ad1e7ab4c7e9ed0449a9b): remove unused EEPROM definitions
- [`e6b71a87395`](https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git/commit/?id=e6b71a873954d6193e1f40b1f095138ef9c73d71): remove unused PCI ASPM OSC definitions

They're in `staging-testing` now. From there they move to `staging-next`, then linux-next, and in
the next merge window they land in Linus's tree along with the first one.
