# Supabase Setup Guide for Punjipati Finance

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note down your project URL and API keys

## Step 2: Run the Schema SQL

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to execute the SQL
4. This will create:
   - `posts` table
   - Storage buckets for images
   - RLS (Row Level Security) policies
   - Indexes for performance

## Step 3: Set Up Storage Buckets

The SQL script automatically creates the buckets, but you can verify:

1. Go to **Storage** in your Supabase dashboard
2. You should see two buckets:
   - `post-images` (public)
   - `author-images` (public)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Where to find these:**
- Go to **Settings** → **API** in your Supabase dashboard
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (keep this secret!)

## Step 5: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/admin`
3. Try creating a post with an image upload
4. Check your Supabase dashboard to see the data

## Database Schema

### Posts Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| slug | TEXT | Unique URL slug |
| title | TEXT | Post title |
| excerpt | TEXT | Post excerpt |
| content | TEXT | Post content (Markdown) |
| cover_image_url | TEXT | Cover image URL |
| og_image_url | TEXT | Open Graph image URL |
| author_name | TEXT | Author name |
| author_picture_url | TEXT | Author picture URL |
| published_at | TIMESTAMPTZ | Publication date |
| created_at | TIMESTAMPTZ | Creation date |
| updated_at | TIMESTAMPTZ | Last update date |
| is_published | BOOLEAN | Publication status |
| view_count | INTEGER | View counter |

## Storage Buckets

### post-images
- **Type**: Public
- **Purpose**: Store post cover images and OG images
- **Path structure**: `posts/{timestamp}-{random}.{ext}`

### author-images
- **Type**: Public
- **Purpose**: Store author profile pictures
- **Path structure**: `authors/{timestamp}-{random}.{ext}`

## Security (RLS Policies)

The schema includes Row Level Security policies:

- **Public Read**: Anyone can read published posts
- **Authenticated Write**: Currently set to allow all (change based on your auth setup)
- **Storage**: Public read, authenticated write

**Important**: For production, you should:
1. Set up Supabase Authentication
2. Update RLS policies to check `auth.role() = 'authenticated'`
3. Protect your admin routes with authentication middleware

## Migration from File System

If you have existing posts in the `_posts` directory:

1. You can keep them for now (the code supports both)
2. Or migrate them to Supabase using a script
3. The new posts will be stored in Supabase

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has all required variables
- Restart your dev server after adding env variables

### "Failed to upload image"
- Check that storage buckets exist
- Verify bucket policies allow uploads
- Check file size (max 5MB)

### "Post not found"
- Make sure the post is published (`is_published = true`)
- Check the slug matches exactly

## Next Steps

1. Set up authentication for admin panel
2. Add image optimization/resizing
3. Add post editing functionality
4. Add post deletion
5. Add analytics/view tracking




