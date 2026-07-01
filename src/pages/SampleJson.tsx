import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, CheckCircle2, Download, Wand2 } from 'lucide-react';
import { sampleDatasets, sampleBySlug } from '../data/sampleData';
import { CodeBlock } from '../components/CodeHighlight';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

export function SampleJsonHub() {
  return (
    <>
      <SEO
        title="Sample JSON Data | Free Example JSON Datasets for Testing"
        description="Free, copy-paste-ready sample JSON datasets for testing and development — users, products, orders, GeoJSON, API responses and more."
        keywords="sample json, sample json data, example json, json test data, dummy json data, json examples, mock json"
        canonicalUrl="https://jsonformater.com/sample-json"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sample JSON Data
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Free, ready-to-use example JSON datasets for testing, prototyping, and learning. Copy, download, or open any sample in the formatter.
          </p>
        </header>

        <AdSlot slotId="sample_json_header" format="horizontal" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {sampleDatasets.map((s) => (
            <Link
              key={s.slug}
              to={`/sample-json/${s.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                  {s.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {s.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{s.description}</p>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                View sample <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <AdSlot slotId="sample_json_footer" />
      </div>
    </>
  );
}

export function SampleJsonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sample = slug ? sampleBySlug[slug] : undefined;
  const [copied, setCopied] = useState(false);

  if (!sample) return <Navigate to="/sample-json" replace />;

  const copy = async () => {
    await navigator.clipboard.writeText(sample.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([sample.json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sample.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const others = sampleDatasets.filter((s) => s.slug !== sample.slug).slice(0, 6);

  return (
    <>
      <SEO
        title={`${sample.title} | Free Example JSON to Copy`}
        description={sample.description}
        canonicalUrl={`https://jsonformater.com/sample-json/${sample.slug}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/sample-json" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          All sample data
        </Link>

        <header className="mb-6">
          <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
            {sample.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-3">{sample.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{sample.description}</p>
        </header>

        <AdSlot slotId="sample_detail_header" format="horizontal" />

        <div className="flex flex-wrap gap-3 mb-4">
          <button onClick={copy} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button onClick={download} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Download .json
          </button>
          <Link to="/json-formatter" state={{ prefill: sample.json }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Wand2 className="w-4 h-4" />
            Open in Formatter
          </Link>
        </div>

        <CodeBlock code={sample.json} language="json" minHeight="24rem" />

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">What is this sample for?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{sample.useCase}</p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
            All processing on this site runs in your browser — open this sample in the{' '}
            <Link to="/json-formatter" state={{ prefill: sample.json }} className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</Link>,{' '}
            <Link to="/json-viewer" state={{ prefill: sample.json }} className="text-blue-600 dark:text-blue-400 hover:underline">Viewer</Link>, or any converter to experiment freely.
          </p>
        </div>

        <AdSlot slotId="sample_detail_footer" />

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">More sample datasets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/sample-json/${s.slug}`}
                className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {s.title.replace('Sample JSON: ', '').replace('Sample GeoJSON: ', 'GeoJSON: ')}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
