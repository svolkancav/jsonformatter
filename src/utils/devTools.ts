// Small client-side helpers for the utility tools (Base64, UUID, timestamp, diff).

export function base64Encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

export function base64Decode(input: string): string {
  const clean = input.trim();
  let binary: string;
  try {
    binary = atob(clean);
  } catch {
    throw new Error('Invalid Base64 — the input contains characters that are not valid Base64.');
  }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function generateUuids(count: number): string {
  const n = Math.max(1, Math.min(count, 1000));
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(crypto.randomUUID());
  return out.join('\n');
}

// Accepts a Unix timestamp in seconds or milliseconds and returns readable dates.
export function timestampToHuman(input: string): string {
  const trimmed = input.trim();
  const n = Number(trimmed);
  if (!trimmed || !Number.isFinite(n)) {
    throw new Error('Enter a numeric Unix timestamp (seconds or milliseconds).');
  }
  const ms = trimmed.replace('-', '').length > 12 ? n : n * 1000;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) throw new Error('That timestamp is out of range.');
  return [
    `ISO 8601 (UTC): ${d.toISOString()}`,
    `UTC:            ${d.toUTCString()}`,
    `Local:          ${d.toString()}`,
    `Unix (seconds): ${Math.floor(ms / 1000)}`,
    `Unix (millis):  ${ms}`,
  ].join('\n');
}

// Accepts a date string (or leaves blank for "now") and returns the Unix timestamp.
export function dateToTimestamp(input: string): string {
  const trimmed = input.trim();
  const d = trimmed ? new Date(trimmed) : new Date();
  if (Number.isNaN(d.getTime())) {
    throw new Error('Could not parse that date. Try a format like 2026-07-01 or 2026-07-01T10:00:00Z.');
  }
  const ms = d.getTime();
  return [
    `Unix (seconds): ${Math.floor(ms / 1000)}`,
    `Unix (millis):  ${ms}`,
    `ISO 8601 (UTC): ${d.toISOString()}`,
  ].join('\n');
}

function isContainer(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function walk(a: unknown, b: unknown, path: string, out: string[]): void {
  if (deepEqual(a, b)) return;
  const label = path || '(root)';
  if (a === undefined) {
    out.push(`+ ${label}: ${JSON.stringify(b)}`);
    return;
  }
  if (b === undefined) {
    out.push(`- ${label}: ${JSON.stringify(a)}`);
    return;
  }
  if (isContainer(a) && isContainer(b) && Array.isArray(a) === Array.isArray(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const childPath = path ? `${path}.${k}` : k;
      walk((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], childPath, out);
    }
    return;
  }
  out.push(`~ ${label}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
}

export function jsonDiff(aStr: string, bStr: string): string {
  let a: unknown;
  let b: unknown;
  try {
    a = JSON.parse(aStr);
  } catch (e) {
    throw new Error(`Left JSON is invalid: ${e instanceof Error ? e.message : 'parse error'}`);
  }
  try {
    b = JSON.parse(bStr);
  } catch (e) {
    throw new Error(`Right JSON is invalid: ${e instanceof Error ? e.message : 'parse error'}`);
  }
  const out: string[] = [];
  walk(a, b, '', out);
  if (out.length === 0) return 'No differences — the two JSON documents are identical.';
  return [
    `${out.length} difference${out.length === 1 ? '' : 's'} found:`,
    '(  +  added on the right,  -  removed on the right,  ~  changed )',
    '',
    ...out,
  ].join('\n');
}
