import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { jsonPathQuery } from '../utils/dataConverters';
import { CodeEditor, CodeBlock } from '../components/CodeHighlight';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

const EXAMPLE_JSON = `{
  "store": {
    "books": [
      { "title": "JSON Basics", "price": 12 },
      { "title": "Advanced JSON", "price": 30 }
    ]
  }
}`;

export function JsonPathTesterPage() {
  const [json, setJson] = useState('');
  const [path, setPath] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const run = () => {
    setError('');
    if (!json.trim()) {
      setError('Please paste some JSON.');
      setResult('');
      return;
    }
    try {
      setResult(jsonPathQuery(json, path));
    } catch (e) {
      setResult('');
      setError(e instanceof Error ? e.message : 'Query failed.');
    }
  };

  const tryExample = () => {
    setJson(EXAMPLE_JSON);
    setPath('$.store.books[*].title');
    setError('');
    try {
      setResult(jsonPathQuery(EXAMPLE_JSON, '$.store.books[*].title'));
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <SEO
        title="JSONPath Tester & Evaluator | Free Online JSONPath Tool"
        description="Free online JSONPath tester. Evaluate a JSONPath expression against your JSON and see the matches instantly. Runs entirely in your browser."
        keywords="jsonpath tester, jsonpath evaluator, jsonpath online, test jsonpath, jsonpath query, json path"
        canonicalUrl="https://jsonformater.com/jsonpath-tester"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSONPath Tester
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Evaluate a JSONPath expression against your JSON and see the matching values instantly.
          </p>
        </header>

        <AdSlot slotId="jsonpath_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">JSONPath Expression</label>
            <button
              onClick={tryExample}
              className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded text-blue-700 dark:text-blue-300 transition-colors"
            >
              Try Example
            </button>
          </div>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="$.store.books[*].title"
            className="w-full px-4 py-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON</label>
          <CodeEditor value={json} onChange={setJson} language="json" placeholder={EXAMPLE_JSON} minHeight="22rem" />

          <button
            onClick={run}
            disabled={!json.trim()}
            className="mt-6 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Evaluate JSONPath
          </button>

          {error && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matches</label>
              <CodeBlock code={result} language="json" minHeight="16rem" />
            </div>
          )}
        </div>

        <AdSlot slotId="jsonpath_footer" />

        <ToolContent slug="jsonpath-tester" />
      </div>
    </>
  );
}
