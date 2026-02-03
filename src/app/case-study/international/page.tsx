import Container from "@/app/_components/container";
import { PostsListWithSearch } from "@/app/_components/posts-list-with-search";
import { StructuredData } from "@/app/_components/structured-data";
import { getPostsByCategory } from "@/lib/api";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'Global → India Sector Impact | International Case Studies | Punjipati',
  description: 'How global sector trends, international finance scenarios, and world market movements will impact Indian banking, fintech, manufacturing, and energy sectors over 2026–2030.',
  keywords: ['global sectors India impact', 'international finance India', 'global trends India sectors', 'world markets India impact', 'international case study India', 'global impact India sectors'],
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
        "item": `${baseUrl}/case-study/international`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "International Case Study",
        "item": `${baseUrl}/case-study/international`
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
            category="case-study-international"
            title="International Case Studies"
            description="How global sector trends, international finance scenarios, and world market movements will impact Indian banking, fintech, manufacturing, and energy sectors over 2026–2030."
          />
        </Container>
      </main>
    </>
  );
}





