import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        allow: '/posts',
        allow: '/posts/*',
        allow: '/news',
        allow: '/news/*',
        allow: '/market',
        allow: '/market/*',
        allow: '/case-study',
        allow: '/case-study/*',
        disallow: ['/api/', '/admin/', '/admin-secure-punjipati-2024/'],
        crawlDelay: 0, // Allow fast crawling
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        allow: '/posts',
        allow: '/posts/*',
        allow: '/news',
        allow: '/news/*',
        allow: '/market',
        allow: '/market/*',
        allow: '/case-study',
        allow: '/case-study/*',
        disallow: ['/api/', '/admin/', '/admin-secure-punjipati-2024/'],
        crawlDelay: 0, // Fast indexing for Google
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        allow: '/posts',
        allow: '/posts/*',
        allow: '/news',
        allow: '/news/*',
        allow: '/market',
        allow: '/market/*',
        allow: '/case-study',
        allow: '/case-study/*',
        disallow: ['/api/', '/admin/', '/admin-secure-punjipati-2024/'],
        crawlDelay: 0,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap-index.xml`, // Sitemap index (references all sitemaps)
      `${baseUrl}/sitemap.xml`, // Main sitemap (all pages)
      `${baseUrl}/news-sitemap.xml`, // Google News sitemap (prioritized for fast indexing)
    ],
  };
}
