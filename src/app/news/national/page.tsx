import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'National News | Punjipati Finance',
  description: 'Latest national finance news, market updates, economic news, and regulatory updates from your country. Stay informed with the latest trends in finance and economics.',
  keywords: ['national finance news', 'domestic market updates', 'national economic news', 'financial news', 'regulatory updates', 'company news', 'stock market news', 'financial markets'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'National Finance News',
  alternates: {
    canonical: `${baseUrl}/news/national`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/news/national`,
    siteName: 'Punjipati Finance',
    title: 'National News | Punjipati Finance',
    description: 'Latest national finance news, market updates, economic news, and regulatory updates from your country.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance National News',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National News | Punjipati Finance',
    description: 'Latest national finance news, market updates, economic news, and regulatory updates.',
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

export default async function NationalNewsPage() {
  // Fetch only 5 posts initially for better performance
  const initialPosts = await getPostsByCategory('news-national', 5);

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "National Finance News",
    "description": "Latest national finance news, market updates, economic news, and regulatory updates",
    "url": `${baseUrl}/news/national`,
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
        "item": `${baseUrl}/news/national`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "National News",
        "item": `${baseUrl}/news/national`
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
            category="news-national"
            title="National News"
            description="Stay updated with the latest national finance news, market updates, economic insights, and regulatory changes from your country."
          />
        </Container>
      </main>
    </>
  );
}





