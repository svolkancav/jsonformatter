import { useState } from 'react';
import { Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import { generateUuids } from '../utils/devTools';
import { CodeBlock } from '../components/CodeHighlight';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function UuidGeneratorPage() {
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState(() => generateUuids(5));
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setOutput(generateUuids(count));
    setCopied(false);
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <SEO
        title="UUID Generator | Free Online UUID v4 Generator"
        description="Free online UUID generator. Instantly generate one or many random UUID (v4) values. Cryptographically random, runs entirely in your browser."
        keywords="uuid generator, guid generator, uuid v4, generate uuid, random uuid, online uuid, unique id generator"
        canonicalUrl="https://jsonformater.com/uuid-generator"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            UUID Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Generate cryptographically random UUID (v4) values instantly — one or thousands at a time.
          </p>
        </header>

        <AdSlot slotId="uuid_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How many?
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
                className="w-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={generate}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate
            </button>
            <button
              onClick={copy}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy all'}
            </button>
          </div>

          <CodeBlock code={output} language="text" minHeight="24rem" />
        </div>

        <AdSlot slotId="uuid_footer" />

        <ToolContent slug="uuid-generator" />
      </div>
    </>
  );
}
