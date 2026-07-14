import { TOOLS } from '../data/toolsRegistry';

// Client-side "recent activity" — stored only in the browser's localStorage,
// never uploaded. Lets returning users reopen their recent work.

export interface HistoryItem {
  id: string;
  toolPath: string;
  toolLabel: string;
  preview: string;
  input: string;
  ts: number;
}

const KEY = 'jf_history_v1';
const MAX_ITEMS = 12;
const MAX_INPUT = 20000; // cap stored input so localStorage doesn't bloat

const BY_SLUG = new Map(TOOLS.map((t) => [t.slug, t.label]));

function labelForPath(path: string): string {
  const slug = path.replace(/^\/+/, '').split('/').pop() ?? '';
  if (BY_SLUG.has(slug)) return BY_SLUG.get(slug)!;
  // Fallback: prettify the slug (covers /tr, /de, /es and misc pages)
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Tool';
}

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function recordHistory(toolPath: string, input: string): void {
  try {
    if (!input || !input.trim()) return;
    const capped = input.slice(0, MAX_INPUT);
    const preview = input.trim().replace(/\s+/g, ' ').slice(0, 100);
    const items = getHistory().filter((i) => !(i.toolPath === toolPath && i.input === capped));
    items.unshift({
      id: `${Date.now()}-${items.length}`,
      toolPath,
      toolLabel: labelForPath(toolPath),
      preview,
      input: capped,
      ts: Date.now(),
    });
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
    window.dispatchEvent(new Event('jf-history-changed'));
  } catch {
    /* ignore storage errors (private mode, quota) */
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event('jf-history-changed'));
  } catch {
    /* ignore */
  }
}
