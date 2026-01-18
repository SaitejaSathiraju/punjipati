# Quick Start Guide - Punjipati Finance

## ✅ You've Set Up Supabase Credentials!

Great! Now let's get everything running.

## Step 1: Restart Your Dev Server

**Important**: After creating/updating `.env.local`, you MUST restart your dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 2: Verify Supabase Connection

1. Open your browser to `http://localhost:3000`
2. Check the browser console (F12) for any errors
3. The homepage should load without Supabase errors

## Step 3: Set Up Your Database

1. Go to your Supabase Dashboard
2. Open the **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to execute
5. This creates the `posts` table and storage buckets

## Step 4: Create Your First Admin User

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: `admin@punjipati.com` (or your email)
   - **Password**: A strong password
   - ✅ Check **Auto Confirm User**
4. Click **Create User**

## Step 5: Access Admin Panel

1. Navigate to: `http://localhost:3000/admin-secure-punjipati-2024/login`
2. Login with your admin credentials
3. You'll be redirected to the admin panel
4. Create your first post!

## What Works Now

✅ **Homepage**: Displays posts from Supabase (or falls back to `_posts` folder)  
✅ **Admin Panel**: Secure login at `/admin-secure-punjipati-2024/login`  
✅ **Create Posts**: Full admin functionality with image uploads  
✅ **Delete Posts**: Manage your content  
✅ **SEO Optimized**: All posts are search engine friendly  

## Troubleshooting

### Still seeing Supabase errors?
- Make sure `.env.local` is in the project root (not in a subfolder)
- Verify variable names match exactly (case-sensitive)
- Restart your dev server after creating `.env.local`

### Can't login to admin?
- Verify user exists in Supabase Dashboard
- Check that user is confirmed (email_confirm = true)
- Make sure you're using the correct email/password

### Posts not showing?
- If using Supabase: Check that posts exist in the database
- If using file system: Check that `.md` files exist in `_posts` folder
- Check browser console for errors

## Next Steps

1. ✅ Create admin user in Supabase
2. ✅ Login to admin panel
3. ✅ Create your first post
4. ✅ Upload images for posts
5. ✅ Publish and view your content!

## Admin URLs

- **Login**: `/admin-secure-punjipati-2024/login`
- **Create Post**: `/admin-secure-punjipati-2024`
- **All Posts**: `/admin-secure-punjipati-2024/posts`

## Need Help?

Check these files:
- `ENV_SETUP_INSTRUCTIONS.md` - Environment setup details
- `ADMIN_SETUP.md` - Admin panel setup guide
- `SUPABASE_SETUP.md` - Supabase configuration guide

Happy publishing! 🚀





