import { getAllPosts } from '@/lib/api';
import { NextResponse } from 'next/server';

// Make RSS feed dynamic to always fetch latest posts from Supabase
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  
  // Get ALL posts from Supabase for RSS feed
  const posts = await getAllPosts();
  
  // Sort by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rssItems = sortedPosts.map((post) => {
    const postUrl = `${baseUrl}/posts/${post.slug}`;
    const imageUrl = post.coverImage?.startsWith('http') 
      ? post.coverImage 
      : `${baseUrl}${post.coverImage || '/assets/blog/hello-world/cover.jpg'}`;
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author.name}</author>
      <category>${post.category || 'Finance'}</category>
      <enclosure url="${imageUrl}" type="image/jpeg" />
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Punjipati Finance - Finance Insights &amp; Analysis</title>
    <description>Your trusted source for finance news, market analysis, investment strategies, and financial insights.</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/assets/blog/preview/cover.jpg</url>
      <title>Punjipati Finance</title>
      <link>${baseUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

