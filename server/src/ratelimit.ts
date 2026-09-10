import type { RequestHandler } from 'express';

interface Bucket {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

// Fixed-window counter kept in process memory. The API runs as a single
// container, so there is nothing to share across instances; if that changes
// this needs to move into Postgres or Redis.
export const rateLimit = ({ windowMs, max, message }: RateLimitOptions): RequestHandler => {
  const buckets = new Map<string, Bucket>();

  const prune = (now: number) => {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  };

  setInterval(() => prune(Date.now()), windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip ?? 'unknown';
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (bucket.count >= max) {
      res.setHeader('Retry-After', Math.ceil((bucket.resetAt - now) / 1000));
      res.status(429).json({ message });
      return;
    }

    bucket.count += 1;
    next();
  };
};
