// One-time copy of json_blobs rows out of Supabase into the self-hosted
// database. Safe to re-run: rows that already exist are skipped.
//
// Usage (from /opt/jsonformatter on the app server):
//   docker compose run --rm \
//     -e SUPABASE_URL=https://<project>.supabase.co \
//     -e SUPABASE_KEY=<anon-or-service-role-key> \
//     jsonformatter_api node scripts/migrate-from-supabase.mjs
//
// The anon key is subject to row-level security, which on this table exposed
// only public, unexpired rows — pass a service_role key to copy everything.
import pg from 'pg';

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/+$/, '');
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const PAGE_SIZE = 500;

if (!SUPABASE_URL || !SUPABASE_KEY || !DATABASE_URL) {
  console.error('SUPABASE_URL, SUPABASE_KEY and DATABASE_URL are all required');
  process.exit(1);
}

const fetchPage = async (offset) => {
  const url = `${SUPABASE_URL}/rest/v1/json_blobs?select=*&order=created_at.asc&limit=${PAGE_SIZE}&offset=${offset}`;
  const response = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!response.ok) {
    throw new Error(`Supabase responded ${response.status}: ${await response.text()}`);
  }
  return response.json();
};

const pool = new pg.Pool({ connectionString: DATABASE_URL });

let offset = 0;
let fetched = 0;
let inserted = 0;

try {
  for (;;) {
    const rows = await fetchPage(offset);
    if (rows.length === 0) break;
    fetched += rows.length;

    for (const row of rows) {
      // Preserves id, short_id, created_at and views so existing share links
      // and counters survive the move.
      const result = await pool.query(
        `INSERT INTO json_blobs (id, short_id, content, title, created_at, expires_at, views, is_public)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT DO NOTHING`,
        [
          row.id,
          row.short_id,
          JSON.stringify(row.content),
          row.title,
          row.created_at,
          row.expires_at,
          row.views ?? 0,
          row.is_public ?? true,
        ]
      );
      inserted += result.rowCount ?? 0;
    }

    console.log(`fetched ${fetched}, inserted ${inserted}`);
    if (rows.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  const { rows: totals } = await pool.query('SELECT COUNT(*)::int AS count FROM json_blobs');
  console.log(`\nDone. Read ${fetched} row(s) from Supabase, inserted ${inserted} new.`);
  console.log(`Local table now holds ${totals[0].count} row(s).`);
} catch (error) {
  console.error('Migration failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
