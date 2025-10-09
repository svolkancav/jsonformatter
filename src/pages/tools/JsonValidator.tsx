import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function JsonValidator() {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);

  const handleValidate = () => {
    if (!input.trim()) {
      setError('Please enter JSON data to validate');
      setIsValid(null);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setIsValid(true);
      setError('');

      const jsonString = JSON.stringify(parsed);
      setStats({
        size: new Blob([jsonString]).size,
        lines: input.split('\n').length,
        type: Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' ? 'Object' : typeof parsed
      });
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
      setStats(null);
    }
  };

  return (
    <>
      <SEO
        title="JSON Validator - Validate JSON Online Free"
        description="Free online JSON validator. Check if your JSON is valid, find syntax errors, and get detailed error messages."
        keywords="json validator, validate json, json checker, json syntax checker"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON Validator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Validate your JSON data instantly. Check for syntax errors and ensure your JSON is properly formatted.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-12">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              JSON Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-96 px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              placeholder='Enter your JSON here...'
            />
          </div>

          <button
            onClick={handleValidate}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Validate JSON
          </button>

          {isValid !== null && (
            <div className={`mt-6 p-6 rounded-lg border-2 ${
              isValid
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                : 'bg-red-50 dark:bg-red-900/20 border-red-500'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {isValid ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="text-xl font-bold text-green-900 dark:text-green-100">Valid JSON</h3>
                      <p className="text-green-700 dark:text-green-300">Your JSON is properly formatted</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    <div>
                      <h3 className="text-xl font-bold text-red-900 dark:text-red-100">Invalid JSON</h3>
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </>
                )}
              </div>

              {stats && (
                <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Statistics:</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-green-600 dark:text-green-400">Type</p>
                      <p className="font-semibold text-green-900 dark:text-green-100">{stats.type}</p>
                    </div>
                    <div>
                      <p className="text-green-600 dark:text-green-400">Size</p>
                      <p className="font-semibold text-green-900 dark:text-green-100">{stats.size} bytes</p>
                    </div>
                    <div>
                      <p className="text-green-600 dark:text-green-400">Lines</p>
                      <p className="font-semibold text-green-900 dark:text-green-100">{stats.lines}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Validate JSON?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              JSON validation is crucial when working with APIs, configuration files, or data exchange between systems.
              Even a small syntax error can cause your application to fail. Our validator helps you catch these errors early.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Common Errors:</strong>
                  <p className="text-gray-600 dark:text-gray-400">Trailing commas, single quotes, unquoted keys, missing brackets</p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
