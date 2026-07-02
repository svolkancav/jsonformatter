import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cheatSheets, cheatBySlug } from '../data/cheatsheets';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

export function CheatSheetsHub() {
  return (
    <>
      <SEO
        title="Developer Cheat Sheets | JSON, JWT & More Quick References"
        description="Free quick-reference cheat sheets for developers: JSON syntax, JWT claims, and more. Concise, copy-friendly, and always at hand."
        keywords="cheat sheet, json cheat sheet, jwt cheat sheet, json syntax reference, jwt claims reference, developer reference"
        canonicalUrl="https://jsonformater.com/cheatsheet"
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Developer Cheat Sheets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Concise, quick-reference guides for JSON, JWT, and more — everything you need at a glance.
          </p>
        </header>

        <AdSlot slotId="cheatsheet_hub_header" format="horizontal" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {cheatSheets.map((c) => (
            <Link
              key={c.slug}
              to={`/cheatsheet/${c.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {c.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{c.description}</p>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Open cheat sheet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <AdSlot slotId="cheatsheet_hub_footer" />
      </div>
    </>
  );
}

export function CheatSheetDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sheet = slug ? cheatBySlug[slug] : undefined;

  if (!sheet) return <Navigate to="/cheatsheet" replace />;

  const others = cheatSheets.filter((c) => c.slug !== sheet.slug);

  return (
    <>
      <SEO
        title={`${sheet.title} | Free Developer Reference`}
        description={sheet.description}
        canonicalUrl={`https://jsonformater.com/cheatsheet/${sheet.slug}`}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/cheatsheet" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          All cheat sheets
        </Link>

        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{sheet.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{sheet.intro}</p>
        </header>

        <AdSlot slotId="cheatsheet_detail_header" format="horizontal" />

        <div className="space-y-8">
          {sheet.sections.map((section, i) => (
            <section key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.heading}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {section.rows.map((row, j) => (
                      <tr key={j} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                        <td className="py-3 pr-4 align-top font-mono font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                          {row.term}
                        </td>
                        <td className="py-3 pr-4 align-top text-gray-600 dark:text-gray-400">{row.meaning}</td>
                        {row.example && (
                          <td className="py-3 align-top font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {row.example}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        <AdSlot slotId="cheatsheet_detail_footer" />

        {others.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">More cheat sheets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  to={`/cheatsheet/${c.slug}`}
                  className="group px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {c.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
