import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/api';

/**
 * Sitemap containing ONLY article URLs.
 * Submit this URL in GSC and filter the Page indexing report by this sitemap
 * to validate indexing for articles only (faster validation).
 * @see https://support.google.com/webmasters/answer/9012289#validate_by_sitemap
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getValidLastModified(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  if (dateObj.getTime() > now.getTime() || isNaN(dateObj.getTime())) return now;
  return dateObj;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';
  const now = new Date();

  let posts;
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Error fetching posts for sitemap-posts:', error);
    posts = [];
  }

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const urls = sortedPosts.map((post) => {
    const lastModified = post.updatedAt || post.date;
    return `  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${getValidLastModified(lastModified).toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}
