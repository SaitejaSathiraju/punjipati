import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getAllPosts } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'All Articles | Punjipati Finance',
  description: 'Browse all finance articles, news, case studies, and insights from Punjipati Finance. Stay informed with comprehensive financial content.',
  keywords: ['finance articles', 'finance blog', 'investment articles', 'financial news', 'market analysis', 'case studies', 'finance insights'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'Finance Articles',
  alternates: {
    canonical: `${baseUrl}/posts`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/posts`,
    siteName: 'Punjipati Finance',
    title: 'All Articles | Punjipati Finance',
    description: 'Browse all finance articles, news, case studies, and insights from Punjipati Finance.',
    images: [{
      url: `${baseUrl}/assets/blog/preview/cover.jpg`,
      width: 1200,
      height: 630,
      alt: 'Punjipati Finance Articles',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Articles | Punjipati Finance',
    description: 'Browse all finance articles, news, case studies, and insights from Punjipati Finance.',
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

export default async function AllPostsPage() {
  // Fetch only 5 posts initially for better performance
  const initialPosts = await getAllPosts(5);

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Finance Articles",
    "description": "Browse all finance articles, news, case studies, and insights from Punjipati Finance",
    "url": `${baseUrl}/posts`,
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
            title="All Articles"
            description="Browse all finance articles, news, case studies, and insights. Use the search to find specific topics."
          />
        </Container>
      </main>
    </>
  );
}

