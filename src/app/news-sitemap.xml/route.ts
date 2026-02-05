import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/api';

// Google News Sitemap for faster indexing
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  
  let posts;
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Error fetching posts for news sitemap:', error);
    posts = [];
  }
  
  // Include ALL news and market articles (not just last 2 days)
  // Filter to ensure dates are valid (not in future)
  const now = new Date();
  
  const newsPosts = posts
    .filter(post => {
      const postDate = new Date(post.date);
      return (
        (post.category?.includes('news') || post.category?.includes('market')) &&
        postDate <= now // Not in future
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1000); // Google News limit is 1000 articles
  
  // Generate Google News XML sitemap
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsPosts.map(post => {
  const pubDate = new Date(post.date).toISOString();
  const title = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const publication = post.category?.includes('national') ? 'Punjipati Finance - India' : 'Punjipati Finance - Global';
  
  return `  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${publication}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
      <news:keywords>${post.category || 'finance, investment, market analysis'}</news:keywords>
    </news:news>
    <lastmod>${new Date(post.updatedAt || post.date).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new NextResponse(newsSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

