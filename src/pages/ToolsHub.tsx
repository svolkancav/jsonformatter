import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import { TOOLS, FAMILY_LABELS, type ToolFamily } from '../data/toolsRegistry';

const ORDER: ToolFamily[] = ['format', 'convert', 'codegen', 'util'];

export function ToolsHub() {
  return (
    <>
      <SEO
        title="All JSON Tools | Free Online JSON Formatter, Converters & Utilities"
        description="Browse every free online JSON tool in one place: formatter, viewer, validator, diff, converters (CSV, YAML, XML, Excel, TOML, TOON), code generators, and developer utilities."
        keywords="json tools, online json tools, free json tools, json formatter, json converter, json utilities, developer tools"
        canonicalUrl="https://jsonformater.com/tools"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All JSON Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Every tool in one place — formatting, conversion, code generation, and handy developer utilities. All free and 100% in your browser.
          </p>
        </header>

        <AdSlot slotId="tools_hub_header" format="horizontal" />

        <div className="space-y-12 mt-8">
          {ORDER.map((family) => {
            const tools = TOOLS.filter((t) => t.family === family);
            const meta = FAMILY_LABELS[family];
            return (
              <section key={family}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{meta.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{meta.blurb}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      to={`/${tool.slug}`}
                      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tool.label}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <AdSlot slotId="tools_hub_footer" />
      </div>
    </>
  );
}
