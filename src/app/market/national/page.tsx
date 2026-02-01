import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'National Market | Punjipati Finance',
  description: 'National market analysis, domestic market trends, local stock market updates, and national economic indicators. Stay informed with your country\'s market performance.',
  keywords: ['national market', 'domestic market', 'local stock market', 'national market analysis', 'domestic market trends', 'national economic indicators', 'local market updates'],
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

  return (
    <>
      <StructuredData type="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
      />
      <main>
        <Container>
          <PostsListWithSearch
            initialPosts={initialPosts}
            category="market-national"
            title="National Market"
            description="Stay informed with national market analysis, domestic market trends, local stock market updates, and national economic indicators."
          />
        </Container>
      </main>
    </>
  );
}

