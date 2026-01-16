# Hardcoded Login Credentials

## Default Credentials

**Username**: `admin`  
**Password**: `punjipati2024`

## Changing the Credentials

You can change the default credentials by setting environment variables in your `.env.local` file:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

## Security Notes

⚠️ **Important**: 
- Change the default password immediately!
- Use a strong password (minimum 12 characters, mix of letters, numbers, symbols)
- Never commit your `.env.local` file to version control
- The password is stored in plain text in the environment variable (for simplicity)
- For production, consider using a more secure authentication system

## Session Management

- Sessions last for 24 hours
- Sessions are stored in HTTP-only cookies
- Logout clears the session cookie
- Each login creates a new session token

## Access

- Login URL: `/admin-secure-punjipati-2024/login`
- After login, you'll be redirected to the admin panel
- The session persists across page refreshes
- Logout button is available in the admin panel header

