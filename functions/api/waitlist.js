// POST /api/waitlist  { app, email, source, website }
// One endpoint for every Vaka Studio app. Stores (app, email) once; the response never reveals whether an email was already there.

import apps from "../../src/apps.json";

const APPS = new Set(apps.filter((a) => a.status === "soon").map((a) => a.slug));   // waitlists open for apps not yet live
const MAX_PER_HOUR = 8;                      // per IP, all apps combined
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,63}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost({ request, env }) {
  // Same-origin only: browsers always send Origin on a cross-site POST.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: "Not allowed." }, 403);

  if ((request.headers.get("content-type") || "").split(";")[0] !== "application/json") {
    return json({ error: "Expected JSON." }, 415);
  }
  const raw = await request.text();
  if (raw.length > 2048) return json({ error: "Request too large." }, 413);

  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: "Invalid request." }, 400); }

  const app = String(body.app || "").toLowerCase();
  const email = String(body.email || "").trim().toLowerCase();
  const source = /^[a-z0-9_-]{1,32}$/.test(String(body.source || "")) ? String(body.source) : "direct";

  // Honeypot: bots fill every field. Pretend success so they learn nothing.
  if (body.website) return json({ ok: true });

  if (!APPS.has(app)) return json({ error: "Unknown app." }, 400);
  if (email.length > 254 || !EMAIL.test(email)) return json({ error: "Please enter a valid email address." }, 400);

  const db = env.DB;
  if (!db) return json({ error: "Waitlist is not configured yet." }, 503);

  // Rate limit by salted, hourly-rotating IP hash. The raw IP is never stored.
  const now = Math.floor(Date.now() / 1000);
  const hour = Math.floor(now / 3600);
  const ip = request.headers.get("cf-connecting-ip") || "local";
  const key = await sha256(`${env.RATE_SALT || "dev-salt"}|${ip}|${hour}`);
  const row = await db
    .prepare(
      `INSERT INTO waitlist_rate (key, hits, expires_at) VALUES (?1, 1, ?2)
       ON CONFLICT(key) DO UPDATE SET hits = hits + 1
       RETURNING hits`
    )
    .bind(key, now + 86400)
    .first();
  if (row && row.hits > MAX_PER_HOUR) return json({ error: "Too many tries." }, 429);

  await db
    .prepare("INSERT INTO waitlist (app, email, source) VALUES (?1, ?2, ?3) ON CONFLICT(app, email) DO NOTHING")
    .bind(app, email, source)
    .run();

  // Housekeeping: drop expired rate rows now and then.
  if (Math.random() < 0.05) await db.prepare("DELETE FROM waitlist_rate WHERE expires_at < ?1").bind(now).run();

  // Same answer for new and existing emails, so nobody can probe who signed up.
  return json({ ok: true });
}

// Any other method (POST is handled above, which takes precedence).
export const onRequest = () => json({ error: "Method not allowed." }, 405);
