import Container from "@/app/_components/container";
import { StructuredData } from "@/app/_components/structured-data";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';

export const metadata: Metadata = {
  title: 'About Us | Punjipati Finance',
  description: 'Learn about Punjipati Finance - India-first financial impact and future intelligence. We explain how global & Indian economic events will impact Indians over the next 1–5 years.',
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/about`,
    title: 'About Us | Punjipati Finance',
    description: 'Learn about Punjipati Finance - your trusted source for finance news, market analysis, and investment insights.',
  },
};

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Punjipati Finance",
    "description": "Learn about Punjipati Finance - your trusted source for finance news, market analysis, and investment insights.",
    "url": `${baseUrl}/about`,
    "mainEntity": {
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
      "description": "Your trusted source for finance news, market analysis, investment strategies, and financial insights.",
      "foundingDate": "2024",
      "sameAs": [
        "https://www.instagram.com/punjipati/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "areaServed": "Worldwide",
        "availableLanguage": ["English"]
      }
    }
  };

  return (
    <>
      <StructuredData type="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main>
        <Container>
          <article className="mb-32 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-8 dark:text-white">
              About Punjipati Finance
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-12">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border-l-4 border-blue-600">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Our Positioning
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    <strong>India-First Financial Impact & Future Intelligence</strong>
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                    Punjipati explains how global & Indian economic events will impact Indians over the next 1–5 years — 
                    clearly, practically, and early.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Mission</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Punjipati Finance is dedicated to providing <strong>India-first financial intelligence</strong> that helps 
                  Indian households, investors, professionals, and MSMEs understand how economic events will impact their 
                  financial future. We don't compete on breaking news—we compete on understanding and interpretation.
                </p>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Our mission is to explain the <strong>future impact</strong> of today's economic events on India. 
                  We focus on second-order effects, long-term implications, and practical understanding—not hype, 
                  predictions without logic, or financial advice.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">What We Cover</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We focus exclusively on content that explains future financial impact on India:
                </p>
                <ul className="list-disc list-inside space-y-3 text-lg dark:text-gray-300">
                  <li><strong>Global → India Impact:</strong> How US, China, and Europe economic events affect Indian 
                  markets, jobs, inflation, and consumption over the next 1–5 years</li>
                  <li><strong>India Economic Futures (2026–2030):</strong> Analysis of markets, banking, employment, 
                  consumption, and savings trends shaping India's financial future</li>
                  <li><strong>RBI, Policy & Budget — Explained Simply:</strong> What policies mean for Indians, 
                  not just what they are. Clear interpretation of monetary policy, fiscal measures, and regulatory changes</li>
                  <li><strong>Sector-Specific Deep Dives:</strong> Future impact analysis for banking, fintech, MSMEs, 
                  manufacturing, and energy sectors in India</li>
                  <li><strong>Regional India Finance:</strong> Tier-2, Tier-3, and state-level economic impacts 
                  and future trends</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4 dark:text-gray-300">
                  <strong>We do not cover:</strong> Breaking news, stock tips, generic summaries, or content that doesn't 
                  explain future impact on India.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Commitment to Quality</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  At Punjipati Finance, we are committed to maintaining the highest standards of journalistic integrity 
                  and accuracy. Our content is:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li><strong>Well-Researched:</strong> All articles are thoroughly researched using credible sources 
                  including RBI, IMF, World Bank, and other authoritative financial institutions</li>
                  <li><strong>Accurate:</strong> We fact-check all information and update content regularly to reflect 
                  the latest developments</li>
                  <li><strong>Unbiased:</strong> We provide objective analysis without conflicts of interest</li>
                  <li><strong>Transparent:</strong> We clearly cite sources and disclose any potential conflicts</li>
                  <li><strong>Accessible:</strong> We explain complex financial concepts in clear, understandable language</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Editorial Standards</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Our editorial team follows strict guidelines to ensure accuracy, fairness, and transparency. 
                  All content undergoes a rigorous review process before publication. We regularly update articles 
                  to reflect new information and maintain accuracy over time.
                </p>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  For more details on our editorial process, please see our 
                  <a href="/editorial-policy" className="text-blue-600 hover:underline dark:text-blue-400"> Editorial Policy</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Disclaimer</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  <strong>Important:</strong> The information provided on Punjipati Finance is for educational and 
                  informational purposes only. It is not intended as financial, investment, or professional advice. 
                  Always consult with qualified financial advisors before making investment decisions.
                </p>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Past performance does not guarantee future results. All investments carry risk, and you may lose 
                  money. We do not provide personalized investment advice or recommendations for specific securities.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Contact Us</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We value your feedback and questions. If you have suggestions, corrections, or would like to 
                  get in touch, please visit our <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">Contact Page</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Stay Connected</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Follow us on social media and subscribe to stay updated with the latest finance news and insights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>Instagram: <a href="https://www.instagram.com/punjipati/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">@punjipati</a></li>
                  <li>RSS Feed: <a href="/feed.xml" className="text-blue-600 hover:underline dark:text-blue-400">Subscribe to our RSS feed</a></li>
                </ul>
              </section>
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}

