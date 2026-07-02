import { CodeGenTool } from '../../components/CodeGenTool';
import { generateRustStructs } from '../../utils/generators';
import { SEO } from '../../components/SEO';
import { ToolContent } from '../../components/ToolContent';
import { AdSlot } from '../../components/AdSlot';

export function JsonToRust() {
  return (
    <>
      <SEO
        title="JSON to Rust Struct Converter | Free Online JSON to Rust Tool"
        description="Convert JSON to Rust structs instantly. Free online JSON to Rust struct generator with serde derives and correct types. Runs entirely in your browser."
        keywords="json to rust, json to rust struct, rust serde struct, generate rust structs, json rust converter"
        canonicalUrl="https://jsonformater.com/json-to-rust"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to Rust Struct Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into Rust structs with serde derives, correct types, and nested structs for objects and arrays.
          </p>
        </header>

        <AdSlot slotId="json_to_rust_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <CodeGenTool
            language="rust"
            generate={generateRustStructs}
            outputLabel="Rust Structs"
            buttonLabel="Generate Rust Structs"
            rootLabel="Root Struct Name"
            fileExtension="rs"
            example={'{"id": 1, "name": "Ada", "active": true, "tags": ["admin"], "address": {"city": "London"}}'}
          />
        </div>

        <AdSlot slotId="json_to_rust_footer" />

        <ToolContent slug="json-to-rust" />
      </div>
    </>
  );
}
