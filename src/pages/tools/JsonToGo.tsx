import { CodeGenTool } from '../../components/CodeGenTool';
import { generateGoStructs } from '../../utils/generators';
import { SEO } from '../../components/SEO';
import { ToolContent } from '../../components/ToolContent';
import { AdSlot } from '../../components/AdSlot';

export function JsonToGo() {
  return (
    <>
      <SEO
        title="JSON to Go Struct Converter | Free Online JSON to Go Tool"
        description="Convert JSON to Go structs instantly. Free online JSON to Go struct generator with correct types and json tags. Runs entirely in your browser."
        keywords="json to go, json to go struct, json to golang, generate go structs, go struct generator, json struct tags"
        canonicalUrl="https://jsonformater.com/json-to-go"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to Go Struct Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into Go structs instantly, with correct types and json tags for nested objects and arrays.
          </p>
        </header>

        <AdSlot slotId="json_to_go_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <CodeGenTool
            language="go"
            generate={generateGoStructs}
            outputLabel="Go Structs"
            buttonLabel="Generate Go Structs"
            rootLabel="Root Struct Name"
            fileExtension="go"
          />
        </div>

        <AdSlot slotId="json_to_go_footer" />

        <ToolContent slug="json-to-go" />
      </div>
    </>
  );
}
