import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { StructuredData } from "@/app/_components/structured-data";
import { getAllPosts } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Punjipati - Finance Insights & Analysis',
  description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights. Stay informed with the latest trends in finance, stock market, trading, and economics.',
  keywords: ['finance', 'investment', 'market analysis', 'financial news', 'personal finance', 'stock market', 'trading', 'economics', 'investment strategies', 'portfolio management', 'risk management'],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com',
    siteName: 'Punjipati Finance',
    title: 'Punjipati - Finance Insights & Analysis',
    description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights.',
    images: [{
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com'}/assets/blog/preview/cover.jpg`,
      width: 1200,
      height: 630,
      alt: 'Punjipati Finance - Finance Insights & Analysis',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punjipati - Finance Insights & Analysis',
    description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com'}/assets/blog/preview/cover.jpg`],
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
  const allPosts = await getAllPosts();

  // Get latest 5 posts
  const latestPosts = allPosts.slice(0, 5);
  const heroPost = latestPosts[0];
  const morePosts = latestPosts.slice(1);

  return (
    <>
      <StructuredData type="website" />
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
              <p className="text-xl text-gray-600 dark:text-gray-400">
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
