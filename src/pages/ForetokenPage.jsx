// Hand-written (not generated): vakastudio.com/foretoken, the Foretoken overview and waitlist.
import React from "react";
import { joinWaitlist } from "../waitlist.js";
import { FtHeader, FtFooter, C, section, h2, lead, card, cardTitle, cardBody } from "./FtChrome.jsx";

const features = [
  { big: "Minutes", title: "Straight from the source", body: "New models, launches, research and outages, picked up from official channels minutes after they go out." },
  { big: "1 glance", title: "Visual, not walls of text", body: "Each story is a card: key numbers, a short table or chart, and three short bullets in our own words." },
  { big: "3 levels", title: "You know how sure it is", body: "Every story says whether it is official, confirmed by several outlets, or a single unconfirmed report." },
  { big: "≤ 7", title: "Calm alerts", body: "Only the stories that matter, never more than seven alerts a day. You choose the companies." },
];

const faq = [
  ["What is Foretoken?", "An iPhone app that shows what just happened in AI, as short visual cards, and what forecasters think happens next."],
  ["Which companies does it follow?", "The twelve biggest AI companies and their models at launch, from official blogs, release notes, model hubs and status pages, plus trusted news outlets."],
  ["What are the forecasts?", "Display-only probabilities shown as context for a story. In the US they come from public Polymarket market data; in India from Manifold community forecasts, which use play money. Foretoken has no trading, no betting, no deposits and no links to trading sites."],
  ["Do I need an account?", "No. Open the app and start reading. You only sign in if you want to save stories across devices."],
  ["Is it free?", "Yes. The news, trust labels and alerts are free. An optional Premium plan adds extras later."],
  ["When does it launch?", "Later in 2026, on iPhone. Join the waitlist and we’ll send you one email on launch day."],
];

class ForetokenPage extends React.Component {
  state = { open: 0, joined: false };

  render() {
    const join = (e) => joinWaitlist(e, this, "foretoken");
    return (
      <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <FtHeader active="foretoken" />
        <main id="main">
          <section style={{ ...section, padding: "clamp(48px,7vw,96px) clamp(20px,4vw,48px) 32px", display: "flex", flexDirection: "column", gap: "28px" }}>
            <span style={{ alignSelf: "flex-start", height: "36px", padding: "0 16px", borderRadius: "18px", background: C.card, display: "flex", alignItems: "center", fontSize: "15px", fontWeight: "700", color: C.orangeText }}>Coming soon to iPhone</span>
            <h1 style={{ margin: "0", fontSize: "clamp(64px,10vw,160px)", fontWeight: "800", letterSpacing: "-0.055em", lineHeight: "0.84" }}>
              Foretoken<span style={{ color: C.orange }}>.</span>
            </h1>
            <p style={lead}>What just happened in AI, in one glance. And what forecasters think happens next.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <a href="#get" style={{ height: "52px", padding: "0 24px", borderRadius: "26px", background: C.orange, color: C.ink, display: "flex", alignItems: "center", fontSize: "17px", fontWeight: "800" }}>Join the waitlist</a>
              <a href="#faq" style={{ height: "52px", padding: "0 22px", borderRadius: "26px", background: C.card, display: "flex", alignItems: "center", fontSize: "17px", fontWeight: "700" }}>Questions</a>
            </div>
          </section>

          <section style={{ ...section, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "12px" }}>
            {features.map((f) => (
              <div key={f.title} style={card}>
                <span style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-0.04em", color: C.orangeText }}>{f.big}</span>
                <span style={cardTitle}>{f.title}</span>
                <p style={cardBody}>{f.body}</p>
              </div>
            ))}
          </section>

          <section id="faq" style={{ ...section, display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start", scrollMarginTop: "80px" }}>
            <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "15px", fontWeight: "700", color: C.orangeText }}>Good to know</span>
              <h2 style={h2}>Questions.</h2>
            </div>
            <div style={{ flex: "2 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
              {faq.map(([q, a], i) => {
                const open = this.state.open === i;
                const toggle = () => this.setState({ open: open ? -1 : i });
                return (
                  <div key={q} onClick={toggle} role="button" tabIndex={0} aria-expanded={open}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
                    style={{ background: C.card, borderRadius: "26px", padding: "0 24px", cursor: "pointer" }}>
                    <div style={{ minHeight: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "12px 0" }}>
                      <span style={cardTitle}>{q}</span>
                      <span style={{ width: "36px", height: "36px", borderRadius: "18px", background: open ? C.orange : "#EAE2D3", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", transform: `rotate(${open ? 45 : 0}deg)`, transition: "transform .2s" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </div>
                    {open ? <p style={{ ...cardBody, padding: "0 50px 22px 0" }}>{a}</p> : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="get" style={{ ...section, padding: "72px clamp(20px,4vw,48px) 96px", scrollMarginTop: "80px" }}>
            <div style={{ borderRadius: "48px", background: C.ink, color: C.bg, padding: "clamp(32px,5vw,72px)", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "620px" }}>
                <h2 style={{ ...h2, fontSize: "clamp(48px,6.4vw,96px)" }}>Be first to know.</h2>
                <p style={{ margin: "0", fontSize: "20px", fontWeight: "500", lineHeight: "1.45", color: C.dim }}>One email on launch day. Nothing else, ever.</p>
              </div>
              <div style={{ flex: "1 1 320px", maxWidth: "460px" }}>
                {this.state.joined ? (
                  <div style={{ borderRadius: "32px", background: "#FF5A2E", color: C.ink, padding: "28px", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.025em" }}>You’re on the list. See you on launch day.</div>
                ) : (
                  <form onSubmit={join} noValidate style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label htmlFor="ft-email" style={{ fontSize: "14px", fontWeight: "700", color: C.dim }}>Email address</label>
                    <input id="ft-email" type="email" required placeholder="you@example.com" style={{ height: "64px", borderRadius: "32px", border: "none", background: C.bg, color: C.ink, padding: "0 26px", font: "600 19px 'Bricolage Grotesque',system-ui,sans-serif", outline: "none" }} />
                    <button type="submit" style={{ height: "64px", borderRadius: "32px", border: "none", background: "#FF5A2E", color: C.ink, font: "800 19px 'Bricolage Grotesque',system-ui,sans-serif", cursor: "pointer" }}>Join the waitlist</button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
        <FtFooter />
      </div>
    );
  }
}

export default ForetokenPage;
