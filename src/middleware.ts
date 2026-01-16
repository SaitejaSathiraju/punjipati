import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSession } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  // Check if the route is an admin route
  if (req.nextUrl.pathname.startsWith('/admin-secure-punjipati-2024')) {
    // Allow access to login page
    if (req.nextUrl.pathname === '/admin-secure-punjipati-2024/login') {
      return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-secure-punjipati-2024/:path*',
  ],
};

