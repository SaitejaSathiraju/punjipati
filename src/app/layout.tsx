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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com'),
  title: {
    default: 'Punjipati - Finance Insights & Analysis',
    template: '%s | Punjipati Finance'
  },
  description: `Your trusted source for finance news, market analysis, investment strategies, and financial insights. Stay informed with Punjipati Finance.`,
  keywords: ['finance', 'investment', 'market analysis', 'financial news', 'personal finance', 'stock market', 'trading', 'economics'],
  authors: [{ name: 'Punjipati Finance Team' }],
  creator: 'Punjipati Finance',
  publisher: 'Punjipati Finance',
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
    description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights.',
    images: [{
      url: HOME_OG_IMAGE_URL,
      width: 1200,
      height: 630,
      alt: 'Punjipati Finance - Finance Insights & Analysis',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punjipati - Finance Insights & Analysis',
    description: 'Your trusted source for finance news, market analysis, investment strategies, and financial insights.',
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
  alternates: {
    canonical: '/',
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
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
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
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
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com',
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com'}/logo.png`,
              "description": "Your trusted source for finance news, market analysis, investment strategies, and financial insights.",
              "sameAs": [
                // Add your social media links here when available
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
        <ThemeSwitcher />
        <Navbar />
        <div className="min-h-screen pt-32">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
