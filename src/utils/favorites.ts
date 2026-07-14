// Client-side favorite/pinned tools, stored in localStorage. Nothing uploaded.

const KEY = 'jf_favorites_v1';

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): void {
  try {
    const current = getFavorites();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [slug, ...current];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('jf-favorites-changed'));
  } catch {
    /* ignore storage errors */
  }
}
