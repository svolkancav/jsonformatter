/*
  # JSON Blobs Storage System

  1. New Tables
    - `json_blobs`
      - `id` (uuid, primary key) - Unique identifier
      - `short_id` (text, unique) - Short URL-friendly ID for sharing
      - `content` (jsonb) - The JSON content stored
      - `title` (text, nullable) - Optional title for the blob
      - `created_at` (timestamptz) - Creation timestamp
      - `expires_at` (timestamptz, nullable) - Optional expiration date
      - `views` (integer) - View counter
      - `is_public` (boolean) - Public/private visibility

  2. Indexes
    - Fast lookups by short_id
    - Recent blobs ordering
    - Public blobs filtering

  3. Security
    - Enable RLS on `json_blobs` table
    - Public read access for public blobs
    - Public insert access (anyone can create blobs)

  4. Functions
    - generate_short_id() - Generate random 8-char ID
    - increment_blob_views() - Atomic view counter increment
*/

-- Create json_blobs table
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

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_short_id ON json_blobs(short_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON json_blobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_is_public ON json_blobs(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_views ON json_blobs(views DESC) WHERE is_public = true;

-- Enable Row Level Security
ALTER TABLE json_blobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON json_blobs;
DROP POLICY IF EXISTS "Allow public insert" ON json_blobs;

-- Allow public read access for public blobs that haven't expired
CREATE POLICY "Allow public read access" 
ON json_blobs FOR SELECT 
TO public
USING (is_public = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Allow anyone to insert blobs
CREATE POLICY "Allow public insert" 
ON json_blobs FOR INSERT 
TO public
WITH CHECK (true);

-- Function to increment views atomically
CREATE OR REPLACE FUNCTION increment_blob_views(blob_short_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE json_blobs 
  SET views = views + 1 
  WHERE short_id = blob_short_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate random short_id
CREATE OR REPLACE FUNCTION generate_short_id()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to get blob stats
CREATE OR REPLACE FUNCTION get_blob_stats()
RETURNS TABLE(
  total_blobs BIGINT,
  blobs_today BIGINT,
  total_views BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_blobs,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::BIGINT as blobs_today,
    COALESCE(SUM(views), 0)::BIGINT as total_views
  FROM json_blobs
  WHERE is_public = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
