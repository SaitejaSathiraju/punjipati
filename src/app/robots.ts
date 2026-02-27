import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';
  
  const allowPaths = ['/', '/posts', '/posts/*', '/news', '/news/*', '/market', '/market/*', '/case-study', '/case-study/*'];
  const disallowPaths = ['/api/', '/admin/', '/admin-secure-punjipati-2024/', '/admin-secure-punjipati-2024/login'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowPaths,
        disallow: disallowPaths,
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot',
        allow: allowPaths,
        disallow: disallowPaths,
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: allowPaths,
        disallow: disallowPaths,
        crawlDelay: 0,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-posts.xml`, // Articles only – use in GSC to validate article indexing
      `${baseUrl}/news-sitemap.xml`,
    ],
  };
}
