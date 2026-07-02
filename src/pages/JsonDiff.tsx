import { useState } from 'react';
import { GitCompare, AlertCircle } from 'lucide-react';
import { jsonDiff } from '../utils/devTools';
import { CodeEditor, CodeBlock } from '../components/CodeHighlight';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function JsonDiffPage() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const tryExample = () => {
    const a = '{"name": "Ada", "age": 36, "roles": ["admin"]}';
    const b = '{"name": "Ada", "age": 37, "roles": ["admin", "editor"]}';
    setLeft(a);
    setRight(b);
    setError('');
    setResult(jsonDiff(a, b));
  };

  const compare = () => {
    setError('');
    if (!left.trim() || !right.trim()) {
      setError('Please paste JSON in both boxes to compare.');
      setResult('');
      return;
    }
    try {
      setResult(jsonDiff(left, right));
    } catch (e) {
      setResult('');
      setError(e instanceof Error ? e.message : 'Comparison failed.');
    }
  };

  return (
    <>
      <SEO
        title="JSON Diff | Free Online JSON Compare Tool"
        description="Free online JSON diff tool. Compare two JSON documents and see exactly what was added, removed, or changed. Runs entirely in your browser."
        keywords="json diff, json compare, compare json, json difference, diff json online, json comparison tool"
        canonicalUrl="https://jsonformater.com/json-diff"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON Diff &amp; Compare
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare two JSON documents and see exactly what was added, removed, or changed — down to each key path.
          </p>
        </header>

        <AdSlot slotId="json_diff_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="flex justify-end mb-3">
            <button
              onClick={tryExample}
              className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded text-blue-700 dark:text-blue-300 transition-colors"
            >
              Try Example
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original (left)
              </label>
              <CodeEditor value={left} onChange={setLeft} language="json" placeholder='{"name": "Ada", "age": 36}' minHeight="20rem" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Changed (right)
              </label>
              <CodeEditor value={right} onChange={setRight} language="json" placeholder='{"name": "Ada", "age": 37}' minHeight="20rem" />
            </div>
          </div>

          <button
            onClick={compare}
            disabled={!left.trim() || !right.trim()}
            className="mt-6 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <GitCompare className="w-5 h-5" />
            Compare JSON
          </button>

          {error && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Differences
              </label>
              <CodeBlock code={result} language="text" minHeight="20rem" />
            </div>
          )}
        </div>

        <AdSlot slotId="json_diff_footer" />

        <ToolContent slug="json-diff" />
      </div>
    </>
  );
}
