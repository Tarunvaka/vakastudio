// Converts design .dc.html files into React components in src/design/.
//   node scripts/import-design.mjs <design folder>
// Each .dc.html holds an <x-dc> template ({{ value }}, <sc-for>, <sc-if>, <dc-import>) and a
// `class Component extends DCLogic` script. Templates become JSX; the script becomes a React class.
// Generated files are overwritten on every import; site-specific changes live in REWRITES below.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { parseFragment } from "parse5";

const [, , srcDir] = process.argv;
if (!srcDir) { console.error("usage: node scripts/import-design.mjs <design folder>"); process.exit(1); }
const OUT = "src/design";

// Design file -> component name. Pages map to site routes in src/routes.jsx.
const FILES = {
  "Vaka Studio Home.dc.html": "HomePage",
  "LastMark Page.dc.html": "LastMarkPage",
  "Support Page.dc.html": "SupportPage",
  "Privacy Page.dc.html": "PrivacyPage",
  "Studio Page.dc.html": "StudioPage",
  "404 Page.dc.html": "NotFoundPage",
  "LMScreen.dc.html": "LMScreen",
};

// Links between design files become site URLs.
const LINKS = {
  "Vaka%20Studio%20Home.dc.html": "/",
  "LastMark%20Page.dc.html": "/lastmark",
  "Support%20Page.dc.html": "/lastmark/support",
  "Privacy%20Page.dc.html": "/lastmark/privacy",
  "Studio%20Page.dc.html": "/studio",
  "404%20Page.dc.html": "/404",
};
const rewriteLinks = (s) => s.replace(/(Vaka%20Studio%20Home|LastMark%20Page|Support%20Page|Privacy%20Page|Studio%20Page|404%20Page)\.dc\.html/g, (m) => LINKS[m]);

// Behaviour the design only mocks: the waitlist form posts to the real API.
const REWRITES = [
  [/join: e => \{ e\.preventDefault\(\); this\.setState\(\{ joined: true \}\); \}/g, "join: (e) => joinWaitlist(e, this)"],
];

const ATTR = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", maxlength: "maxLength",
  autocomplete: "autoComplete", autofocus: "autoFocus", colspan: "colSpan", rowspan: "rowSpan", srcset: "srcSet",
  crossorigin: "crossOrigin", spellcheck: "spellCheck", inputmode: "inputMode", enterkeyhint: "enterKeyHint",
  onclick: "onClick", onsubmit: "onSubmit", onchange: "onChange", oninput: "onInput", onkeydown: "onKeyDown",
  onmouseenter: "onMouseEnter", onmouseleave: "onMouseLeave", onfocus: "onFocus", onblur: "onBlur",
  "xlink:href": "xlinkHref", "xml:space": "xmlSpace",
};
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const attrName = (n) => ATTR[n] ?? (n.startsWith("data-") || n.startsWith("aria-") ? n : camel(n));

// {{ expr }} -> JS. Loop variables stay bare; everything else comes from renderVals() as v.*
const expr = (e, loops) => {
  e = e.trim();
  if (/^(true|false|null|undefined|-?\d+(\.\d+)?)$/.test(e)) return e;
  const root = e.split(/[.[\s]/)[0];
  return loops.has(root) ? e : `v.${e}`;
};
const MUSTACHE = /\{\{\s*(.*?)\s*\}\}/g;
const onlyExpr = (s) => { const m = /^\{\{\s*(.*?)\s*\}\}$/.exec(s.trim()); return m ? m[1] : null; };
const tmpl = (s, loops) => "`" + s.replace(/[`\\]/g, "\\$&").replace(/\$\{/g, "\\${").replace(MUSTACHE, (_, e) => "${" + expr(e, loops) + "}") + "`";
const valueJsx = (s, loops) => {
  const only = onlyExpr(s);
  if (only !== null) return `{${expr(only, loops)}}`;
  if (MUSTACHE.test(s)) { MUSTACHE.lastIndex = 0; return `{${tmpl(s, loops)}}`; }
  return JSON.stringify(rewriteLinks(s));
};

const splitStyle = (s) => {
  const out = []; let cur = ""; let depth = 0; let q = null;
  for (const ch of s) {
    if (q) { if (ch === q) q = null; cur += ch; continue; }
    if (ch === "'" || ch === '"') { q = ch; cur += ch; continue; }
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
};
const styleJsx = (s, loops) => {
  const parts = splitStyle(s).map((d) => {
    const i = d.indexOf(":"); if (i < 0) return null;
    const k = d.slice(0, i).trim(); const val = d.slice(i + 1).trim();
    if (!k) return null;
    const key = k.startsWith("--") ? JSON.stringify(k) : JSON.stringify(camel(k.startsWith("-webkit-") ? "Webkit" + k.slice(7) : k.startsWith("-ms-") ? "ms" + k.slice(3) : k));
    MUSTACHE.lastIndex = 0;
    const v = MUSTACHE.test(val) ? tmpl(val, loops) : JSON.stringify(val);
    return `${key}: ${v}`;
  }).filter(Boolean);
  return `{{ ${parts.join(", ")} }}`;
};

const textJsx = (t, loops) => {
  if (!t.trim()) return /\n/.test(t) ? "" : '{" "}';
  return t.split(/(\{\{\s*.*?\s*\}\})/).map((seg) => {
    const only = onlyExpr(seg);
    if (only !== null) return `{${expr(only, loops)}}`;
    if (!seg) return "";
    return /[{}<>&]|^\s|\s$/.test(seg) ? `{${JSON.stringify(seg)}}` : seg;
  }).join("");
};

const imports = new Set();
const emit = (node, loops) => {
  if (node.nodeName === "#text") return textJsx(node.value, loops);
  if (node.nodeName === "#comment") return "";
  const tag = node.tagName;
  if (!tag || tag === "helmet" || tag === "template" || tag === "script") return "";
  const attrs = Object.fromEntries((node.attrs || []).map((a) => [a.prefix ? `${a.prefix}:${a.name}` : a.name, a.value]));
  const kids = (n) => (n.childNodes || []).map((c) => emit(c, loops)).join("");
  if (tag === "sc-for") {
    const as = attrs.as || "item";
    const inner = new Set(loops); inner.add(as);
    const body = (node.childNodes || []).map((c) => emit(c, inner)).join("");
    return `{(${expr(onlyExpr(attrs.list) ?? attrs.list, loops)} || []).map((${as}, ${as}Index) => <React.Fragment key={${as}Index}>${body}</React.Fragment>)}`;
  }
  if (tag === "sc-if") {
    return `{${expr(onlyExpr(attrs.value) ?? attrs.value, loops)} ? <>${kids(node)}</> : null}`;
  }
  if (tag === "dc-import") {
    const name = attrs.name; imports.add(name);
    const props = Object.entries(attrs).filter(([k]) => k !== "name" && !k.startsWith("hint-"))
      .map(([k, val]) => `${camel(k)}=${valueJsx(val, loops)}`).join(" ");
    return `<${name} ${props} />`;
  }
  const props = Object.entries(attrs).filter(([k]) => !k.startsWith("hint-")).map(([k, val]) => {
    const n = attrName(k);
    if (n === "style") return `style=${styleJsx(val, loops)}`;
    if (val === "" || val === k) return n === "required" || n === "disabled" || n === "checked" || n === "readOnly" || n === "autoFocus" ? n : `${n}=${JSON.stringify(val)}`;
    return `${n}=${valueJsx(val, loops)}`;
  }).join(" ");
  // Clickable non-buttons (the design's FAQ rows) get keyboard and screen-reader support.
  let a11y = "";
  if (attrs.onclick && tag !== "a" && tag !== "button") {
    const h = expr(onlyExpr(attrs.onclick) ?? attrs.onclick, loops);
    a11y = ` role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ${h}(e); } }}`;
    const exp = /\.toggle$/.test(h) ? h.replace(/\.toggle$/, ".open") : null;
    if (exp) a11y += ` aria-expanded={!!${exp}}`;
  }
  const open = (props ? `<${tag} ${props}` : `<${tag}`) + a11y;
  const children = tag === "template" ? "" : kids(node.content || node);
  if (VOID.has(tag) || !children) return `${open} />`;
  return `${open}>${children}</${tag}>`;
};

mkdirSync(OUT, { recursive: true });
for (const [file, name] of Object.entries(FILES)) {
  const src = readFileSync(join(srcDir, file), "utf8");
  const tm = /<x-dc(?:\s[^>]*)?>([\s\S]*)<\/x-dc>/.exec(src);
  if (!tm) throw new Error(`${file}: no <x-dc> template`);
  const sm = /<script type="text\/x-dc" data-dc-script data-props="([^"]*)">([\s\S]*?)<\/script>/.exec(src);
  const propSpec = sm ? JSON.parse(sm[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&") || "{}") : {};
  const defaults = Object.fromEntries(Object.entries(propSpec).filter(([k, s]) => !k.startsWith("$") && s && "default" in s).map(([k, s]) => [k, s.default]));
  let logic = sm ? sm[2].trim() : "class Component extends DCLogic {}";
  for (const [re, to] of REWRITES) logic = logic.replace(re, to);
  logic = rewriteLinks(logic).replace(/class Component extends DCLogic/, `class ${name} extends React.Component`);
  imports.clear();
  const frag = parseFragment(tm[1]);
  const jsx = frag.childNodes.map((c) => emit(c, new Set())).join("");
  const hasRenderVals = /renderVals\s*\(/.test(logic);
  const usesWaitlist = logic.includes("joinWaitlist(");
  const body = logic.replace(/\}\s*$/, `
  render() {
    const v = ${hasRenderVals ? "this.renderVals()" : "{}"};
    return (<>${jsx}</>);
  }
}`);
  const head = [
    "// GENERATED by scripts/import-design.mjs from the design file \"" + file + "\". Do not edit; re-import instead.",
    "/* eslint-disable */",
    'import React from "react";',
    ...[...imports].filter((i) => i !== name).map((i) => `import ${i} from "./${i}.jsx";`),
    usesWaitlist ? 'import { joinWaitlist } from "../waitlist.js";' : "",
  ].filter(Boolean).join("\n");
  const out = `${head}\n\n${body}\n${name}.defaultProps = ${JSON.stringify(defaults)};\n\nexport default ${name};\n`;
  writeFileSync(join(OUT, `${name}.jsx`), out);
  console.log("imported", file, "->", `${OUT}/${name}.jsx`);
}
