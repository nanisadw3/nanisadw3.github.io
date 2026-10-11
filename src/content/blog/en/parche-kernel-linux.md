---
title: I sent a patch to the Linux kernel and it got accepted
description: It was 15 deleted lines in a staging driver, but Greg Kroah-Hartman accepted it and it's now in linux-next.
date: 2026-09-23
tags: [Linux, Kernel, Open Source]
---

I use Arch (yes, I know). And for a while I'd had this itch to contribute to the kernel, even with
something tiny. On September 23, 2026 it finally happened.

## What I changed

The patch is called:

```
staging: rtl8723bs: remove unused NDIS association and auth defines
```

In plain words: the `rtl8723bs` driver (a Realtek wifi chip that lives in `staging`, the part of the
kernel where drivers that still need cleanup go) had a bunch of `#define`s nobody used. I deleted
them. **One file, 15 lines removed, zero added.**

Sounds small? It is. And that's exactly why it's a good first patch: `staging` exists so people can
help clean up code, and removing dead code is one of the most useful things you can do there.

## The part that isn't so small

The patch is the easy bit; the process is what takes effort:

- No pull requests: patches are sent **by email**, as plain text, to the mailing list and the right
  maintainers.
- The message format matters a lot: the subsystem prefix, a clear description and your
  `Signed-off-by`.
- You have to show that nobody actually uses what you're deleting, and that everything still builds.

Greg Kroah-Hartman, the `staging` maintainer, accepted it as commit
[`6f18b14bf35a`](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=6f18b14bf35a)
in linux-next. You can see the [message on the list](https://lkml.iu.edu/2609.2/21330.html).

## Why I'm telling you

Because a lot of people think contributing to the kernel is only for gurus. It isn't: there are
tasks meant for getting started. The hard part isn't the code, it's working up the nerve to send
that first email.
