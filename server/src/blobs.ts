import { pool } from './db.js';

export interface JsonBlob {
  id: string;
  short_id: string;
  content: unknown;
  title: string | null;
  created_at: string;
  expires_at: string | null;
  views: number;
  is_public: boolean;
}

export interface CreateBlobInput {
  content: unknown;
  title: string | null;
  isPublic: boolean;
  expiresAt: string | null;
}

export interface BlobStats {
  total_blobs: number;
  blobs_today: number;
  total_views: number;
}

const SHORT_ID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const SHORT_ID_LENGTH = 8;
const UNIQUE_VIOLATION = '23505';

// Generated here rather than in the browser so the id stays authoritative and a
// collision can be retried against the unique index.
const generateShortId = (): string => {
  let result = '';
  for (let i = 0; i < SHORT_ID_LENGTH; i++) {
    result += SHORT_ID_CHARS.charAt(Math.floor(Math.random() * SHORT_ID_CHARS.length));
  }
  return result;
};

export const createBlob = async (input: CreateBlobInput): Promise<JsonBlob> => {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const { rows } = await pool.query<JsonBlob>(
        `INSERT INTO json_blobs (short_id, content, title, is_public, expires_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [generateShortId(), JSON.stringify(input.content), input.title, input.isPublic, input.expiresAt]
      );
      return rows[0];
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code !== UNIQUE_VIOLATION) throw error;
    }
  }
  throw new Error('Could not allocate a unique short id');
};

// One statement so the view count is incremented atomically. `is_public` is
// deliberately not filtered here: it controls listing visibility, not link
// access — anyone holding the link can open the blob.
export const getBlobAndCountView = async (shortId: string): Promise<JsonBlob | null> => {
  const { rows } = await pool.query<JsonBlob>(
    `UPDATE json_blobs
     SET views = views + 1
     WHERE short_id = $1 AND (expires_at IS NULL OR expires_at > NOW())
     RETURNING *`,
    [shortId]
  );
  return rows[0] ?? null;
};

const listPublic = async (orderBy: 'created_at' | 'views', limit: number): Promise<JsonBlob[]> => {
  const { rows } = await pool.query<JsonBlob>(
    `SELECT * FROM json_blobs
     WHERE is_public = true AND (expires_at IS NULL OR expires_at > NOW())
     ORDER BY ${orderBy} DESC
     LIMIT $1`,
    [limit]
  );
  return rows;
};

export const listRecent = (limit: number): Promise<JsonBlob[]> => listPublic('created_at', limit);

export const listPopular = (limit: number): Promise<JsonBlob[]> => listPublic('views', limit);

export const getStats = async (): Promise<BlobStats> => {
  const { rows } = await pool.query<BlobStats>(
    `SELECT
       COUNT(*)::int AS total_blobs,
       COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::int AS blobs_today,
       COALESCE(SUM(views), 0)::int AS total_views
     FROM json_blobs
     WHERE is_public = true AND (expires_at IS NULL OR expires_at > NOW())`
  );
  return rows[0];
};

// Backs the "My Blobs" list, whose short ids are held in the visitor's
// localStorage — so private blobs belong in the result too.
export const getByShortIds = async (shortIds: string[]): Promise<JsonBlob[]> => {
  const { rows } = await pool.query<JsonBlob>(
    `SELECT * FROM json_blobs
     WHERE short_id = ANY($1::text[]) AND (expires_at IS NULL OR expires_at > NOW())
     ORDER BY created_at DESC`,
    [shortIds]
  );
  return rows;
};

export const deleteExpired = async (): Promise<number> => {
  const { rowCount } = await pool.query('DELETE FROM json_blobs WHERE expires_at IS NOT NULL AND expires_at <= NOW()');
  return rowCount ?? 0;
};
