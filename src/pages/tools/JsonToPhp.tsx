import { CodeGenTool } from '../../components/CodeGenTool';
import { generatePhpClasses } from '../../utils/generators';
import { SEO } from '../../components/SEO';
import { ToolContent } from '../../components/ToolContent';
import { AdSlot } from '../../components/AdSlot';

export function JsonToPhp() {
  return (
    <>
      <SEO
        title="JSON to PHP Class Converter | Free Online JSON to PHP Tool"
        description="Convert JSON to PHP classes instantly. Free online JSON to PHP class generator with typed properties and nested classes. Runs entirely in your browser."
        keywords="json to php, json to php class, generate php classes, php class generator, json php converter"
        canonicalUrl="https://jsonformater.com/json-to-php"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to PHP Class Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into PHP classes with typed properties and nested classes for objects and arrays.
          </p>
        </header>

        <AdSlot slotId="json_to_php_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <CodeGenTool
            language="php"
            generate={generatePhpClasses}
            outputLabel="PHP Classes"
            buttonLabel="Generate PHP Classes"
            rootLabel="Root Class Name"
            fileExtension="php"
            example={'{"id": 1, "name": "Ada", "active": true, "tags": ["admin"], "address": {"city": "London"}}'}
          />
        </div>

        <AdSlot slotId="json_to_php_footer" />

        <ToolContent slug="json-to-php" />
      </div>
    </>
  );
}
