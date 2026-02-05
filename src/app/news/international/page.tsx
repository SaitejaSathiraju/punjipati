import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'Global Events → India Impact | International Finance News | Punjipati',
  description: 'How US, China, Europe economic events will impact Indian markets, jobs, inflation, and consumption over the next 1–5 years. Clear analysis of global-to-India financial impact.',
  keywords: ['global impact India', 'US economy India impact', 'China economy India impact', 'Europe economy India impact', 'global events India', 'international finance India impact', 'world economy India', 'global markets India'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'International Finance News',
  alternates: {
    canonical: `${baseUrl}/news/international`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/news/international`,
    siteName: 'Punjipati Finance',
    title: 'International News | Punjipati Finance',
    description: 'Latest international finance news, global market updates, world economic news, and international regulatory updates.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance International News',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International News | Punjipati Finance',
    description: 'Latest international finance news, global market updates, world economic news, and international regulatory updates.',
    images: [`${baseUrl}/favicon/apple-touch-icon.png`],
    creator: '@punjipati',
    site: '@punjipati',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Make this page dynamic to fetch fresh data from Supabase
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InternationalNewsPage() {
  // Fetch ALL posts for better SEO - Google needs to see all posts in HTML
  const initialPosts = await getPostsByCategory('news-international');

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "International Finance News",
    "description": "Latest international finance news, global market updates, world economic news, and international regulatory updates",
    "url": `${baseUrl}/news/international`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": initialPosts.length,
      "itemListElement": initialPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": post.title,
          "url": `${baseUrl}/posts/${post.slug}`,
          "datePublished": post.date,
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "Punjipati Finance",
      "url": baseUrl,
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "News",
        "item": `${baseUrl}/news/international`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "International News",
        "item": `${baseUrl}/news/international`
      }
    ]
  };

  return (
    <>
      <StructuredData type="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <main>
        <Container>
          <PostsListWithSearch
            initialPosts={initialPosts}
            category="news-international"
            title="International News"
            description="How US, China, Europe economic events will impact Indian markets, jobs, inflation, and consumption over the next 1–5 years. Clear analysis of global-to-India financial impact."
          />
        </Container>
      </main>
    </>
  );
}





