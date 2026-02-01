import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { StructuredData } from "@/app/_components/structured-data";
import { Breadcrumbs } from "@/app/_components/breadcrumbs";

// Make this page dynamic to fetch fresh data from Supabase
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Post(props: Params) {
  const params = await props.params;
  const slug = params.slug;
  let post;
  
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  const fullUrl = `${baseUrl}/posts/${slug}`;

  return (
    <>
      <StructuredData post={post} type="article" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                "name": "Articles",
                "item": `${baseUrl}/`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": fullUrl
              }
            ]
          })
        }}
      />
      <main>
        <Alert preview={post.preview} />
        <Container>
          <Header />
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Articles", href: "/" },
              { label: post.title },
            ]}
          />
          <article className="mb-32" itemScope itemType="https://schema.org/Article">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={content} />
          </article>
        </Container>
      </main>
    </>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  let post;
  
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  const title = post.title;
  const description = post.excerpt;
  const url = `${baseUrl}/posts/${slug}`;
  const defaultImage = `${baseUrl}/favicon/apple-touch-icon.png`;
  const imageUrl = (post.ogImage?.url || post.coverImage)
    ? ((post.ogImage?.url || post.coverImage)?.startsWith('http')
      ? (post.ogImage?.url || post.coverImage)
      : `${baseUrl}${post.ogImage?.url || post.coverImage}`)
    : defaultImage;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.date).toISOString();

  // Extract keywords from title and content
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const categoryKeywords = post.category?.includes('case-study')
    ? ['case study', 'investment strategies', 'portfolio analysis', 'risk management']
    : post.category?.includes('market')
    ? ['market analysis', 'market trends', 'market updates', 'financial markets']
    : post.category?.includes('news')
    ? ['finance news', 'market updates', 'economic news', 'financial news']
    : ['finance', 'investment', 'market analysis'];
  
  const keywords = [
    ...categoryKeywords,
    'finance',
    'investment',
    'market analysis',
    'financial news',
    'personal finance',
    'stock market',
    'trading',
    'economics',
    ...titleWords
  ];

  return {
    title: `${title} | Punjipati Finance`,
    description,
    keywords,
    authors: [{ name: post.author.name }],
    creator: 'Punjipati Finance',
    publisher: 'Punjipati Finance',
    category: post.category?.includes('case-study') ? 'Case Study' : post.category?.includes('market') ? 'Market' : post.category?.includes('news') ? 'News' : 'Finance',
    classification: post.category?.includes('case-study') 
      ? (post.category?.includes('national') ? 'National Finance Case Studies' : 'International Finance Case Studies')
      : post.category?.includes('market')
      ? (post.category?.includes('national') ? 'National Market Analysis' : 'International Market Analysis')
      : post.category?.includes('news')
      ? (post.category?.includes('national') ? 'National Finance News' : 'International Finance News')
      : 'Finance News and Analysis',
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Punjipati Finance',
      locale: 'en_US',
      publishedTime,
      modifiedTime,
      authors: [post.author.name],
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@punjipati',
      site: '@punjipati',
    },
    alternates: {
      canonical: url,
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
    other: {
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:author': post.author.name,
      'article:section': post.category?.includes('case-study') ? 'Case Study' : post.category?.includes('market') ? 'Market' : post.category?.includes('news') ? 'News' : 'Finance',
      'article:tag': keywords.join(', '),
      'article:category': post.category || 'Finance',
    },
  };
}

// Note: generateStaticParams is not needed for dynamic pages
// All posts are discoverable via sitemap.xml and internal links
// This ensures Google can crawl all posts from Supabase dynamically
