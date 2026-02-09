import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';

export const metadata: Metadata = {
  title: 'Global Markets → India Impact | International Market Analysis | Punjipati',
  description: 'How global market trends, international economic indicators, and world stock market movements will impact India over the next 1–5 years. Clear analysis of international-to-India market impact.',
  keywords: ['global markets India impact', 'international markets India', 'world markets India', 'global trends India', 'international economy India', 'world economy India impact', 'global indicators India'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'International Market Analysis',
  alternates: {
    canonical: `${baseUrl}/market/international`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/market/international`,
    siteName: 'Punjipati Finance',
    title: 'International Market | Punjipati Finance',
    description: 'Global market analysis, international market trends, world stock market updates, and global economic indicators.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance International Market',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Market | Punjipati Finance',
    description: 'Global market analysis, international market trends, world stock market updates, and global economic indicators.',
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

export default async function InternationalMarketPage() {
  // Fetch ALL posts for better SEO - Google needs to see all posts in HTML
  const initialPosts = await getPostsByCategory('market-international');

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "International Market Analysis",
    "description": "Global market analysis, international market trends, world stock market updates, and global economic indicators",
    "url": `${baseUrl}/market/international`,
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
        "item": `${baseUrl}/market/international`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "International Market",
        "item": `${baseUrl}/market/international`
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
            category="market-international"
            title="International Market"
            description="How global market trends, international economic indicators, and world stock market movements will impact India over the next 1–5 years. Clear analysis of international-to-India market impact."
          />
        </Container>
      </main>
    </>
  );
}





