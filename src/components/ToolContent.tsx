import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { toolContent, type ToolContentData } from '../data/toolContent';

interface ToolContentProps {
  slug: string;
}

/**
 * Renders the long-form, unique editorial content shown beneath each tool.
 * Content lives in src/data/toolContent.ts (one entry per slug) so every page
 * gets substantial, non-duplicated text — important for SEO and AdSense.
 */
export function ToolContent({ slug }: ToolContentProps) {
  const data: ToolContentData | undefined = toolContent[slug];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!data) return null;

  return (
    <div className="mt-16 space-y-12">
      {/* Overview */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {data.intro.heading}
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          {data.intro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {data.steps.heading}
        </h2>
        <ol className="space-y-4">
          {data.steps.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-gray-600 dark:text-gray-400 leading-relaxed pt-1">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Example */}
      {data.example && (
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {data.example.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {data.example.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                {data.example.inputLabel ?? 'Input'}
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-gray-700">
                <code>{data.example.input}</code>
              </pre>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                {data.example.outputLabel ?? 'Output'}
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-gray-700">
                <code>{data.example.output}</code>
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Tips / common mistakes */}
      {data.tips && (
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {data.tips.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.tips.items.map((tip, i) => (
              <div key={i} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {data.faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ToolContent;
