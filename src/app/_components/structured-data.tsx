import { type Post } from "@/interfaces/post";

type StructuredDataProps = {
  post?: Post;
  type?: 'article' | 'website';
};

export function StructuredData({ post, type = 'website' }: StructuredDataProps) {
  if (type === 'article' && post) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
    
    // Determine article type based on content/category
    const articleType = post.title.toLowerCase().includes('case study') 
      ? 'CaseStudy' 
      : post.title.toLowerCase().includes('news') || post.title.toLowerCase().includes('market')
      ? 'NewsArticle'
      : 'Article';

    // Extract keywords from title
    const titleWords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const keywords = [
      "finance",
      "investment",
      "market analysis",
      "financial news",
      "personal finance",
      "stock market",
      "trading",
      "economics",
      ...titleWords
    ];

    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": articleType,
      "headline": post.title,
      "description": post.excerpt,
      "image": [
        {
          "@type": "ImageObject",
          "url": post.ogImage?.url || post.coverImage,
          "width": 1200,
          "height": 630
        }
      ],
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "image": post.author.picture,
        "url": `${baseUrl}/authors/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Punjipati Finance",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/posts/${post.slug}`
      },
      "articleSection": "Finance",
      "keywords": keywords,
      "inLanguage": "en-US",
      "wordCount": post.content?.split(/\s+/).length || 0,
      "timeRequired": `PT${Math.ceil((post.content?.split(/\s+/).length || 0) / 200)}M`
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';
  
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Punjipati Finance",
    "alternateName": "Punjipati",
    "description": "Your trusted source for finance news, market analysis, investment strategies, and financial insights.",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Punjipati Finance",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      },
      "sameAs": [
        // Add your social media links here
        // "https://twitter.com/punjipati",
        // "https://linkedin.com/company/punjipati"
      ]
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Punjipati Finance"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
    />
  );
}

