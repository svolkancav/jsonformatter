import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from './SEO';
import { AdSlot } from './AdSlot';
import { UI_LABELS, toolsForLocale, type LocaleDef } from '../data/localeContent';

interface LocaleToolPageProps {
  def: LocaleDef;
  children: ReactNode;
}

/** Generic localized landing-page wrapper (German, Spanish, …). */
export function LocaleToolPage({ def, children }: LocaleToolPageProps) {
  const ui = UI_LABELS[def.locale];
  const others = toolsForLocale(def.locale).filter((t) => t.key !== def.key);

  return (
    <>
      <SEO
        title={def.title}
        description={def.description}
        keywords={def.keywords}
        canonicalUrl={`https://jsonformater.com/${def.locale}/${def.slug}`}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{def.h1}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{def.tagline}</p>
        </header>

        <AdSlot slotId={`${def.locale}_${def.key}_header`} format="horizontal" />

        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          {children}
        </main>

        <AdSlot slotId={`${def.locale}_${def.key}_footer`} />

        <div className="mt-16 space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{ui.whatIs}</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {def.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">{ui.howTo}</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">{ui.faq}</h2>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{ui.other}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {others.map((t) => (
                <Link
                  key={t.key}
                  to={`/${t.locale}/${t.slug}`}
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

interface LocaleHubProps {
  locale: 'de' | 'es';
}

export function LocaleHub({ locale }: LocaleHubProps) {
  const ui = UI_LABELS[locale];
  const tools = toolsForLocale(locale);
  return (
    <>
      <SEO
        title={locale === 'de' ? 'Kostenlose JSON-Tools (Deutsch) | Formatierer & Konverter' : 'Herramientas JSON gratis (Español) | Formateador y Conversores'}
        description={ui.hubTagline}
        canonicalUrl={`https://jsonformater.com/${locale}`}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{ui.hubTitle}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{ui.hubTagline}</p>
        </header>

        <AdSlot slotId={`${locale}_hub_header`} format="horizontal" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {tools.map((t) => (
            <Link
              key={t.key}
              to={`/${t.locale}/${t.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t.h1}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{t.tagline}</p>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                {ui.openTool} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <AdSlot slotId={`${locale}_hub_footer`} />
      </div>
    </>
  );
}
