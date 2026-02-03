import Footer from "@/app/_components/footer";
import { Navbar } from "@/app/_components/navbar";
import { StructuredData } from "@/app/_components/structured-data";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Punjipati - India-First Financial Impact & Future Intelligence',
    template: '%s | Punjipati Finance'
  },
  description: `Punjipati explains how global & Indian economic events will impact Indians over the next 1–5 years. Clear, practical, and early analysis of RBI policy, budget impacts, market trends, and economic futures for Indian households, investors, and businesses.`,
  keywords: [
    'finance', 'investment', 'market analysis', 'financial news', 'personal finance', 'stock market', 'trading', 'economics',
    'investment strategies', 'portfolio management', 'wealth management', 'financial planning', 'retirement planning',
    'stock trading', 'cryptocurrency', 'bitcoin', 'ethereum', 'crypto trading', 'forex trading', 'forex market',
    'mutual funds', 'ETFs', 'bonds', 'real estate investment', 'REITs', 'commodities', 'gold investment', 'silver investment',
    'market trends', 'economic analysis', 'financial markets', 'bull market', 'bear market', 'market volatility',
    'dividend investing', 'value investing', 'growth investing', 'day trading', 'swing trading', 'options trading',
    'financial advisor', 'investment advisor', 'financial literacy', 'money management', 'budgeting', 'saving money',
    'debt management', 'credit score', 'mortgage', 'insurance', 'tax planning', 'estate planning',
    'India finance', 'Indian stock market', 'NSE', 'BSE', 'Sensex', 'Nifty', 'Indian economy', 'RBI', 'Reserve Bank of India',
    'international finance', 'global markets', 'emerging markets', 'developed markets', 'currency exchange', 'forex rates',
    'market research', 'financial analysis', 'technical analysis', 'fundamental analysis', 'chart patterns', 'candlestick patterns'
  ],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Punjipati Finance',
    title: 'Punjipati - Finance Insights & Analysis',
    description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights. Expert analysis on stocks, cryptocurrency, real estate, wealth management, and global economic trends.',
    images: [{
      url: HOME_OG_IMAGE_URL,
      width: 180,
      height: 180,
      alt: 'Punjipati Finance - Finance Insights & Analysis',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punjipati - Finance Insights & Analysis',
    description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights. Expert analysis on stocks, cryptocurrency, real estate, wealth management, and global economic trends.',
    images: [HOME_OG_IMAGE_URL],
    creator: '@punjipati',
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
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'finance',
  classification: 'Finance News and Analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Punjipati Finance RSS Feed" />
        <link rel="alternate" type="application/atom+xml" href="/feed.xml" title="Punjipati Finance Atom Feed" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-black dark:text-white")}
      >
        <StructuredData type="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Punjipati Finance",
              "alternateName": "Punjipati",
              "url": baseUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/favicon/favicon.png`,
                "width": 512,
                "height": 512
              },
              "description": "India-first financial impact and future intelligence. Punjipati explains how global & Indian economic events will impact Indians over the next 1–5 years.",
              "sameAs": [
                "https://www.instagram.com/punjipati/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "areaServed": "Worldwide",
                "availableLanguage": ["English"]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "name": "Main Navigation",
              "url": baseUrl,
              "hasPart": [
                {
                  "@type": "SiteNavigationElement",
                  "name": "Home",
                  "url": baseUrl
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "News",
                  "url": `${baseUrl}/news/national`,
                  "hasPart": [
                    {
                      "@type": "SiteNavigationElement",
                      "name": "National News",
                      "url": `${baseUrl}/news/national`
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "name": "International News",
                      "url": `${baseUrl}/news/international`
                    }
                  ]
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Market",
                  "url": `${baseUrl}/market/national`,
                  "hasPart": [
                    {
                      "@type": "SiteNavigationElement",
                      "name": "National Market",
                      "url": `${baseUrl}/market/national`
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "name": "International Market",
                      "url": `${baseUrl}/market/international`
                    }
                  ]
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Case Study",
                  "url": `${baseUrl}/case-study/national`,
                  "hasPart": [
                    {
                      "@type": "SiteNavigationElement",
                      "name": "National Case Study",
                      "url": `${baseUrl}/case-study/national`
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "name": "International Case Study",
                      "url": `${baseUrl}/case-study/international`
                    }
                  ]
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "All Posts",
                  "url": `${baseUrl}/posts`
                }
              ]
            })
          }}
        />
        <ThemeSwitcher />
        <Navbar />
        <div className="min-h-screen pt-32">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
