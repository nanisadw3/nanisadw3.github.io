import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeSources, parseSse, summarizeLanguages } from "./live-lib.mjs";

test("mergeSources keeps the previous value of a source that failed", () => {
  const prev = { github: { followers: 30 }, pypi: { lastMonth: 1500 } };
  const fresh = { github: { followers: 35 }, pypi: null };
  const out = mergeSources(prev, fresh, "2026-10-09T12:00:00.000Z");
  assert.equal(out.github.followers, 35);
  assert.equal(out.pypi.lastMonth, 1500);
  assert.equal(out.github.fetchedAt, "2026-10-09T12:00:00.000Z");
  assert.equal(out.pypi.fetchedAt, undefined);
});

test("mergeSources returns null for a source that never succeeded", () => {
  const out = mergeSources({}, { xerebro: null }, "t");
  assert.equal(out.xerebro, null);
});

test("parseSse extracts the JSON-RPC message from an event stream", () => {
  const body = 'event: message\ndata: {"jsonrpc":"2.0","id":2,"result":{"ok":true}}\n\n';
  assert.deepEqual(parseSse(body), { jsonrpc: "2.0", id: 2, result: { ok: true } });
});

test("parseSse also accepts a plain JSON body", () => {
  assert.deepEqual(parseSse('{"id":1}'), { id: 1 });
});

test("summarizeLanguages aggregates bytes and returns percentages, biggest first", () => {
  const repos = [
    { languages: { edges: [{ size: 300, node: { name: "Python", color: "#3572A5" } }, { size: 100, node: { name: "Java", color: "#b07219" } }] } },
    { languages: { edges: [{ size: 600, node: { name: "Python", color: "#3572A5" } }] } },
  ];
  const langs = summarizeLanguages(repos);
  assert.deepEqual(langs[0], { name: "Python", color: "#3572A5", percent: 90 });
  assert.deepEqual(langs[1], { name: "Java", color: "#b07219", percent: 10 });
});
