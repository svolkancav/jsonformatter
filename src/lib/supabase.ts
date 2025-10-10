import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured: boolean = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export const generateShortId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

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
  title?: string;
  isPublic?: boolean;
  expiresAt?: string | null;
}

export interface BlobStats {
  total_blobs: number;
  blobs_today: number;
  total_views: number;
}

export const saveJsonBlob = async (
  jsonContent: any,
  options: SaveBlobOptions = {}
): Promise<JsonBlob & { url: string }> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Sharing is unavailable: Supabase is not configured.');
  }
  const shortId = generateShortId();

  const { data, error } = await supabase
    .from('json_blobs')
    .insert({
      short_id: shortId,
      content: jsonContent,
      title: options.title || null,
      is_public: options.isPublic !== false,
      expires_at: options.expiresAt || null,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    ...data,
    url: `${window.location.origin}/blob/${shortId}`,
  };
};

export const getJsonBlob = async (shortId: string): Promise<JsonBlob> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Content storage is not configured.');
  }
  const { data, error } = await supabase
    .from('json_blobs')
    .select('*')
    .eq('short_id', shortId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Blob not found');

  await supabase.rpc('increment_blob_views', { blob_short_id: shortId });

  return data;
};

export const getRecentBlobs = async (limit: number = 10): Promise<JsonBlob[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from('json_blobs')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

export const getPopularBlobs = async (limit: number = 10): Promise<JsonBlob[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from('json_blobs')
    .select('*')
    .eq('is_public', true)
    .order('views', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

export const getBlobStats = async (): Promise<BlobStats> => {
  if (!isSupabaseConfigured || !supabase) {
    return { total_blobs: 0, blobs_today: 0, total_views: 0 };
  }
  const { data, error } = await supabase.rpc('get_blob_stats').single();

  if (error) throw error;
  return data as BlobStats;
};

export const getBlobsByIds = async (shortIds: string[]): Promise<JsonBlob[]> => {
  if (shortIds.length === 0) return [];
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('json_blobs')
    .select('*')
    .in('short_id', shortIds)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};
