-- One waitlist for every app; rows are separated by app.
CREATE TABLE IF NOT EXISTS waitlist (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  app        TEXT NOT NULL,
  email      TEXT NOT NULL,
  source     TEXT NOT NULL DEFAULT 'direct',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (app, email)
);

-- Short-lived rate limit counters, keyed by a salted hash of the client IP.
CREATE TABLE IF NOT EXISTS waitlist_rate (
  key        TEXT PRIMARY KEY,   -- sha256(salt + ip + hour)
  hits       INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL    -- unix seconds
);
