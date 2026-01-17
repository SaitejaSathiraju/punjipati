# Check Your .env File

Since you have a `.env` file, let's verify it's set up correctly.

## Required Variables

Your `.env` file should contain these variables (with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Common Issues

### 1. Variable Names
Make sure the variable names match **exactly** (case-sensitive):
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ❌ `SUPABASE_URL` (missing NEXT_PUBLIC_)
- ❌ `next_public_supabase_url` (wrong case)

### 2. No Quotes Needed
```env
# ✅ Correct
NEXT_PUBLIC_SUPABASE_URL=https://abc.supabase.co

# ❌ Wrong (don't use quotes)
NEXT_PUBLIC_SUPABASE_URL="https://abc.supabase.co"
```

### 3. No Spaces
```env
# ✅ Correct
NEXT_PUBLIC_SUPABASE_URL=https://abc.supabase.co

# ❌ Wrong (space after =)
NEXT_PUBLIC_SUPABASE_URL = https://abc.supabase.co
```

### 4. Restart Required
After creating/updating `.env`, you **MUST** restart your dev server:
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Verify It's Working

1. Check your `.env` file has the correct variable names
2. Restart your dev server
3. The app should work (either with Supabase or fallback to file system)

## If Still Not Working

The code is now set up to work **without Supabase** - it will automatically use your Markdown files from the `_posts` folder. So even if Supabase isn't configured, the app should work fine!


