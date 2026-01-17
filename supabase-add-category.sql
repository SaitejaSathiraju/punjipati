-- Add category column to posts table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'news' CHECK (category IN ('news', 'case-study', 'general'));

-- Create index on category for fast filtering
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);

-- Update existing posts to have a default category (optional - adjust as needed)
-- UPDATE posts SET category = 'news' WHERE category IS NULL;

