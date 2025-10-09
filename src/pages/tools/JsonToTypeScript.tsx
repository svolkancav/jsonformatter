import { useState } from 'react';
import { Code2, Copy, Download, CheckCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { generateTypeScriptInterfaces } from '../../utils/generators';

export function JsonToTypeScript() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [interfaceName, setInterfaceName] = useState('Root');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const result = generateTypeScriptInterfaces(input, interfaceName);
      setOutput(result);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${interfaceName}.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="JSON to TypeScript Converter - Generate TypeScript Interfaces"
        description="Convert JSON to TypeScript interfaces instantly. Free online JSON to TypeScript converter with proper types and nested interface support."
        keywords="json to typescript, json to ts, generate typescript interfaces, typescript converter"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to TypeScript Interface Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Convert JSON data to TypeScript interfaces instantly. Generate type-safe code with proper types and nested interfaces.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-12">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Root Interface Name
            </label>
            <input
              type="text"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Root"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                JSON Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-96 px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                placeholder='{"name": "John", "age": 30}'
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  TypeScript Output
                </label>
                {output && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>
              <textarea
                value={output}
                readOnly
                className="w-full h-96 px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                placeholder="TypeScript interfaces will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleConvert}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              Generate TypeScript Interfaces
            </button>
            <button
              onClick={() => {
                setInput('');
                setOutput('');
                setError('');
                setInterfaceName('Root');
              }}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How to Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This tool converts JSON data into TypeScript interfaces, making it easy to add type safety to your TypeScript projects.
              Simply paste your JSON, set the interface name, and generate production-ready TypeScript code.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The generator handles nested objects, arrays, and complex data structures automatically, creating separate interfaces
              for each nested object type.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
