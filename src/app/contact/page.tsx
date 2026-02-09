import Container from "@/app/_components/container";
import { StructuredData } from "@/app/_components/structured-data";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.punjipati.com';

export const metadata: Metadata = {
  title: 'Contact Us | Punjipati Finance',
  description: 'Get in touch with Punjipati Finance. We welcome your feedback, questions, corrections, and suggestions. Contact us for editorial inquiries, partnerships, or general questions.',
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/contact`,
    title: 'Contact Us | Punjipati Finance',
    description: 'Get in touch with Punjipati Finance. We welcome your feedback, questions, corrections, and suggestions.',
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Punjipati Finance",
    "description": "Get in touch with Punjipati Finance",
    "url": `${baseUrl}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Punjipati Finance",
      "url": baseUrl,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "areaServed": "Worldwide",
        "availableLanguage": ["English"],
        "sameAs": [
          "https://www.instagram.com/punjipati/"
        ]
      }
    }
  };

  return (
    <>
      <StructuredData type="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main>
        <Container>
          <article className="mb-32 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-8 dark:text-white">
              Contact Us
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-12">
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We value your feedback, questions, and suggestions. Whether you have a correction to report, 
                  a question about our content, or a suggestion for improvement, we'd love to hear from you.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Ways to Reach Us</h2>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-3 dark:text-white">Social Media</h3>
                  <p className="text-lg leading-relaxed mb-2 dark:text-gray-300">
                    Follow us and reach out on social media:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                    <li>Instagram: <a href="https://www.instagram.com/punjipati/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">@punjipati</a></li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-3 dark:text-white">RSS Feed</h3>
                  <p className="text-lg leading-relaxed mb-2 dark:text-gray-300">
                    Stay updated with our latest articles by subscribing to our RSS feed:
                  </p>
                  <p className="text-lg dark:text-gray-300">
                    <a href="/feed.xml" className="text-blue-600 hover:underline dark:text-blue-400">Subscribe to RSS Feed</a>
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">What We Can Help With</h2>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li><strong>Corrections:</strong> If you've found an error in our content, please let us know. 
                  We take accuracy seriously and will correct errors promptly.</li>
                  <li><strong>Questions:</strong> Have a question about our content, editorial policy, or how we work? 
                  We're happy to help.</li>
                  <li><strong>Suggestions:</strong> Ideas for topics to cover, improvements to our site, or feedback 
                  on our content are always welcome.</li>
                  <li><strong>Editorial Inquiries:</strong> If you're interested in contributing or have editorial questions, 
                  please reach out.</li>
                  <li><strong>Partnerships:</strong> For partnership or collaboration inquiries, we'd love to hear from you.</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Response Time</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We aim to respond to all inquiries within 2-3 business days. For urgent corrections or time-sensitive 
                  matters, we'll prioritize those accordingly.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Editorial Policy</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  For information about how we create and review content, please see our 
                  <a href="/editorial-policy" className="text-blue-600 hover:underline dark:text-blue-400"> Editorial Policy</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">About Us</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Learn more about Punjipati Finance, our mission, and our commitment to quality financial journalism 
                  on our <a href="/about" className="text-blue-600 hover:underline dark:text-blue-400">About Page</a>.
                </p>
              </section>

              <section className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Important Note</h2>
                <p className="text-lg leading-relaxed mb-2 dark:text-gray-300">
                  <strong>We do not provide personalized financial advice.</strong> If you need investment advice, 
                  tax guidance, or financial planning assistance, please consult with qualified professionals such as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300 mt-4">
                  <li>Certified Financial Planners (CFP)</li>
                  <li>Registered Investment Advisors (RIA)</li>
                  <li>Chartered Accountants (CA)</li>
                  <li>Licensed financial advisors</li>
                </ul>
              </section>
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}









