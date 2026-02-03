import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/api';

// Make sitemap dynamic to always fetch latest posts from Supabase
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper function to ensure date is not in the future
function getValidLastModified(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  // If date is in the future, use current date instead
  if (dateObj.getTime() > now.getTime()) {
    return now;
  }
  
  // If date is invalid, use current date
  if (isNaN(dateObj.getTime())) {
    return now;
  }
  
  return dateObj;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  const now = new Date();
  
  let posts;
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    posts = [];
  }
  
  // Sort posts by date (newest first) for better indexing priority
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Generate URLs for all individual posts
  // Use updatedAt if available, otherwise fall back to date
  const postUrls = sortedPosts.map((post, index) => {
    const lastModified = post.updatedAt || post.date;
    return {
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: getValidLastModified(lastModified),
      changeFrequency: 'weekly' as const,
      // Higher priority for newer posts
      priority: index < 5 ? 0.9 : 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/national`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/international`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/market/national`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/market/international`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-study/national`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-study/international`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postUrls,
  ];
}
