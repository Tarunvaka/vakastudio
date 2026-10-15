// After `vite build` (client) and `vite build --ssr` (server), render every route to static HTML.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const template = readFileSync("dist/index.html", "utf8");
const { render, routes } = await import(pathToFileURL(join(process.cwd(), "dist-ssr/entry-server.js")).href);

const urls = [];
for (const route of routes) {
  const { html, head } = render(route);
  const page = template
    .replace("<!--head-->", head)
    .replace("__ROUTE__", route.id)
    .replace("<!--app-->", html);
  const out = join("dist", route.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page);
  if (!route.noindex) urls.push(route.path);
  console.log("prerendered", route.path, "->", out);
}
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://vakastudio.com${u}</loc></url>`).join("\n")}
</urlset>
`);
rmSync("dist-ssr", { recursive: true, force: true });
