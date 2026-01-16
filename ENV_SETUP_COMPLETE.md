# Your .env File Setup

## Current Variables (✅ Working)

You have:
```env
NEXT_PUBLIC_SUPABASE_URL=https://bgoqyfbihkjsrqodbgif.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Kz0CQAvdi_oGZhkGVvAAeQ_WGb6Iy7v
```

## Missing Variable (⚠️ Required for Admin Panel)

You need to add the **Service Role Key** for admin operations (creating/deleting posts):

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## How to Get Your Service Role Key

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `bgoqyfbihkjsrqodbgif`
3. Go to **Settings** → **API**
4. Find the **service_role** key (⚠️ Keep this secret - it has admin privileges!)
5. Copy it and add to your `.env` file

## Complete .env File

Your `.env` file should look like this:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://bgoqyfbihkjsrqodbgif.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Kz0CQAvdi_oGZhkGVvAAeQ_WGb6Iy7v
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site URL (optional, defaults to localhost:3000)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## What Each Key Does

- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL ✅ (You have this)
- **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY**: Public key for client-side operations ✅ (You have this)
- **SUPABASE_SERVICE_ROLE_KEY**: Admin key for server-side operations (creating/deleting posts) ⚠️ (You need this)

## After Adding the Service Role Key

1. Save your `.env` file
2. **Restart your dev server** (Ctrl+C, then `npm run dev`)
3. The admin panel will now work for creating and deleting posts!

## Current Status

✅ **Reading posts**: Works (using your publishable key)
⚠️ **Creating posts**: Needs service role key
⚠️ **Deleting posts**: Needs service role key

Once you add the service role key, everything will work!

