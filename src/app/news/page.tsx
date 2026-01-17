import Container from "@/app/_components/container";
import { MoreStories } from "@/app/_components/more-stories";
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
      url: `${baseUrl}/assets/blog/preview/cover.jpg`,
      width: 1200,
      height: 630,
      alt: 'Punjipati Finance News',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance News | Punjipati',
    description: 'Latest finance news, market updates, economic news, and regulatory updates.',
    images: [`${baseUrl}/assets/blog/preview/cover.jpg`],
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
  const allPosts = await getPostsByCategory('news');

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Finance News",
    "description": "Latest finance news, market updates, economic news, and regulatory updates",
    "url": `${baseUrl}/news`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allPosts.length,
      "itemListElement": allPosts.map((post, index) => ({
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
          <div className="py-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-8">
              Finance News
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Stay updated with the latest finance news, market updates, economic insights, and regulatory changes.
            </p>
            {allPosts.length > 0 ? (
              <MoreStories posts={allPosts} />
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No news articles yet. Check back soon for updates.
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}

