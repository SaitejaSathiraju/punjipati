import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'India Market Futures (2026–2030) | Market Analysis | Punjipati',
  description: 'How Indian markets, banking, employment, consumption, and savings trends will evolve over 2026–2030. Future-focused analysis of India\'s market performance and economic indicators.',
  keywords: ['India market future', 'India markets 2026', 'India markets 2027', 'India markets 2028', 'India markets 2029', 'India markets 2030', 'India market trends', 'India market analysis future', 'NSE future', 'BSE future', 'Sensex outlook', 'Nifty future'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'National Market Analysis',
  alternates: {
    canonical: `${baseUrl}/market/national`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/market/national`,
    siteName: 'Punjipati Finance',
    title: 'National Market | Punjipati Finance',
    description: 'National market analysis, domestic market trends, local stock market updates, and national economic indicators.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance National Market',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National Market | Punjipati Finance',
    description: 'National market analysis, domestic market trends, local stock market updates, and national economic indicators.',
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

export default async function NationalMarketPage() {
  // Fetch only 5 posts initially for better performance
  const initialPosts = await getPostsByCategory('market-national', 5);

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "National Market Analysis",
    "description": "National market analysis, domestic market trends, local stock market updates, and national economic indicators",
    "url": `${baseUrl}/market/national`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": initialPosts.length,
      "itemListElement": initialPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
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
        "name": "Market",
        "item": `${baseUrl}/market/national`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "National Market",
        "item": `${baseUrl}/market/national`
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
            category="market-national"
            title="National Market"
            description="How Indian markets, banking, employment, consumption, and savings trends will evolve over 2026–2030. Future-focused analysis of India's market performance."
          />
        </Container>
      </main>
    </>
  );
}





