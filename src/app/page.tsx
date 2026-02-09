import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { StructuredData } from "@/app/_components/structured-data";
import { getAllPosts } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Punjipati - India-First Financial Impact & Future Intelligence',
  description: 'Punjipati explains how global & Indian economic events will impact Indians over the next 1–5 years. Clear, practical, and early analysis of RBI policy, budget impacts, market trends, and economic futures for Indian households, investors, and businesses.',
  keywords: [
    'India finance', 'Indian economy impact', 'RBI policy explained', 'India budget analysis', 'Indian stock market future',
    'India inflation impact', 'Indian jobs market', 'India consumption trends', 'Indian banking future', 'India fintech impact',
    'India MSME finance', 'India manufacturing future', 'India energy transition', 'Tier-2 India finance', 'Tier-3 India economy',
    'India 2026', 'India 2027', 'India 2028', 'India 2029', 'India 2030', 'India economic future', 'India financial impact',
    'global impact India', 'US economy India impact', 'China economy India impact', 'Europe economy India impact',
    'Indian markets analysis', 'NSE future', 'BSE trends', 'Sensex outlook', 'Nifty analysis', 'Indian rupee impact',
    'India interest rates', 'India inflation future', 'India employment trends', 'India savings patterns', 'India investment future'
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com'}/`,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com'}/`,
    siteName: 'Punjipati Finance',
    title: 'Punjipati - India-First Financial Impact & Future Intelligence',
    description: 'Punjipati explains how global & Indian economic events will impact Indians over the next 1–5 years. Clear, practical, and early analysis of RBI policy, budget impacts, and economic futures.',
    images: [{
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com'}/favicon/apple-touch-icon.png`,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance - Finance Insights & Analysis',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punjipati - India-First Financial Impact & Future Intelligence',
    description: 'Punjipati explains how global & Indian economic events will impact Indians over the next 1–5 years. Clear, practical, and early analysis.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com'}/favicon/apple-touch-icon.png`],
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

export default async function Index() {
  // Fetch newest posts - sorted by date descending (newest first)
  const allPosts = await getAllPosts();
  
  // Explicitly sort by date to ensure newest first (in case API doesn't sort)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });
  
  // Show top 10 newest articles on homepage
  const latestPosts = sortedPosts.slice(0, 10);
  const heroPost = latestPosts[0];
  const morePosts = latestPosts.slice(1);

  return (
    <>
      <StructuredData type="website" />
      {/* Preload hero image for LCP optimization */}
      {heroPost?.coverImage && (
        <link
          rel="preload"
          as="image"
          href={heroPost.coverImage}
          fetchPriority="high"
        />
      )}
      <main>
        <Container>
          <Intro />
          {heroPost ? (
            <>
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                No posts yet. Create your first post from the{" "}
                <a href="/admin-secure-punjipati-2024/login" className="text-blue-600 hover:underline">
                  Admin Panel
                </a>
                .
              </p>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
