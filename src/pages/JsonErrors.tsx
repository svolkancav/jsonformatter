import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { jsonErrors, errorBySlug } from '../data/jsonErrors';
import { CodeBlock } from '../components/CodeHighlight';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

export function JsonErrorsHub() {
  return (
    <>
      <SEO
        title="Common JSON Errors and How to Fix Them | Error Reference"
        description="A reference of the most common JSON parse errors in JavaScript and Python — what each error message means and exactly how to fix it."
        keywords="json errors, json parse error, json syntax error, fix json error, jsondecodeerror, unexpected token json"
        canonicalUrl="https://jsonformater.com/json-errors"
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Common JSON Errors &amp; Fixes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Pasted a cryptic JSON error into a search engine? Find the exact message below to learn what it means and how to fix it.
          </p>
        </header>

        <AdSlot slotId="json_errors_header" format="horizontal" />

        <div className="space-y-3 mt-8">
          {jsonErrors.map((e) => (
            <Link
              key={e.slug}
              to={`/json-errors/${e.slug}`}
              className="group flex items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all"
            >
              <div className="min-w-0">
                <code className="text-sm md:text-base font-mono text-red-600 dark:text-red-400 break-words">
                  {e.errorMessage}
                </code>
                <div className="mt-1">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                    {e.language}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Tip: paste your JSON into the{' '}
          <Link to="/json-validator" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Validator</Link>{' '}
          to see the exact line and character where it breaks.
        </div>

        <AdSlot slotId="json_errors_footer" />
      </div>
    </>
  );
}

export function JsonErrorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const err = slug ? errorBySlug[slug] : undefined;

  if (!err) return <Navigate to="/json-errors" replace />;

  const others = jsonErrors.filter((e) => e.slug !== err.slug).slice(0, 6);

  return (
    <>
      <SEO
        title={`How to Fix: ${err.errorMessage}`}
        description={err.description}
        canonicalUrl={`https://jsonformater.com/json-errors/${err.slug}`}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/json-errors" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          All JSON errors
        </Link>

        <header className="mb-6">
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
            {err.language}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-2 break-words">
            {err.title}
          </h1>
          <code className="text-sm font-mono text-red-600 dark:text-red-400 break-words">{err.errorMessage}</code>
        </header>

        <AdSlot slotId="error_detail_header" format="horizontal" />

        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">What causes it</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{err.cause}</p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How to fix it</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{err.fix}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400 font-semibold">
                <AlertCircle className="w-4 h-4" /> Causes the error
              </div>
              <CodeBlock code={err.badExample} language="json" minHeight="12rem" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Fixed
              </div>
              <CodeBlock code={err.goodExample} language="json" minHeight="12rem" />
            </div>
          </div>

          <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300">
              Still stuck? Paste your JSON into the{' '}
              <Link to="/json-validator" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">JSON Validator</Link>{' '}
              or{' '}
              <Link to="/json-formatter" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">JSON Formatter</Link>{' '}
              to see the exact line and character where parsing breaks.
            </p>
          </section>
        </div>

        <AdSlot slotId="error_detail_footer" />

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Other common JSON errors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((e) => (
              <Link
                key={e.slug}
                to={`/json-errors/${e.slug}`}
                className="group px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <code className="text-xs font-mono text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 break-words">
                  {e.errorMessage}
                </code>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
