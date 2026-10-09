import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDate, getLangFromUrl, localizePath, t } from "./utils.ts";

test("localizePath builds Spanish routes without prefix", () => {
  assert.equal(localizePath("es", "home"), "/");
  assert.equal(localizePath("es", "projects"), "/proyectos/");
  assert.equal(localizePath("es", "project", "mcp-banxico"), "/proyectos/mcp-banxico/");
  assert.equal(localizePath("es", "blog"), "/blog/");
  assert.equal(localizePath("es", "post", "hola"), "/blog/hola/");
  assert.equal(localizePath("es", "about"), "/sobre-mi/");
});

test("localizePath builds English routes under /en", () => {
  assert.equal(localizePath("en", "home"), "/en/");
  assert.equal(localizePath("en", "projects"), "/en/projects/");
  assert.equal(localizePath("en", "project", "mcp-banxico"), "/en/projects/mcp-banxico/");
  assert.equal(localizePath("en", "post", "hello"), "/en/blog/hello/");
  assert.equal(localizePath("en", "about"), "/en/about/");
});

test("getLangFromUrl reads the first path segment", () => {
  assert.equal(getLangFromUrl(new URL("https://inakisobera.me/en/blog/")), "en");
  assert.equal(getLangFromUrl(new URL("https://inakisobera.me/en")), "en");
  assert.equal(getLangFromUrl(new URL("https://inakisobera.me/proyectos/")), "es");
  assert.equal(getLangFromUrl(new URL("https://inakisobera.me/entrevistas/")), "es");
});

test("t returns the string for the language", () => {
  assert.equal(t("en", "nav.projects"), "Projects");
  assert.equal(t("es", "nav.projects"), "Proyectos");
});

test("formatDate uses the locale of the language", () => {
  const d = new Date(Date.UTC(2026, 9, 9, 12));
  assert.equal(formatDate("es", d), "9 de octubre de 2026");
  assert.equal(formatDate("en", d), "October 9, 2026");
});
