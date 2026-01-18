import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'Case Studies | Punjipati',
  description: 'In-depth case studies on investment strategies, portfolio analysis, risk management, and market trends. Learn from real-world finance scenarios.',
  keywords: ['case study', 'investment strategies', 'portfolio analysis', 'risk management', 'market trends', 'finance case study', 'investment analysis', 'financial case study'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'Finance Case Studies',
  alternates: {
    canonical: `${baseUrl}/case-study`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/case-study`,
    siteName: 'Punjipati Finance',
    title: 'Case Studies | Punjipati',
    description: 'In-depth case studies on investment strategies, portfolio analysis, risk management, and market trends. Learn from real-world finance scenarios.',
    images: [{
      url: `${baseUrl}/assets/blog/preview/cover.jpg`,
      width: 1200,
      height: 630,
      alt: 'Punjipati Finance Case Studies',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Punjipati',
    description: 'In-depth case studies on investment strategies, portfolio analysis, risk management, and market trends.',
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

export default async function CaseStudyPage() {
  // Fetch only 5 posts initially for better performance
  const initialPosts = await getPostsByCategory('case-study', 5);

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Finance Case Studies",
    "description": "In-depth case studies on investment strategies, portfolio analysis, risk management, and market trends",
    "url": `${baseUrl}/case-study`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": initialPosts.length,
      "itemListElement": initialPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CaseStudy",
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
            category="case-study"
            title="Case Studies"
            description="Explore in-depth case studies on investment strategies, portfolio analysis, risk management, and market trends."
          />
        </Container>
      </main>
    </>
  );
}


