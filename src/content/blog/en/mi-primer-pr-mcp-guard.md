---
title: My first PR merged into a project that isn't mine
description: I added deny rules to MCP Guard, a security scanner for MCP servers. It closed an open issue and got merged the same day.
date: 2026-09-18
tags: [Open Source, MCP, Security]
---

Until September 2026, every PR on my GitHub was mine, to my own repos (including the famous
"Create uno.txt" ones from 2024). On September 18 that changed.

## The project

[MCP Guard](https://github.com/yunaremaia/mcp-guard) is a security scanner for MCP servers by
[yunaremaia](https://github.com/yunaremaia). It checks which MCP servers and tools you
have configured and warns you if something smells off. It had an open issue, #10: being able to
**deny** specific servers or tools.

## What I did

[PR #35](https://github.com/yunaremaia/mcp-guard/pull/35) adds deny rules:

- Exact matches, wildcards and per-server tools (deny just `server/dangerous-tool` without
  blocking the whole server).
- YAML configuration plus CLI flags.
- If something denied shows up, the finding fails CI. If it doesn't break the build, nobody pays
  attention.

It was merged less than an hour after I opened it.

## What I learned

Contributing to someone else's repo is a different sport. You have to read how the code is
organized, follow its style even if you'd do it differently, and write the PR so the maintainer
understands it without having to ask you anything. That same day I submitted
[mcp-banxico](/en/blog/como-conecte-claude-a-banxico/) to the *awesome* MCP lists. And five days
later I went for something bigger: [the Linux kernel](/en/blog/parche-kernel-linux/).
