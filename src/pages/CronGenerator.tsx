import { useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { explainCron, CRON_PRESETS, CRON_FIELDS, type CronResult } from '../utils/cron';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

const DEFAULT = '*/15 9-17 * * 1-5';

function safeExplain(expr: string): { result: CronResult | null; error: string } {
  try {
    return { result: explainCron(expr), error: '' };
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid cron expression.' };
  }
}

export function CronGeneratorPage() {
  const [expr, setExpr] = useState(DEFAULT);
  const initial = safeExplain(DEFAULT);
  const [result, setResult] = useState<CronResult | null>(initial.result);
  const [error, setError] = useState(initial.error);

  const update = (value: string) => {
    setExpr(value);
    const { result: r, error: e } = safeExplain(value);
    setResult(r);
    setError(e);
  };

  return (
    <>
      <SEO
        title="Cron Expression Generator & Explainer | Free Online Crontab Tool"
        description="Free online cron expression generator and explainer. Describe any crontab expression in plain English, see the next run times, and use ready-made presets."
        keywords="cron expression generator, cron generator, crontab generator, cron expression explained, cron parser, crontab guru, cron schedule"
        canonicalUrl="https://jsonformater.com/cron-expression-generator"
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cron Expression Generator &amp; Explainer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Type or build a cron expression and instantly see it explained in plain English, with the next run times.
          </p>
        </header>

        <AdSlot slotId="cron_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cron Expression
          </label>
          <input
            type="text"
            value={expr}
            onChange={(e) => update(e.target.value)}
            placeholder="*/5 * * * *"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-lg"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {CRON_PRESETS.map((p) => (
              <button
                key={p.expr}
                onClick={() => update(p.expr)}
                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded text-gray-700 dark:text-gray-300 transition-colors"
                title={p.expr}
              >
                {p.label}
              </button>
            ))}
          </div>

          {error ? (
            <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          ) : (
            result && (
              <div className="mt-6 space-y-6">
                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-1">
                    <Clock className="w-4 h-4" /> This runs
                  </div>
                  <p className="text-xl font-medium text-gray-900 dark:text-white">{result.description}</p>
                </div>

                {result.nextRuns.length > 0 && (
                  <div>
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Next 5 runs (UTC)</h2>
                    <ul className="space-y-1">
                      {result.nextRuns.map((r, i) => (
                        <li key={i} className="font-mono text-sm text-gray-600 dark:text-gray-400">{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Field reference */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The 5 Cron Fields</h2>
          <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 overflow-x-auto mb-4 border border-gray-200 dark:border-gray-700">{`* * * * *
| | | | |
| | | | +-- day of week (0-6)
| | | +---- month (1-12)
| | +------ day of month (1-31)
| +-------- hour (0-23)
+---------- minute (0-59)`}</pre>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4">Field</th>
                  <th className="py-2 pr-4">Values</th>
                  <th className="py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {CRON_FIELDS.map((f) => (
                  <tr key={f.field} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                    <td className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">{f.field}</td>
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">{f.values}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{f.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdSlot slotId="cron_footer" />

        <ToolContent slug="cron-expression-generator" />
      </div>
    </>
  );
}
