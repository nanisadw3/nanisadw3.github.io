// Pure helpers for fetch-live.mjs, kept separate so they can be unit tested.

/**
 * Combines freshly fetched sources with the previous snapshot. A source that failed this run
 * (null) keeps its previous value, so a flaky API never blanks out the site.
 */
export function mergeSources(prev, fresh, now) {
  const out = {};
  for (const [key, value] of Object.entries(fresh)) {
    out[key] = value ? { ...value, fetchedAt: now } : (prev[key] ?? null);
  }
  return out;
}

/** Streamable-HTTP MCP servers answer either plain JSON or an SSE stream with `data:` lines. */
export function parseSse(body) {
  const trimmed = body.trim();
  if (trimmed.startsWith("{")) return JSON.parse(trimmed);
  const data = trimmed
    .split("\n")
    .filter((l) => l.startsWith("data:"))
    .map((l) => l.slice(5).trim())
    .pop();
  if (!data) throw new Error(`no data line in MCP response: ${trimmed.slice(0, 120)}`);
  return JSON.parse(data);
}

/** Aggregates per-repo language byte counts into rounded percentages, largest first. */
export function summarizeLanguages(repos) {
  const totals = new Map();
  for (const repo of repos) {
    for (const { size, node } of repo.languages.edges) {
      const cur = totals.get(node.name) ?? { name: node.name, color: node.color, bytes: 0 };
      cur.bytes += size;
      totals.set(node.name, cur);
    }
  }
  const sum = [...totals.values()].reduce((a, l) => a + l.bytes, 0) || 1;
  return [...totals.values()]
    .sort((a, b) => b.bytes - a.bytes)
    .map((l) => ({ name: l.name, color: l.color, percent: Math.round((l.bytes / sum) * 1000) / 10 }));
}
