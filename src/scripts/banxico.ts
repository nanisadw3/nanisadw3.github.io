// Browser client for the public mcp-banxico endpoint (Streamable HTTP, no token).
// Requires the endpoint to allow this site's origin via CORS; callers fall back to the value
// compiled into the page when the request fails.

export const BANXICO_MCP = "https://banxico-mcp.duckdns.org/mcp";

export interface Fix {
  value: number;
  date: string;
  series: string;
}

const headers = { "Content-Type": "application/json", Accept: "application/json, text/event-stream" };

function parse(body: string) {
  const text = body.trim();
  const data = text.startsWith("{") ? text : text.split("\n").filter((l) => l.startsWith("data:")).pop()?.slice(5);
  if (!data) throw new Error("empty MCP response");
  return JSON.parse(data);
}

async function post(body: object, session: string | null, signal: AbortSignal) {
  const res = await fetch(BANXICO_MCP, {
    method: "POST",
    headers: session ? { ...headers, "mcp-session-id": session } : headers,
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok && res.status !== 202) throw new Error(`HTTP ${res.status}`);
  return res;
}

export async function fetchFix(timeoutMs = 8000): Promise<Fix> {
  const signal = AbortSignal.timeout(timeoutMs);
  const init = await post(
    {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "inakisobera.me", version: "1" } },
    },
    null,
    signal,
  );
  const session = init.headers.get("mcp-session-id");
  await init.text();
  await post({ jsonrpc: "2.0", method: "notifications/initialized" }, session, signal);
  const res = await post(
    { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "tipo_cambio_usd", arguments: {} } },
    session,
    signal,
  );
  const msg = parse(await res.text());
  const text = msg.result?.content?.find((c: { type: string }) => c.type === "text")?.text;
  const fix = JSON.parse(text);
  const value = Number(fix.valor);
  if (!Number.isFinite(value)) throw new Error("unexpected payload");
  return { value, date: fix.fecha, series: fix.id_serie };
}
