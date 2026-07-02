import { CodeGenTool } from '../../components/CodeGenTool';
import { generateKotlinClasses } from '../../utils/generators';
import { SEO } from '../../components/SEO';
import { ToolContent } from '../../components/ToolContent';
import { AdSlot } from '../../components/AdSlot';

export function JsonToKotlin() {
  return (
    <>
      <SEO
        title="JSON to Kotlin Data Class Converter | Free Online Tool"
        description="Convert JSON to Kotlin data classes instantly. Free online JSON to Kotlin generator with correct types and nested classes. Runs entirely in your browser."
        keywords="json to kotlin, json to kotlin data class, generate kotlin classes, kotlin data class generator, json kotlin converter"
        canonicalUrl="https://jsonformater.com/json-to-kotlin"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to Kotlin Data Class Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into Kotlin data classes with correct types and nested classes for objects and arrays.
          </p>
        </header>

        <AdSlot slotId="json_to_kotlin_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <CodeGenTool
            language="kotlin"
            generate={generateKotlinClasses}
            outputLabel="Kotlin Data Classes"
            buttonLabel="Generate Kotlin Classes"
            rootLabel="Root Class Name"
            fileExtension="kt"
            example={'{"id": 1, "name": "Ada", "active": true, "tags": ["admin"], "address": {"city": "London"}}'}
          />
        </div>

        <AdSlot slotId="json_to_kotlin_footer" />

        <ToolContent slug="json-to-kotlin" />
      </div>
    </>
  );
}
