import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';

export const metadata: Metadata = {
  title: 'India Sector Deep Dives | Banking, Fintech, MSMEs | Punjipati',
  description: 'Future impact analysis for banking, fintech, MSMEs, manufacturing, and energy sectors in India. In-depth case studies on how sector trends will impact Indians over 2026–2030.',
  keywords: ['India banking future', 'India fintech impact', 'India MSME finance', 'India manufacturing future', 'India energy transition', 'India sector analysis', 'India industry future', 'Tier-2 India finance', 'Tier-3 India economy'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  category: 'Finance',
  classification: 'National Finance Case Studies',
  alternates: {
    canonical: `${baseUrl}/case-study/national`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/case-study/national`,
    siteName: 'Punjipati Finance',
    title: 'National Case Studies | Punjipati Finance',
    description: 'In-depth national case studies on investment strategies, portfolio analysis, risk management, and market trends. Learn from real-world domestic finance scenarios.',
    images: [{
      url: `${baseUrl}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance National Case Studies',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National Case Studies | Punjipati Finance',
    description: 'In-depth national case studies on investment strategies, portfolio analysis, risk management, and market trends.',
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

export default async function NationalCaseStudyPage() {
  // Fetch ALL posts for better SEO - Google needs to see all posts in HTML
  const initialPosts = await getPostsByCategory('case-study-national');

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "National Finance Case Studies",
    "description": "In-depth national case studies on investment strategies, portfolio analysis, risk management, and market trends",
    "url": `${baseUrl}/case-study/national`,
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
        "name": "Case Study",
        "item": `${baseUrl}/case-study/national`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "National Case Study",
        "item": `${baseUrl}/case-study/national`
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
            category="case-study-national"
            title="National Case Studies"
            description="Future impact analysis for banking, fintech, MSMEs, manufacturing, and energy sectors in India. How sector trends will impact Indians over 2026–2030."
          />
        </Container>
      </main>
    </>
  );
}





