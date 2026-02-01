import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'Finance News | Punjipati',
  description: 'Latest finance news, market updates, economic news, and regulatory updates. Stay informed with the latest trends in finance and economics.',
  keywords: ['finance news', 'market updates', 'economic news', 'financial news', 'regulatory updates', 'company news', 'stock market news', 'financial markets'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'Finance News',
  alternates: {
    canonical: `${baseUrl}/news`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/news`,
    siteName: 'Punjipati Finance',
    title: 'Finance News | Punjipati',
    description: 'Latest finance news, market updates, economic news, and regulatory updates. Stay informed with the latest trends in finance and economics.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 1200,
      height: 630,
      alt: 'Punjipati Finance News',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance News | Punjipati',
    description: 'Latest finance news, market updates, economic news, and regulatory updates.',
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

export default async function NewsPage() {
  // Fetch only 5 posts initially for better performance
  const initialPosts = await getPostsByCategory('news', 5);

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Finance News",
    "description": "Latest finance news, market updates, economic news, and regulatory updates",
    "url": `${baseUrl}/news`,
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
            category="news"
            title="Finance News"
            description="Stay updated with the latest finance news, market updates, economic insights, and regulatory changes."
          />
        </Container>
      </main>
    </>
  );
}


