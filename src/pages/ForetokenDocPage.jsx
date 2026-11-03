// Hand-written (not generated): Foretoken's privacy policy, terms of use and support pages
// (vakastudio.com/foretoken/{privacy,terms,support}). The text lives in src/content/foretoken/*.md,
// copied from the Foretoken repo's docs/legal/ (the source of truth); marked renders it at build time.
import React from "react";
import { marked } from "marked";
import { FtHeader, FtFooter, C, section } from "./FtChrome.jsx";
import privacy from "../content/foretoken/privacy-policy.md?raw";
import terms from "../content/foretoken/terms-of-use.md?raw";
import support from "../content/foretoken/support.md?raw";

const DOCS = { privacy, terms, support };

const css = `
.ftdoc{width:100%;max-width:760px;min-width:0;font-size:17px;line-height:1.6;color:${C.body};font-weight:500;overflow-wrap:anywhere}
.ftdoc h1{margin:0 0 8px;font-size:clamp(40px,7vw,84px);font-weight:800;letter-spacing:-0.05em;line-height:0.95;color:${C.ink}}
.ftdoc h2{margin:48px 0 12px;font-size:clamp(26px,3vw,36px);font-weight:800;letter-spacing:-0.03em;line-height:1.1;color:${C.ink}}
.ftdoc h3{margin:28px 0 8px;font-size:21px;font-weight:800;color:${C.ink}}
.ftdoc a{color:${C.orangeText};text-decoration:underline;text-underline-offset:3px}
.ftdoc ul,.ftdoc ol{padding-left:22px}
.ftdoc li{margin:6px 0}
.ftdoc strong{color:${C.ink}}
.ftdoc code{font:600 15px ui-monospace,SFMono-Regular,Menlo,monospace;background:#EAE2D3;border-radius:6px;padding:1px 6px}
.ftdoc .ftdoc-table{overflow-x:auto;max-width:100%;margin:16px 0}
.ftdoc table{border-collapse:collapse;font-size:15px;width:100%}
.ftdoc td,.ftdoc th{min-width:120px}
.ftdoc th,.ftdoc td{border-bottom:1px solid rgba(22,19,15,0.12);padding:10px 12px;text-align:left;vertical-align:top}
.ftdoc th{color:${C.ink};font-weight:700}
`;

// Stable section ids: "## 4. Forecasts are display-only" -> id="forecasts-are-display-only".
const slug = (t) => t.replace(/<[^>]+>/g, "").replace(/^\d+\.\s*/, "").toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
marked.use({ renderer: { heading({ tokens, depth }) { const text = this.parser.parseInline(tokens); return `<h${depth} id="${slug(text)}">${text}</h${depth}>\n`; } } });

function render(md) {
  const html = marked.parse(md, { gfm: true, async: false });
  return html.replace(/<table>/g, '<div class="ftdoc-table"><table>').replace(/<\/table>/g, "</table></div>");
}

class ForetokenDocPage extends React.Component {
  render() {
    const doc = this.props.doc;
    return (
      <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <style>{css}</style>
        <FtHeader active={doc} />
        <main id="main">
          <section style={{ ...section, padding: "clamp(40px,6vw,80px) clamp(16px,4vw,48px) 72px" }}>
            <article className="ftdoc" dangerouslySetInnerHTML={{ __html: render(DOCS[doc]) }} />
          </section>
        </main>
        <FtFooter />
      </div>
    );
  }
}

export const ForetokenPrivacyPage = () => <ForetokenDocPage doc="privacy" />;
export const ForetokenTermsPage = () => <ForetokenDocPage doc="terms" />;
export const ForetokenSupportPage = () => <ForetokenDocPage doc="support" />;
