import express from 'express';
import { pool, runMigrations, waitForDatabase } from './db.js';
import {
  createBlob,
  deleteExpired,
  getBlobAndCountView,
  getByShortIds,
  getStats,
  listPopular,
  listRecent,
} from './blobs.js';
import { rateLimit } from './ratelimit.js';

const PORT = Number(process.env.PORT ?? 8080);
const MAX_CONTENT_BYTES = 1024 * 1024;
const MAX_TITLE_LENGTH = 100;
const MAX_LIST_LIMIT = 50;
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000;

const app = express();

// Requests arrive through nginx_proxy (and Cloudflare in front of it), so the
// client address has to come from X-Forwarded-For for rate limiting to work.
app.set('trust proxy', true);
app.disable('x-powered-by');

app.use(express.json({ limit: '2mb' }));

const parseLimit = (raw: unknown, fallback: number): number => {
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 1) return fallback;
  return Math.min(Math.floor(value), MAX_LIST_LIMIT);
};

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'degraded' });
  }
});

app.post(
  '/api/blobs',
  rateLimit({ windowMs: 10 * 60 * 1000, max: 30, message: 'Too many blobs created. Please try again later.' }),
  async (req, res) => {
    const { content, title, isPublic, expiresAt } = req.body ?? {};

    if (content === undefined || content === null) {
      res.status(400).json({ message: 'content is required' });
      return;
    }

    if (Buffer.byteLength(JSON.stringify(content), 'utf8') > MAX_CONTENT_BYTES) {
      res.status(413).json({ message: 'JSON size exceeds 1MB limit' });
      return;
    }

    if (title !== undefined && title !== null && typeof title !== 'string') {
      res.status(400).json({ message: 'title must be a string' });
      return;
    }

    let parsedExpiry: string | null = null;
    if (expiresAt !== undefined && expiresAt !== null) {
      const date = new Date(expiresAt);
      if (Number.isNaN(date.getTime())) {
        res.status(400).json({ message: 'expiresAt must be a valid date' });
        return;
      }
      parsedExpiry = date.toISOString();
    }

    try {
      const blob = await createBlob({
        content,
        title: typeof title === 'string' && title.trim() ? title.trim().slice(0, MAX_TITLE_LENGTH) : null,
        isPublic: isPublic !== false,
        expiresAt: parsedExpiry,
      });
      res.status(201).json(blob);
    } catch (error) {
      console.error('Failed to create blob:', error);
      res.status(500).json({ message: 'Failed to save JSON' });
    }
  }
);

const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  message: 'Too many requests. Please slow down.',
});

app.get('/api/blobs/recent', readLimiter, async (req, res) => {
  try {
    res.json(await listRecent(parseLimit(req.query.limit, 10)));
  } catch (error) {
    console.error('Failed to list recent blobs:', error);
    res.status(500).json({ message: 'Failed to load blobs' });
  }
});

app.get('/api/blobs/popular', readLimiter, async (req, res) => {
  try {
    res.json(await listPopular(parseLimit(req.query.limit, 10)));
  } catch (error) {
    console.error('Failed to list popular blobs:', error);
    res.status(500).json({ message: 'Failed to load blobs' });
  }
});

app.get('/api/blobs/stats', readLimiter, async (_req, res) => {
  try {
    res.json(await getStats());
  } catch (error) {
    console.error('Failed to load stats:', error);
    res.status(500).json({ message: 'Failed to load stats' });
  }
});

app.get('/api/blobs/lookup', readLimiter, async (req, res) => {
  const raw = typeof req.query.ids === 'string' ? req.query.ids : '';
  const ids = raw
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, MAX_LIST_LIMIT);

  if (ids.length === 0) {
    res.json([]);
    return;
  }

  try {
    res.json(await getByShortIds(ids));
  } catch (error) {
    console.error('Failed to look up blobs:', error);
    res.status(500).json({ message: 'Failed to load blobs' });
  }
});

app.get('/api/blobs/:shortId', readLimiter, async (req, res) => {
  try {
    const blob = await getBlobAndCountView(req.params.shortId);
    if (!blob) {
      res.status(404).json({ message: 'Blob not found' });
      return;
    }
    res.json(blob);
  } catch (error) {
    console.error('Failed to load blob:', error);
    res.status(500).json({ message: 'Failed to load blob' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const start = async () => {
  await waitForDatabase();
  await runMigrations();

  const runCleanup = async () => {
    try {
      const removed = await deleteExpired();
      if (removed > 0) console.log(`Removed ${removed} expired blob(s)`);
    } catch (error) {
      console.error('Expired blob cleanup failed:', error);
    }
  };

  await runCleanup();
  setInterval(runCleanup, CLEANUP_INTERVAL_MS).unref();

  app.listen(PORT, () => {
    console.log(`jsonformatter-api listening on ${PORT}`);
  });
};

start().catch((error) => {
  console.error('Fatal startup error:', error);
  process.exit(1);
});
