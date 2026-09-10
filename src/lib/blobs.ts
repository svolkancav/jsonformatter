// Client for the self-hosted blob API (server/). Same-origin by default: nginx
// proxies /api on jsonformater.com to the jsonformatter_api container.
const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '').replace(/\/+$/, '');

const endpoint = (path: string): string => `${API_BASE}/api${path}`;

export interface JsonBlob {
  id: string;
  short_id: string;
  content: any;
  title: string | null;
  created_at: string;
  expires_at: string | null;
  views: number;
  is_public: boolean;
}

export interface SaveBlobOptions {
  title?: string | null;
  isPublic?: boolean;
  expiresAt?: string | null;
}

export interface BlobStats {
  total_blobs: number;
  blobs_today: number;
  total_views: number;
}

const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body = await response.json();
    if (body && typeof body.message === 'string') return body.message;
  } catch {
    // Non-JSON error body (e.g. an nginx 502 page); fall through to the status.
  }
  return `Request failed with status ${response.status}`;
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(endpoint(path), init);
  if (!response.ok) throw new Error(await readErrorMessage(response));
  return (await response.json()) as T;
};

export const saveJsonBlob = async (
  jsonContent: any,
  options: SaveBlobOptions = {}
): Promise<JsonBlob & { url: string }> => {
  const blob = await request<JsonBlob>('/blobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: jsonContent,
      title: options.title ?? null,
      isPublic: options.isPublic !== false,
      expiresAt: options.expiresAt ?? null,
    }),
  });

  return {
    ...blob,
    url: `${window.location.origin}/blob/${blob.short_id}`,
  };
};

export const getJsonBlob = (shortId: string): Promise<JsonBlob> =>
  request<JsonBlob>(`/blobs/${encodeURIComponent(shortId)}`);

export const getRecentBlobs = (limit: number = 10): Promise<JsonBlob[]> =>
  request<JsonBlob[]>(`/blobs/recent?limit=${limit}`);

export const getPopularBlobs = (limit: number = 10): Promise<JsonBlob[]> =>
  request<JsonBlob[]>(`/blobs/popular?limit=${limit}`);

export const getBlobStats = (): Promise<BlobStats> => request<BlobStats>('/blobs/stats');

export const getBlobsByIds = async (shortIds: string[]): Promise<JsonBlob[]> => {
  if (shortIds.length === 0) return [];
  const ids = shortIds.map((id) => encodeURIComponent(id)).join(',');
  return request<JsonBlob[]>(`/blobs/lookup?ids=${ids}`);
};
