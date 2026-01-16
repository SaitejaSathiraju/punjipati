-- Supabase Schema for Punjipati Finance
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('author-images', 'author-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  og_image_url TEXT,
  author_name TEXT NOT NULL DEFAULT 'Finance Team',
  author_picture_url TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON posts(is_published);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Public posts are viewable by everyone"
  ON posts FOR SELECT
  USING (is_published = true);

-- Policy: Allow authenticated users to insert posts (adjust based on your auth setup)
CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  WITH CHECK (true); -- Change to: auth.role() = 'authenticated' if using Supabase Auth

-- Policy: Allow authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  USING (true); -- Change to: auth.role() = 'authenticated' if using Supabase Auth

-- Policy: Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  USING (true); -- Change to: auth.role() = 'authenticated' if using Supabase Auth

-- Storage policies for post-images bucket
CREATE POLICY "Public Access for post-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'post-images' AND true); -- Change to: auth.role() = 'authenticated'

CREATE POLICY "Authenticated users can update post-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'post-images' AND true); -- Change to: auth.role() = 'authenticated'

CREATE POLICY "Authenticated users can delete post-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'post-images' AND true); -- Change to: auth.role() = 'authenticated'

-- Storage policies for author-images bucket
CREATE POLICY "Public Access for author-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'author-images');

CREATE POLICY "Authenticated users can upload author-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'author-images' AND true); -- Change to: auth.role() = 'authenticated'

CREATE POLICY "Authenticated users can update author-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'author-images' AND true); -- Change to: auth.role() = 'authenticated'

CREATE POLICY "Authenticated users can delete author-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'author-images' AND true); -- Change to: auth.role() = 'authenticated'

-- Create view for latest posts (optional, for easier querying)
CREATE OR REPLACE VIEW latest_posts AS
SELECT 
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  og_image_url,
  author_name,
  author_picture_url,
  published_at,
  created_at,
  updated_at,
  view_count
FROM posts
WHERE is_published = true
ORDER BY published_at DESC;

-- Grant permissions (adjust as needed)
GRANT SELECT ON latest_posts TO anon, authenticated;
GRANT ALL ON posts TO authenticated;

