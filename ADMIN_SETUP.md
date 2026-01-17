# Admin Panel Setup Guide

## Secure Admin Access

The admin panel is now secured with authentication and a complex URL path.

### Admin URLs

- **Login**: `/admin-secure-punjipati-2024/login`
- **Admin Panel**: `/admin-secure-punjipati-2024`
- **All Posts**: `/admin-secure-punjipati-2024/posts`

### Setting Up Your First Admin User

#### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter:
   - **Email**: Your admin email (e.g., `admin@punjipati.com`)
   - **Password**: A strong password
   - **Auto Confirm User**: ✅ (checked)
5. Click **Create User**

#### Option 2: Using API Endpoint (One-time setup)

**⚠️ Important**: This endpoint should only be used once for initial setup. After creating the admin, you should disable or protect this endpoint.

```bash
curl -X POST http://localhost:3000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@punjipati.com",
    "password": "your-secure-password"
  }'
```

**Note**: This requires the `SUPABASE_SERVICE_ROLE_KEY` to be set in your environment variables.

### Environment Variables Required

Make sure you have these in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Security Features

1. **Complex URL Path**: `/admin-secure-punjipati-2024` - Hard to guess
2. **Authentication Required**: Must login to access
3. **Session Management**: Automatic logout on session expiry
4. **Protected Routes**: Middleware protects all admin routes
5. **Secure Storage**: Sessions stored securely via Supabase

### Using the Admin Panel

1. Navigate to `/admin-secure-punjipati-2024/login`
2. Enter your email and password
3. You'll be redirected to the admin panel
4. Create, edit, or delete posts
5. Click "Logout" when done

### Password Reset

If you forget your password:

1. Go to Supabase Dashboard → Authentication → Users
2. Find your user
3. Click "Reset Password" or use Supabase's password reset flow

### Adding More Admin Users

1. Go to Supabase Dashboard → Authentication → Users
2. Click **Add User** → **Create new user**
3. Enter email and password
4. Set **Auto Confirm User**: ✅
5. Create the user

### Security Best Practices

1. **Use Strong Passwords**: Minimum 12 characters, mix of letters, numbers, symbols
2. **Don't Share Credentials**: Each admin should have their own account
3. **Regular Password Updates**: Change passwords periodically
4. **Monitor Access**: Check Supabase Auth logs regularly
5. **Disable Old Accounts**: Remove access for users who no longer need it

### Troubleshooting

**Can't login?**
- Check your email and password
- Verify user exists in Supabase Dashboard
- Check that user is confirmed (email_confirm = true)

**Redirected to login?**
- Your session may have expired
- Try logging in again
- Check browser cookies are enabled

**API errors?**
- Verify environment variables are set correctly
- Check Supabase project is active
- Verify service role key has admin permissions

### Disabling Public Admin Access

The old `/admin` route is still accessible but not linked in the navbar. To completely disable it:

1. Delete or rename `src/app/admin/page.tsx`
2. Delete or rename `src/app/admin/posts/page.tsx`
3. Update any bookmarks or links

### Next Steps

1. Create your admin user via Supabase Dashboard
2. Test login at `/admin-secure-punjipati-2024/login`
3. Create your first post
4. Consider setting up email notifications for new posts
5. Add more admin users as needed


