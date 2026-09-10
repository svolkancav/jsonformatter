import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

// Schema lives here rather than in docker-entrypoint-initdb.d: that directory
// only runs when the data volume is empty, so it would silently skip changes on
// an existing database. Applying idempotent DDL on every API boot means schema
// updates ship with the service.
const SCHEMA = `
CREATE TABLE IF NOT EXISTS json_blobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_id TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_short_id ON json_blobs(short_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON json_blobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_is_public ON json_blobs(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_views ON json_blobs(views DESC) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_expires_at ON json_blobs(expires_at) WHERE expires_at IS NOT NULL;
`;

export const runMigrations = async (): Promise<void> => {
  await pool.query(SCHEMA);
};

// Waits for Postgres to accept connections. Compose starts the containers
// together, so the API can win the race on a cold boot.
export const waitForDatabase = async (attempts = 30, delayMs = 2000): Promise<void> => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (error) {
      if (attempt === attempts) throw error;
      console.log(`Database not ready (attempt ${attempt}/${attempts}), retrying...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};
