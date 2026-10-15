// Builds src/ into dist/.
//   <!-- vars key="value" -->        page variables (first line of a page)
//   <!-- @partial name k="v" -->     include src/partials/name.html with extra variables
//   <!-- @apps-grid -->              one card per app in src/apps.json
//   <!-- @get slug -->               an app's closing card: waitlist form while "soon", App Store button when "live"
//   {{name}}                         variable
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createHash } from "node:crypto";

const SRC = "src", OUT = "dist", ORIGIN = "https://vakastudio.com";
const apps = JSON.parse(readFileSync(join(SRC, "apps.json"), "utf8"));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(SRC, "assets"), join(OUT, "assets"), { recursive: true });
cpSync(join(SRC, "assets", "favicon.svg"), join(OUT, "favicon.svg"));
for (const f of ["_headers", "_redirects", "robots.txt"]) {
  try { cpSync(join(SRC, f), join(OUT, f)); } catch { /* optional */ }
}
mkdirSync(join(OUT, "assets", "fonts"), { recursive: true });
for (const w of [400, 500]) {
  cpSync(join("node_modules", "@fontsource", "geist", "files", `geist-latin-${w}-normal.woff2`), join(OUT, "assets", "fonts", `geist-${w}.woff2`));
}

const v = createHash("sha256")
  .update(readFileSync(join(SRC, "assets", "site.css")))
  .update(readFileSync(join(SRC, "assets", "site.js")))
  .digest("hex").slice(0, 10);

const partials = Object.fromEntries(
  readdirSync(join(SRC, "partials")).map((f) => [f.replace(/\.html$/, ""), readFileSync(join(SRC, "partials", f), "utf8")])
);

const check = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>';
const appsGrid = () => `<div class="apps">${apps.map((a) => `
      <a class="app-card" href="/${a.slug}">
        <img src="${a.icon}" alt="" width="64" height="64">
        <div><h3>${esc(a.name)}</h3><p>${esc(a.tagline)}</p></div>
        <span class="status ${a.status}">${a.status === "live" ? "On the App Store" : "Coming soon"}</span>
      </a>`).join("")}
      <div class="app-card next" aria-label="More apps in the works">
        <span class="next-icon" aria-hidden="true"></span>
        <div><h3>Next app</h3><p>In the works. One small, useful thing at a time.</p></div>
        <span class="status soon">Later</span>
      </div>
    </div>`;
const getCard = (slug) => {
  const a = apps.find((x) => x.slug === slug);
  if (!a) throw new Error(`unknown app: ${slug}`);
  const action = a.status === "live"
    ? `<a class="btn btn-ink btn-lg" href="${esc(a.appStore)}">Download on the App Store</a>`
    : `<form class="waitlist" data-app="${a.slug}" novalidate>
        <label class="sr-only" for="wl-${a.slug}">Email address</label>
        <div class="wl">
          <input id="wl-${a.slug}" type="email" name="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="you@example.com" required maxlength="254" aria-describedby="wl-${a.slug}-note">
          <div class="hp" aria-hidden="true"><input type="text" name="website" tabindex="-1" autocomplete="off"></div>
          <button class="btn btn-ink" type="submit">Join the waitlist</button>
        </div>
        <div class="wl-done" role="status">${check}You’re on the list. See you on launch day.</div>
        <p class="wl-note" id="wl-${a.slug}-note" aria-live="polite"></p>
      </form>`;
  return `<section class="wrap" id="get" aria-labelledby="get-h">
    <div class="sky cta">
      <img class="cta-icon" src="${a.icon}" alt="" width="72" height="72">
      <span class="tag">${a.status === "live" ? "Free on iPhone" : "Coming soon to iPhone"}</span>
      <h2 class="h2" id="get-h">${esc(a.ctaHeading)}</h2>
      <p class="lead">${a.status === "live" ? `${esc(a.name)} is free. No ads, no account.` : `Get one email when ${esc(a.name)} launches. Then we delete your address.`}</p>
      ${action}
    </div>
  </section>`;
};

const fill = (html, vars, depth = 0) => {
  if (depth > 5) throw new Error("partial nesting too deep");
  return html
    .replace(/<!-- @apps-grid -->/g, appsGrid)
    .replace(/<!-- @get ([\w-]+) -->/g, (_, slug) => getCard(slug))
    .replace(/<!-- @partial ([\w-]+)((?: \w+="[^"]*")*) -->/g, (_, name, attrs) => {
      if (!(name in partials)) throw new Error(`unknown partial: ${name}`);
      const local = { ...vars };
      for (const [, k, val] of attrs.matchAll(/ (\w+)="([^"]*)"/g)) local[k] = val;
      return fill(partials[name], local, depth + 1);
    })
    .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
};

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const urls = [];
for (const file of walk(join(SRC, "pages"))) {
  const rel = relative(join(SRC, "pages"), file);
  let html = readFileSync(file, "utf8");
  const vars = { v };
  html = html.replace(/^<!-- vars((?: \w+="[^"]*")+) -->\n?/, (_, attrs) => {
    for (const [, k, val] of attrs.matchAll(/ (\w+)="([^"]*)"/g)) vars[k] = val;
    return "";
  });
  const out = fill(html, vars);
  const left = out.match(/<!-- @(partial|apps-grid|get)|\{\{\w+\}\}/);
  if (left) throw new Error(`${rel}: unfilled marker ${left[0]}`);
  // pretty URLs without a trailing slash: lastmark/index.html -> lastmark.html (served at /lastmark)
  const dest = rel !== "index.html" && rel.endsWith("/index.html") ? rel.replace(/\/index\.html$/, ".html") : rel;
  mkdirSync(dirname(join(OUT, dest)), { recursive: true });
  writeFileSync(join(OUT, dest), out);
  if (dest !== "404.html") urls.push(dest === "index.html" ? "/" : "/" + dest.replace(/\.html$/, ""));
  console.log("built", dest);
}
urls.sort((a, b) => a.length - b.length || a.localeCompare(b));
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc></url>`).join("\n")}
</urlset>
`);
