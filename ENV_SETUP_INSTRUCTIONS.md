# Environment Variables Setup Guide

## Quick Setup

Create a `.env.local` file in the root of your project with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Where to Find Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. You'll find:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

## If You Have Multiple .env Files

If you have `.env (1-4)` files, you can:

### Option 1: Consolidate into .env.local
Copy the values from your existing .env files into a single `.env.local` file.

### Option 2: Use Different Variable Names
The code supports these alternative variable names:
- `SUPABASE_URL` (instead of `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_ANON_KEY` (instead of `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `SUPABASE_SERVICE_KEY` (instead of `SUPABASE_SERVICE_ROLE_KEY`)

## Example .env.local File

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.example

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Important Notes

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Restart your dev server** after creating/updating `.env.local`
3. **Service Role Key is secret** - Never share it or commit it to version control
4. **The app will work without Supabase** - It will fall back to reading from `_posts` directory

## Fallback Behavior

If Supabase is not configured, the app will automatically:
- Read posts from the `_posts` directory (Markdown files)
- Still work for viewing and displaying posts
- Admin panel will require Supabase for creating/deleting posts

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Check that `.env.local` exists in the project root
- Verify all three variables are set
- Restart your dev server: `npm run dev`

### Posts not showing
- If using Supabase: Check that posts exist in your Supabase database
- If using file system: Check that `.md` files exist in `_posts` directory
- Check browser console for errors

### Admin panel not working
- Supabase must be configured for admin features
- Make sure you've run the SQL schema in Supabase
- Verify your service role key is correct

## Next Steps

1. Create `.env.local` file with your Supabase credentials
2. Restart your dev server
3. The app should now work with Supabase
4. If you prefer file-based posts, you can skip Supabase setup and use the `_posts` directory




