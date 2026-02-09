import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Explicit favicon route handler to ensure proper headers and force Google to update
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Try to serve the custom favicon from public/favicon folder first
    const faviconPath = path.join(process.cwd(), 'public', 'favicon', 'favicon.ico');
    
    if (fs.existsSync(faviconPath)) {
      const faviconBuffer = fs.readFileSync(faviconPath);
      
      return new NextResponse(faviconBuffer, {
        headers: {
          'Content-Type': 'image/x-icon',
          'Cache-Control': 'public, max-age=86400, must-revalidate', // 1 day cache
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    
    // Fallback to root favicon
    const rootFaviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
    if (fs.existsSync(rootFaviconPath)) {
      const faviconBuffer = fs.readFileSync(rootFaviconPath);
      
      return new NextResponse(faviconBuffer, {
        headers: {
          'Content-Type': 'image/x-icon',
          'Cache-Control': 'public, max-age=86400, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    
    // If no favicon found, return 404
    return new NextResponse(null, { status: 404 });
  } catch (error) {
    console.error('Error serving favicon:', error);
    return new NextResponse(null, { status: 500 });
  }
}


