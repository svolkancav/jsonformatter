import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { glossaryTerms } from '../data/glossary';

export function Glossary() {
  return (
    <>
      <SEO
        title="JSON Glossary | Data Format Terms Explained (JSON, JWT, YAML…)"
        description="A plain-English glossary of JSON and data-format terms — object, array, serialization, JSON Schema, JSONPath, JWT, NDJSON, TOON, epoch, Base64 and more."
        keywords="json glossary, json terms, what is json, json definitions, data format glossary, jwt jsonpath ndjson meaning"
        canonicalUrl="https://jsonformater.com/glossary"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">JSON Glossary</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Plain-English definitions of the JSON and data-format terms you’ll run into as a developer.
          </p>
        </header>

        <AdSlot slotId="glossary_header" format="horizontal" />

        {/* Quick jump list */}
        <div className="my-6 flex flex-wrap gap-2">
          {glossaryTerms.map((t) => (
            <a
              key={t.slug}
              href={`#${t.slug}`}
              className="px-3 py-1 text-sm rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t.term}
            </a>
          ))}
        </div>

        <dl className="space-y-6">
          {glossaryTerms.map((t) => (
            <div
              key={t.slug}
              id={t.slug}
              className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <dt className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.term}</dt>
              <dd className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.definition}</dd>
            </div>
          ))}
        </dl>

        <AdSlot slotId="glossary_footer" />
      </div>
    </>
  );
}
