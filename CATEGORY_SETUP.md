# Category Setup Instructions

## Overview
The blog now supports post categories to separate News articles from Case Study articles. Posts can be categorized as:
- **news**: Appears only in the News section
- **case-study**: Appears only in the Case Study section  
- **general**: Appears in both sections

## Database Migration Required

**IMPORTANT**: You need to run the SQL migration to add the category column to your database.

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase-add-category.sql`:

```sql
-- Add category column to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'news' CHECK (category IN ('news', 'case-study', 'general'));

-- Create index on category for fast filtering
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
```

## Updating Existing Posts

After running the migration, you'll need to update your existing posts:

1. **For your "World Economy in 2026" article**: 
   - Go to the Admin Panel
   - Edit the post (or update it directly in Supabase)
   - Set the category to `news` (since it's a news article)

2. **To update posts directly in Supabase**:
   ```sql
   -- Update a specific post by slug
   UPDATE posts 
   SET category = 'news' 
   WHERE slug = 'world-economy-in-2026-key-trends-risks-and-opportunities-investors-must-watch';
   
   -- Or update all existing posts to a default category
   UPDATE posts SET category = 'news' WHERE category IS NULL;
   ```

## Creating New Posts

When creating new posts in the Admin Panel:
1. Fill in all the required fields
2. **Select a Category** from the dropdown:
   - **News**: For news articles, market updates, economic news
   - **Case Study**: For case studies, investment strategies, portfolio analysis
   - **General**: For articles that should appear in both sections
3. Click "Publish Post"

## How It Works

- **News page** (`/news`): Shows only posts with category `news` or `general`
- **Case Study page** (`/case-study`): Shows only posts with category `case-study` or `general`
- **Home page**: Shows all posts (no filtering)

## Files Changed

- ✅ Database schema: Added category column
- ✅ Post interface: Added category type
- ✅ API functions: Added `getPostsByCategory()` function
- ✅ News page: Filters posts by 'news' category
- ✅ Case Study page: Filters posts by 'case-study' category
- ✅ Admin Panel: Added category selection dropdown
- ✅ Create Post API: Accepts and stores category

## Next Steps

1. Run the SQL migration in Supabase
2. Update your existing "World Economy in 2026" post to have category `news`
3. Create new posts and select appropriate categories
4. Test that News and Case Study pages show different articles

