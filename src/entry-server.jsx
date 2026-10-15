import React from "react";
import { renderToString } from "react-dom/server";
import { routes } from "./routes.jsx";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function render(route) {
  const { Page } = route;
  const html = renderToString(<React.StrictMode><Page /></React.StrictMode>);
  const url = `https://vakastudio.com${route.path}`;
  const head = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.desc)}">`,
    route.noindex ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.desc)}">`,
    `<meta property="og:url" content="${url}">`,
  ].join("\n");
  return { html, head };
}

export { routes };
