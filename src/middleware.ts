import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSession } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Add security headers for all routes
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy (adjust based on your needs)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-eval in dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);

  // Cross-Origin-Opener-Policy
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

  // Check if the route is an admin route
  if (req.nextUrl.pathname.startsWith('/admin-secure-punjipati-2024')) {
    // Allow access to login page
    if (req.nextUrl.pathname === '/admin-secure-punjipati-2024/login') {
      return response;
    }

    // For other admin routes, check for session cookie
    const sessionToken = req.cookies.get('admin_session')?.value;

    // If no valid session, redirect to login
    if (!sessionToken || !validateSession(sessionToken)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/admin-secure-punjipati-2024/login';
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin-secure-punjipati-2024/:path*',
  ],
};

