-- ============================================================================
-- Supabase Schema for Punjipati Finance
-- Complete Database Schema with Category Support
-- Run this SQL in your Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for author images
INSERT INTO storage.buckets (id, name, public)
VALUES ('author-images', 'author-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- POSTS TABLE
-- ============================================================================

-- Create posts table with all required fields including images and category
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,  -- Cover image for the post (required for display)
  og_image_url TEXT,     -- Open Graph image for social sharing (falls back to cover_image_url)
  author_name TEXT NOT NULL DEFAULT 'Finance Team',
  author_picture_url TEXT,  -- Author profile picture
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  category TEXT DEFAULT 'news-national' CHECK (
    category IN (
      'news-national', 
      'news-international', 
      'market-national', 
      'market-international', 
      'case-study-national', 
      'case-study-international'
    )
  )
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Index on published_at for sorting by date
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);

-- Index on is_published for filtering published posts
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON posts(is_published);

-- Index on category for filtering by category
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- Drop composite index if it exists (to recreate with correct definition)
DROP INDEX IF EXISTS idx_posts_category_published_date;

-- Composite index for common queries (published posts by category, sorted by date)
CREATE INDEX idx_posts_category_published_date 
ON posts(category, is_published, published_at DESC);

-- ============================================================================
-- AUTOMATIC TIMESTAMP UPDATES
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists, then create it
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- Trigger to auto-update updated_at on any UPDATE
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON posts;

-- Policy: Anyone can read published posts
CREATE POLICY "Public posts are viewable by everyone"
  ON posts FOR SELECT
  USING (is_published = true);

-- Policy: Allow authenticated users to insert posts
-- Note: Change WITH CHECK (true) to WITH CHECK (auth.role() = 'authenticated') 
-- if you want to restrict to authenticated users only
CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users to update posts
-- Note: Change USING (true) to USING (auth.role() = 'authenticated') 
-- if you want to restrict to authenticated users only
CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  USING (true);

-- Policy: Allow authenticated users to delete posts
-- Note: Change USING (true) to USING (auth.role() = 'authenticated') 
-- if you want to restrict to authenticated users only
CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  USING (true);

-- ============================================================================
-- STORAGE POLICIES FOR POST IMAGES
-- ============================================================================

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Public Access for post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update post-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete post-images" ON storage.objects;

-- Public access to read post images
CREATE POLICY "Public Access for post-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

-- Allow authenticated users to upload post images
-- Note: Change AND true to AND auth.role() = 'authenticated' 
-- if you want to restrict to authenticated users only
CREATE POLICY "Authenticated users can upload post-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'post-images' AND true);

-- Allow authenticated users to update post images
CREATE POLICY "Authenticated users can update post-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'post-images' AND true);

-- Allow authenticated users to delete post images
CREATE POLICY "Authenticated users can delete post-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'post-images' AND true);

-- ============================================================================
-- STORAGE POLICIES FOR AUTHOR IMAGES
-- ============================================================================

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Public Access for author-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload author-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update author-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete author-images" ON storage.objects;

-- Public access to read author images
CREATE POLICY "Public Access for author-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'author-images');

-- Allow authenticated users to upload author images
CREATE POLICY "Authenticated users can upload author-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'author-images' AND true);

-- Allow authenticated users to update author images
CREATE POLICY "Authenticated users can update author-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'author-images' AND true);

-- Allow authenticated users to delete author images
CREATE POLICY "Authenticated users can delete author-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'author-images' AND true);

-- ============================================================================
-- VIEWS FOR EASIER QUERYING
-- ============================================================================

-- View for latest published posts (includes all fields including images and category)
CREATE OR REPLACE VIEW latest_posts AS
SELECT 
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image_url,      -- Cover image URL
  og_image_url,         -- Open Graph image URL
  author_name,
  author_picture_url,   -- Author picture URL
  published_at,
  created_at,
  updated_at,
  view_count,
  category,             -- Post category
  is_published
FROM posts
WHERE is_published = true
ORDER BY published_at DESC;

-- View for posts by category (useful for filtering)
CREATE OR REPLACE VIEW posts_by_category AS
SELECT 
  category,
  COUNT(*) as post_count,
  MAX(published_at) as latest_post_date
FROM posts
WHERE is_published = true
GROUP BY category
ORDER BY latest_post_date DESC;

-- ============================================================================
-- PERMISSIONS
-- ============================================================================

-- Grant read access to latest_posts view
GRANT SELECT ON latest_posts TO anon, authenticated;

-- Grant read access to posts_by_category view
GRANT SELECT ON posts_by_category TO anon, authenticated;

-- Grant all permissions on posts table to authenticated users
GRANT ALL ON posts TO authenticated;

-- ============================================================================
-- MIGRATION SCRIPT FOR EXISTING DATABASES
-- ============================================================================
-- Run this section if you already have a posts table and need to add the category column

-- Add category column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'category'
  ) THEN
    ALTER TABLE posts 
    ADD COLUMN category TEXT DEFAULT 'news-national' 
    CHECK (category IN (
      'news-national', 
      'news-international', 
      'market-national', 
      'market-international', 
      'case-study-national', 
      'case-study-international'
    ));
    
    -- Update existing posts to have a default category
    UPDATE posts 
    SET category = 'news-national' 
    WHERE category IS NULL;
    
    -- Create index on category
    CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
    
    -- Create composite index
    CREATE INDEX IF NOT EXISTS idx_posts_category_published_date 
    ON posts(category, is_published, published_at DESC);
    
    RAISE NOTICE 'Category column added successfully';
  ELSE
    RAISE NOTICE 'Category column already exists';
  END IF;
END $$;

-- ============================================================================
-- NOTES
-- ============================================================================
-- 
-- IMAGE HANDLING:
-- - cover_image_url: Main cover image for the post (displayed on post cards and headers)
-- - og_image_url: Open Graph image for social media sharing (if not provided, uses cover_image_url)
-- - author_picture_url: Author profile picture
-- 
-- CATEGORIES:
-- - news-national: National news articles
-- - news-international: International news articles
-- - market-national: National market analysis
-- - market-international: International market analysis
-- - case-study-national: National case studies
-- - case-study-international: International case studies
--
-- All posts should have at least a cover_image_url for proper display.
-- If og_image_url is not provided, it will default to cover_image_url.
--
-- ============================================================================
