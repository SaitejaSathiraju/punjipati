import Container from "@/app/_components/container";
import { StructuredData } from "@/app/_components/structured-data";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://punjipati.com';

export const metadata: Metadata = {
  title: 'Editorial Policy | Punjipati Finance',
  description: 'Our editorial policy outlines how Punjipati Finance ensures accuracy, transparency, and integrity in all our financial content. Learn about our standards, fact-checking process, and commitment to unbiased reporting.',
  alternates: {
    canonical: `${baseUrl}/editorial-policy`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/editorial-policy`,
    title: 'Editorial Policy | Punjipati Finance',
    description: 'Our editorial policy outlines how Punjipati Finance ensures accuracy, transparency, and integrity in all our financial content.',
  },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <StructuredData type="website" />
      <main>
        <Container>
          <article className="mb-32 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-8 dark:text-white">
              Editorial Policy
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-12">
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  At Punjipati Finance, we are committed to maintaining the highest standards of journalistic 
                  integrity, accuracy, and transparency. This editorial policy outlines our principles and practices 
                  for creating and publishing financial content.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Accuracy and Fact-Checking</h2>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>All information is verified using credible sources including government agencies (RBI, SEBI), 
                  international organizations (IMF, World Bank), and reputable financial institutions</li>
                  <li>Data and statistics are cross-referenced with multiple authoritative sources</li>
                  <li>All articles undergo editorial review before publication</li>
                  <li>Content is regularly updated to reflect the latest information and market developments</li>
                  <li>Corrections are made promptly when errors are identified</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Transparency and Disclosure</h2>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>We clearly cite all sources and data references</li>
                  <li>Any potential conflicts of interest are disclosed</li>
                  <li>Sponsored content (if any) is clearly labeled</li>
                  <li>We disclose when content is updated and the date of last modification</li>
                  <li>Author credentials and expertise are clearly stated</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Independence and Objectivity</h2>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>Our editorial decisions are independent and not influenced by advertisers, sponsors, or external parties</li>
                  <li>We provide objective analysis without bias toward any particular investment, company, or financial product</li>
                  <li>Opinions are clearly distinguished from factual reporting</li>
                  <li>We present multiple perspectives on controversial topics</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Editorial Process</h2>
                <ol className="list-decimal list-inside space-y-2 text-lg dark:text-gray-300">
                  <li><strong>Research:</strong> Articles are thoroughly researched using credible sources</li>
                  <li><strong>Writing:</strong> Content is written by qualified authors with expertise in finance and economics</li>
                  <li><strong>Review:</strong> All articles undergo editorial review for accuracy, clarity, and compliance with our standards</li>
                  <li><strong>Fact-Checking:</strong> Key facts, figures, and claims are verified</li>
                  <li><strong>Publication:</strong> Content is published only after meeting our quality standards</li>
                  <li><strong>Updates:</strong> Articles are regularly reviewed and updated to maintain accuracy</li>
                </ol>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Source Attribution</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We attribute all information to its source. Our preferred sources include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>Government agencies: RBI, SEBI, Ministry of Finance, etc.</li>
                  <li>International organizations: IMF, World Bank, OECD, etc.</li>
                  <li>Reputable financial institutions and research organizations</li>
                  <li>Academic research and peer-reviewed studies</li>
                  <li>Official company filings and announcements</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Corrections Policy</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  If we discover an error in our content, we will:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>Correct the error promptly</li>
                  <li>Clearly indicate what was corrected and when</li>
                  <li>Update the article's modification date</li>
                  <li>Notify readers of significant corrections</li>
                </ul>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300 mt-4">
                  If you believe you've found an error, please contact us through our 
                  <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400"> Contact Page</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Not Financial Advice</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  <strong>Important:</strong> All content on Punjipati Finance is for informational and educational 
                  purposes only. It is not intended as financial, investment, tax, or legal advice.
                </p>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We do not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>Provide personalized investment advice</li>
                  <li>Recommend specific securities or investments</li>
                  <li>Guarantee investment returns</li>
                  <li>Act as a financial advisor or broker</li>
                </ul>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300 mt-4">
                  Always consult with qualified financial advisors, tax professionals, or legal experts before 
                  making financial decisions.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Content Updates</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Financial markets and information change rapidly. We regularly review and update our content 
                  to ensure accuracy. Each article displays its publication date and last modification date.
                </p>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  Major updates include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg dark:text-gray-300">
                  <li>Updated statistics and data</li>
                  <li>New market developments</li>
                  <li>Revised analysis based on new information</li>
                  <li>Corrections and clarifications</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Questions or Concerns</h2>
                <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">
                  If you have questions about our editorial policy or concerns about our content, please contact us 
                  through our <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">Contact Page</a>.
                </p>
              </section>

              <section className="mb-12">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Last updated: February 2024
                </p>
              </section>
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}

