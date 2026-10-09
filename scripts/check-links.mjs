// Checks that every internal link and asset referenced from dist/**/*.html resolves to a file,
// and that the legacy URLs the old site exposed still exist. Run after `astro build`.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;

const LEGACY = [
  "/mcp-banxico/",
  "/cv/cv_inaki_sobera.pdf",
  "/cr/eCertificate.pdf",
  "/cr/inaki_sobera_cr_linux.pdf",
  "/cr/inaki_sobera_cr_python.pdf",
  "/og-image.jpg",
  "/googlee4033e5a981dc905.html",
  "/CNAME",
  "/robots.txt",
  "/sitemap-index.xml",
];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const base = join(DIST, clean);
  const candidates = clean.endsWith("/")
    ? [join(base, "index.html")]
    : [base, `${base}.html`, join(base, "index.html")];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}

const broken = [];
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (url.startsWith("//")) continue;
    if (!resolves(url)) broken.push(`${file.replace(DIST, "/")} -> ${url}`);
  }
  for (const [, set] of html.matchAll(/srcset="([^"]*)"/g)) {
    for (const part of set.split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url.startsWith("/") && !resolves(url)) broken.push(`${file.replace(DIST, "/")} -> ${url}`);
    }
  }
}
for (const url of LEGACY) {
  if (!resolves(url)) broken.push(`legacy URL missing -> ${url}`);
}

if (broken.length) {
  console.error(`✖ ${broken.length} broken link(s):\n${[...new Set(broken)].join("\n")}`);
  process.exit(1);
}
console.log(`✓ internal links OK (${htmlFiles(DIST).length} pages, ${LEGACY.length} legacy URLs)`);
