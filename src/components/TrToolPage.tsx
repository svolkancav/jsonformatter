import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from './SEO';
import { AdSlot } from './AdSlot';
import { trBySlug, trTools } from '../data/trContent';

interface TrToolPageProps {
  trKey: string;
  children: ReactNode; // the tool component
}

/** Turkish landing-page wrapper: Turkish SEO + heading + tool + Turkish content. */
export function TrToolPage({ trKey, children }: TrToolPageProps) {
  const def = trBySlug[trKey];
  if (!def) return null;

  const others = trTools.filter((t) => t.key !== trKey);

  return (
    <>
      <SEO
        title={def.title}
        description={def.description}
        keywords={def.keywords}
        canonicalUrl={`https://jsonformater.com/tr/${def.slug}`}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{def.h1}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{def.tagline}</p>
        </header>

        <AdSlot slotId={`tr_${trKey}_header`} format="horizontal" />

        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          {children}
        </main>

        <AdSlot slotId={`tr_${trKey}_footer`} />

        <div className="mt-16 space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{def.h1} Nedir?</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {def.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Nasıl Kullanılır?</h2>
            <ol className="space-y-4">
              {def.steps.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 leading-relaxed pt-1">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: def.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                  })),
                }),
              }}
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              {def.faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Diğer Türkçe Araçlar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {others.map((t) => (
                <Link
                  key={t.key}
                  to={`/tr/${t.slug}`}
                  className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {t.h1}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default TrToolPage;
