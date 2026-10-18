// Hand-written (not generated): header and footer for the Foretoken pages, in the same look as the design pages.
import React from "react";

const pill = { height: "40px", padding: "0 14px", borderRadius: "20px", display: "flex", alignItems: "center", fontSize: "16px", fontWeight: "600" };

export const C = { bg: "#F3EDE2", ink: "#16130F", orange: "#FF4B1F", orangeText: "#C8360F", muted: "#6B6358", body: "#4A443C", card: "#FFFCF6", dim: "#A89F92" };

function Mark() {
  return (
    <span style={{ display: "grid", gridTemplateColumns: "repeat(2,10px)", gap: "3px" }}>
      <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: C.ink }} />
      <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: C.orange }} />
      <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: C.ink }} />
      <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: C.ink }} />
    </span>
  );
}

export function FtHeader({ active }) {
  const nav = [
    { id: "foretoken", t: "Foretoken", href: "/foretoken" },
    { id: "bot", t: "ForetokenBot", href: "/foretoken/bot" },
    { id: "home", t: "Vaka Studio", href: "/" },
  ];
  return (
    <header style={{ position: "sticky", top: "0", zIndex: "50", background: C.bg, borderBottom: "1px solid rgba(22,19,15,0.08)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px clamp(20px,4vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Mark />
          <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.035em" }}>Vaka Studio</span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
          {nav.map((n) => (
            <a key={n.id} href={n.href} style={{ ...pill, ...(n.id === active ? { fontWeight: "700", background: C.card } : {}) }}>{n.t}</a>
          ))}
        </nav>
        <a href="mailto:support@vakastudio.com" style={{ height: "44px", padding: "0 18px", borderRadius: "22px", border: `2px solid ${C.ink}`, display: "flex", alignItems: "center", fontSize: "16px", fontWeight: "700" }}>Contact</a>
      </div>
    </header>
  );
}

export function FtFooter() {
  const cols = [
    { h: "Foretoken", links: [{ t: "Overview", href: "/foretoken" }, { t: "Waitlist", href: "/foretoken#get" }, { t: "ForetokenBot", href: "/foretoken/bot" }] },
    { h: "Apps", links: [{ t: "LastMark", href: "/lastmark" }, { t: "All apps", href: "/#apps" }] },
    { h: "Studio", links: [{ t: "About", href: "/studio" }, { t: "Contact", href: "mailto:support@vakastudio.com" }] },
  ];
  return (
    <footer style={{ borderTop: "1px solid rgba(22,19,15,0.1)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px clamp(20px,4vw,48px) 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "380px" }}>
          <span style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-0.035em" }}>Vaka Studio</span>
          <span style={{ fontSize: "17px", fontWeight: "500", lineHeight: "1.45", color: C.muted }}>Small apps for everyday life. Calm, private and made to last.</span>
          <a href="mailto:support@vakastudio.com" style={{ fontSize: "17px", fontWeight: "700", color: C.orangeText, textDecoration: "underline", textUnderlineOffset: "4px" }}>support@vakastudio.com</a>
        </div>
        {cols.map((col) => (
          <div key={col.h} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: C.muted }}>{col.h}</span>
            {col.links.map((l) => <a key={l.t} href={l.href} style={{ fontSize: "17px", fontWeight: "600" }}>{l.t}</a>)}
          </div>
        ))}
      </div>
      <div style={{ background: C.ink, color: C.dim }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "18px clamp(20px,4vw,48px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", fontSize: "14px", fontWeight: "600" }}>
          <span>© 2026 Vaka Studio. All rights reserved.</span><span>Made for iPhone</span>
        </div>
      </div>
    </footer>
  );
}

export const section = { maxWidth: "1280px", margin: "0 auto", padding: "64px clamp(20px,4vw,48px) 24px" };
export const h2 = { margin: "0", fontSize: "clamp(40px,5.4vw,76px)", fontWeight: "800", letterSpacing: "-0.045em", lineHeight: "0.92", textWrap: "balance" };
export const lead = { margin: "0", fontSize: "clamp(19px,1.7vw,23px)", fontWeight: "500", lineHeight: "1.45", color: C.muted, maxWidth: "680px", textWrap: "pretty" };
export const card = { background: C.card, borderRadius: "26px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" };
export const cardTitle = { fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em", lineHeight: "1.25" };
export const cardBody = { margin: "0", fontSize: "17px", fontWeight: "500", lineHeight: "1.55", color: C.body, textWrap: "pretty" };
