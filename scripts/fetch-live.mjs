// Fetches the site's live numbers (GitHub, PyPI, Xerebro and Banxico MCP servers) and writes
// src/data/live.json. Runs before every build; a source that fails keeps its previous value.
//
// Env: GITHUB_TOKEN (or GH_TOKEN) for the GitHub GraphQL API; XEREBRO_TOKEN for the Xerebro MCP.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { mergeSources, parseSse, summarizeLanguages } from "./live-lib.mjs";

const OUT = new URL("../src/data/live.json", import.meta.url);
const LOGIN = "nanisadw3";
const XEREBRO_MCP = "https://rag-pmx.duckdns.org/mcp";
const BANXICO_MCP = "https://banxico-mcp.duckdns.org/mcp";
const TIMEOUT_MS = 20_000;

const log = (msg) => console.log(`[live] ${msg}`);

async function fetchJson(url, init = {}) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url}`);
  return res.json();
}

async function github() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");
  const query = `{
    user(login: "${LOGIN}") {
      login createdAt followers { totalCount }
      contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
        totalCount
        nodes { name url stargazerCount pushedAt primaryLanguage { name color }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name color } } } }
      }
    }
    search(query: "author:${LOGIN} is:pr is:merged -user:${LOGIN}", type: ISSUE, first: 20) {
      nodes { ... on PullRequest { title number url mergedAt additions deletions repository { nameWithOwner } } }
    }
  }`;
  const { data, errors } = await fetchJson("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (errors?.length) throw new Error(errors.map((e) => e.message).join("; "));
  const u = data.user;
  const repos = u.repositories.nodes;
  return {
    login: u.login,
    since: u.createdAt,
    followers: u.followers.totalCount,
    repos: u.repositories.totalCount,
    stars: repos.reduce((a, r) => a + r.stargazerCount, 0),
    languages: summarizeLanguages(repos).slice(0, 6),
    contributions: u.contributionsCollection.contributionCalendar.totalContributions,
    calendar: u.contributionsCollection.contributionCalendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => [d.date, d.contributionCount]),
    ),
    repoStats: Object.fromEntries(
      repos.map((r) => [
        r.name,
        { url: r.url, stars: r.stargazerCount, pushedAt: r.pushedAt, language: r.primaryLanguage },
      ]),
    ),
    externalPrs: data.search.nodes.map((p) => ({
      repo: p.repository.nameWithOwner,
      number: p.number,
      title: p.title,
      url: p.url,
      mergedAt: p.mergedAt,
      additions: p.additions,
      deletions: p.deletions,
    })),
  };
}

async function pypi() {
  const { data } = await fetchJson("https://pypistats.org/api/packages/mcp-banxico/recent");
  return { package: "mcp-banxico", lastMonth: data.last_month, lastWeek: data.last_week };
}

/** Minimal Streamable-HTTP MCP client: initialize, then call one tool. */
async function mcpTool(url, tool, args = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const post = async (body, session) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { ...headers, ...(session ? { "mcp-session-id": session } : {}) },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok && res.status !== 202) throw new Error(`${res.status} from ${url}`);
    return res;
  };
  const init = await post({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "inakisobera.me", version: "1" } },
  });
  const session = init.headers.get("mcp-session-id");
  await init.text();
  await post({ jsonrpc: "2.0", method: "notifications/initialized" }, session);
  const res = await post({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: tool, arguments: args } }, session);
  const msg = parseSse(await res.text());
  if (msg.error) throw new Error(msg.error.message);
  if (msg.result?.isError) throw new Error(msg.result.content?.[0]?.text ?? "tool error");
  // FastMCP tools that return a JSON string put it in content[0].text (and wrap it again in
  // structuredContent.result), so parse the text block.
  const text = msg.result.content?.find((c) => c.type === "text")?.text;
  if (!text) throw new Error("tool returned no text content");
  return JSON.parse(text);
}

async function xerebro() {
  const token = process.env.XEREBRO_TOKEN;
  if (!token) throw new Error("XEREBRO_TOKEN not set");
  const c = await mcpTool(XEREBRO_MCP, "cobertura_del_corpus", {}, token);
  return {
    daysWithReport: c.dias_con_reporte,
    fragments: c.total_fragmentos,
    refineries: c.refinerias,
    firstDate: c.primera_fecha,
    lastDate: c.ultima_fecha,
    todayReport: c.reporte_de_hoy,
  };
}

async function banxico() {
  const r = await mcpTool(BANXICO_MCP, "tipo_cambio_usd");
  const value = Number(r.valor);
  if (!Number.isFinite(value)) throw new Error(`unexpected tipo_cambio_usd payload: ${JSON.stringify(r)}`);
  return { series: r.id_serie, name: r.nombre, date: r.fecha, value };
}

async function attempt(name, fn) {
  try {
    const value = await fn();
    log(`${name}: ok`);
    return value;
  } catch (err) {
    log(`${name}: kept previous value (${err.message})`);
    return null;
  }
}

const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const fresh = {
  github: await attempt("github", github),
  pypi: await attempt("pypi", pypi),
  xerebro: await attempt("xerebro", xerebro),
  banxico: await attempt("banxico", banxico),
};
writeFileSync(OUT, `${JSON.stringify(mergeSources(prev, fresh, new Date().toISOString()), null, 2)}\n`);
log(`wrote ${OUT.pathname}`);
