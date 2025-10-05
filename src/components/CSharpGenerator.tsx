import { useState } from 'react';
import { Copy, CheckCircle2, Wand2 } from 'lucide-react';
import { processJson } from '../services/api';
import type { GenerateResponse } from '../types';
import { getExampleJsonString } from '../utils/examples';

export function CSharpGenerator() {
  const [jsonInput, setJsonInput] = useState('');
  const [className, setClassName] = useState('RootObject');
  const [namespace, setNamespace] = useState('Models');
  const [csharpCode, setCsharpCode] = useState('');
  const [stats, setStats] = useState<GenerateResponse['stats'] | null>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setError('');

    if (!jsonInput.trim()) {
      setError('Please enter JSON data to generate classes');
      return;
    }

    if (!className.trim()) {
      setError('Please enter a class name');
      return;
    }

    if (!namespace.trim()) {
      setError('Please enter a namespace');
      return;
    }

    try {
      JSON.parse(jsonInput);
    } catch {
      setError('Invalid JSON syntax. Please check your input.');
      return;
    }

    setLoading(true);
    try {
      const response = await processJson({
        action: 'generate',
        jsonData: jsonInput,
        className: className.trim(),
        namespace: namespace.trim(),
      }) as GenerateResponse;

      setCsharpCode(response.csharpCode);
      setClasses(response.classes);
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate C# classes');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(csharpCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const loadExample = () => {
    setJsonInput(getExampleJsonString());
    setCsharpCode('');
    setStats(null);
    setClasses([]);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON Input
          </label>
          <button
            onClick={loadExample}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            Load Example
          </button>
        </div>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter your JSON here, e.g., {"name": "John", "age": 30}'
          className="w-full h-64 px-4 py-3 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Class Name
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="RootObject"
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Namespace
          </label>
          <input
            type="text"
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
            placeholder="Models"
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : 'Generate C# Classes'}
      </button>

      {stats && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Statistics</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Classes Generated</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{stats.classCount}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Lines of Code</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{stats.lineCount}</p>
              </div>
            </div>
            {classes.length > 0 && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Generated Classes:</p>
                <div className="flex flex-wrap gap-2">
                  {classes.map((cls, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {csharpCode && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generated C# Code</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <pre className="w-full h-[600px] px-4 py-3 font-mono text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto text-gray-900 dark:text-gray-100">
            {csharpCode}
          </pre>
        </div>
      )}
    </div>
  );
}
