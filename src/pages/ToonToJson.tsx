import { ToonToJsonConverter } from '../components/ToonToJsonConverter';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

export function ToonToJsonPage() {
  return (
    <>
      <SEO
        title="TOON to JSON Converter | Convert TOON Format to JSON Online"
        description="Free online TOON to JSON converter. Convert TOON (Token-Oriented Object Notation) format to JSON instantly. Perfect for converting LLM-optimized data back to JSON."
        keywords="toon to json, toon json converter, convert toon to json, toon converter, json converter, token optimization, llm format"
        canonicalUrl="https://jsonformater.com/toon-to-json"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TOON to JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert TOON format to JSON instantly. Perfect for converting LLM-optimized TOON data back to standard JSON format.
          </p>
        </header>

        <AdSlot slotId="toon_to_json_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <ToonToJsonConverter />
        </div>

        <AdSlot slotId="toon_to_json_footer" />

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is TOON?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p>
              TOON (Token-Oriented Object Notation) is a compact, human-readable serialization format designed to efficiently pass structured data to Large Language Models (LLMs) by reducing token usage.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Key Benefits:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Token Efficiency:</strong> Uses 30-60% fewer tokens than JSON, reducing LLM API costs</li>
              <li><strong>LLM-Friendly:</strong> Explicit lengths and fields improve validation and accuracy</li>
              <li><strong>Minimalist Syntax:</strong> Removes unnecessary punctuation (braces, brackets, most quotes)</li>
              <li><strong>Indentation-Based:</strong> Uses whitespace for nested objects, similar to YAML</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Example Conversion:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">TOON:</p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`}
                </pre>
              </div>
              <div>
                <p className="font-semibold mb-2">JSON:</p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

