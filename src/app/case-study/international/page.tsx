import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'International Case Studies | Punjipati Finance',
  description: 'In-depth international case studies on investment strategies, portfolio analysis, risk management, and global market trends. Learn from real-world international finance scenarios.',
  keywords: ['international case study', 'global case study', 'investment strategies', 'portfolio analysis', 'risk management', 'global market trends', 'international finance case study', 'global investment analysis'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'International Finance Case Studies',
  alternates: {
    canonical: `${baseUrl}/case-study/international`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/case-study/international`,
    siteName: 'Punjipati Finance',
    title: 'International Case Studies | Punjipati Finance',
    description: 'In-depth international case studies on investment strategies, portfolio analysis, risk management, and global market trends. Learn from real-world international finance scenarios.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance International Case Studies',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Case Studies | Punjipati Finance',
    description: 'In-depth international case studies on investment strategies, portfolio analysis, risk management, and global market trends.',
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

export default async function InternationalCaseStudyPage() {
  // Fetch only 5 posts initially for better performance
  const initialPosts = await getPostsByCategory('case-study-international', 5);

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "International Finance Case Studies",
    "description": "In-depth international case studies on investment strategies, portfolio analysis, risk management, and global market trends",
    "url": `${baseUrl}/case-study/international`,
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
            category="case-study-international"
            title="International Case Studies"
            description="Explore in-depth international case studies on investment strategies, portfolio analysis, risk management, and global market trends."
          />
        </Container>
      </main>
    </>
  );
}

