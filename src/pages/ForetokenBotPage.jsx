// Hand-written (not generated): vakastudio.com/foretoken/bot, the page linked from the ForetokenBot user agent.
import React from "react";
import { FtHeader, FtFooter, C, section, h2, lead, card, cardTitle, cardBody } from "./FtChrome.jsx";

const code = { font: "600 16px ui-monospace,SFMono-Regular,Menlo,monospace", background: "#EAE2D3", borderRadius: "8px", padding: "2px 8px", wordBreak: "break-word" };

const facts = [
  { title: "What it reads", body: "Feeds and pages that publishers offer for automated reading: RSS and Atom feeds, release notes, public APIs and status pages. It reads the title, link, date and a short summary of each new item." },
  { title: "What it never does", body: "It never republishes your articles, never copies headlines or opening lines, never logs in and never gets around paywalls, bot checks or rate limits." },
  { title: "How often", body: "Most feeds are checked every 2 minutes, slower ones up to once an hour, with at most two requests at a time per site. It honors Crawl-delay and sends If-None-Match and If-Modified-Since, so an unchanged feed costs you a 304 and no body." },
  { title: "robots.txt", body: "ForetokenBot follows robots.txt (RFC 9309) for the product token ForetokenBot, and re-reads it every 24 hours. Any 401, 403 or 429 response stops it from reading that feed until a person reviews it." },
];

class ForetokenBotPage extends React.Component {
  render() {
    return (
      <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <FtHeader active="bot" />
        <main id="main">
          <section style={{ ...section, padding: "clamp(48px,7vw,96px) clamp(20px,4vw,48px) 32px", display: "flex", flexDirection: "column", gap: "28px" }}>
            <h1 style={{ margin: "0", fontSize: "clamp(56px,9vw,140px)", fontWeight: "800", letterSpacing: "-0.055em", lineHeight: "0.86" }}>
              ForetokenBot<span style={{ color: C.orange }}>.</span>
            </h1>
            <p style={lead}>
              The crawler behind <a href="/foretoken" style={{ color: C.orangeText, textDecoration: "underline", textUnderlineOffset: "4px" }}>Foretoken</a>, an AI news app from Vaka Studio. It checks public feeds for new AI announcements so the app can point readers to the original source.
            </p>
            <p style={{ ...cardBody, fontSize: "18px" }}>User agent: <span style={code}>ForetokenBot/&lt;version&gt; (+https://vakastudio.com/foretoken/bot)</span></p>
          </section>

          <section style={{ ...section, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "12px" }}>
            {facts.map((f) => (
              <div key={f.title} style={card}>
                <span style={cardTitle}>{f.title}</span>
                <p style={cardBody}>{f.body}</p>
              </div>
            ))}
          </section>

          <section style={{ ...section, display: "flex", flexDirection: "column", gap: "18px" }}>
            <h2 style={h2}>Block or limit it.</h2>
            <p style={{ ...cardBody, maxWidth: "720px" }}>Add this to your robots.txt and ForetokenBot stops within 24 hours:</p>
            <pre style={{ ...code, display: "block", padding: "18px 22px", borderRadius: "18px", margin: "0", maxWidth: "720px", whiteSpace: "pre-wrap" }}>{"User-agent: ForetokenBot\nDisallow: /"}</pre>
            <p style={{ ...cardBody, maxWidth: "720px" }}>
              Requests come from <span style={code}>204.168.251.178</span> (Hetzner, Helsinki). Prefer another feed, a slower rate, or want us to stop? Email{" "}
              <a href="mailto:support@vakastudio.com?subject=ForetokenBot" style={{ color: C.orangeText, fontWeight: "700", textDecoration: "underline", textUnderlineOffset: "4px" }}>support@vakastudio.com</a>{" "}
              and we’ll act on it within two working days.
            </p>
          </section>
          <div style={{ height: "72px" }} />
        </main>
        <FtFooter />
      </div>
    );
  }
}

export default ForetokenBotPage;
