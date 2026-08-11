import { env } from "cloudflare:workers";

let initialized = false;

export function getD1(): D1Database {
  if (!env.DB) {
    throw new Error("O banco de dados do diagnóstico não está disponível.");
  }
  return env.DB;
}

export async function ensureDatabase(): Promise<void> {
  if (initialized) return;

  const db = getD1();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      whatsapp TEXT NOT NULL,
      marketing_consent INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS diagnostics (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL REFERENCES users(id),
      discipline INTEGER NOT NULL,
      principles INTEGER NOT NULL,
      relationships INTEGER NOT NULL,
      health INTEGER NOT NULL,
      work_money INTEGER NOT NULL,
      total INTEGER NOT NULL,
      primary_areas TEXT NOT NULL,
      general_level TEXT NOT NULL,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      price_in_cents INTEGER NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS purchases (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL REFERENCES users(id),
      product_id TEXT NOT NULL REFERENCES products(id),
      provider TEXT NOT NULL,
      provider_reference TEXT,
      amount_in_cents INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      paid_at TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS entitlements (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL REFERENCES users(id),
      product_id TEXT NOT NULL REFERENCES products(id),
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY NOT NULL,
      session_id TEXT NOT NULL,
      user_id TEXT,
      diagnostic_id TEXT,
      name TEXT NOT NULL,
      properties TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_diagnostics_user_id ON diagnostics(user_id)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_diagnostics_created_at ON diagnostics(created_at)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_events_name_created_at ON events(name, created_at)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id)"),
  ]);
  await db.prepare("PRAGMA optimize").run();
  initialized = true;
}
