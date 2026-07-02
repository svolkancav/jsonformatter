import { TextConverter } from '../components/TextConverter';
import { generateJsonSchema } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function JsonSchemaGeneratorPage() {
  return (
    <>
      <SEO
        title="JSON Schema Generator | Generate JSON Schema from JSON Online"
        description="Free online JSON Schema generator. Paste a JSON sample and instantly generate a draft-07 JSON Schema with types and required fields. Runs in your browser."
        keywords="json schema generator, generate json schema, json to json schema, json schema from json, draft-07 schema"
        canonicalUrl="https://jsonformater.com/json-schema-generator"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON Schema Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Paste a JSON sample and instantly generate a draft-07 JSON Schema with inferred types and required fields.
          </p>
        </header>

        <AdSlot slotId="json_schema_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="JSON Input"
            outputLabel="JSON Schema"
            placeholder='{"id": 1, "name": "Ada", "tags": ["admin"]}'
            convertLabel="Generate JSON Schema"
            downloadName="schema.json"
            inputLanguage="json"
            outputLanguage="json"
            example={'{"id": 1, "name": "Ada", "active": true, "tags": ["admin"], "address": {"city": "London"}}'}
            convert={generateJsonSchema}
          />
        </div>

        <AdSlot slotId="json_schema_footer" />

        <ToolContent slug="json-schema-generator" />
      </div>
    </>
  );
}
