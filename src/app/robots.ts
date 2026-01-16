import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        allow: '/posts/',
        disallow: ['/api/', '/admin/', '/admin-secure-punjipati-2024/'],
        crawlDelay: 0, // Allow fast crawling
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        allow: '/posts/',
        disallow: ['/api/', '/admin/', '/admin-secure-punjipati-2024/'],
        crawlDelay: 0, // Fast indexing for Google
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        allow: '/posts/',
        disallow: ['/api/', '/admin/', '/admin-secure-punjipati-2024/'],
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

