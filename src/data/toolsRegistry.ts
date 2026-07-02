// Central registry of tools, used to render "Related tools" cross-links and the
// /tools directory hub. Path is derived as `/${slug}`.

export type ToolFamily = 'format' | 'convert' | 'codegen' | 'util';

export interface ToolInfo {
  slug: string;
  label: string;
  family: ToolFamily;
  desc: string;
}

export const FAMILY_LABELS: Record<ToolFamily, { title: string; blurb: string }> = {
  format: { title: 'Format & Inspect', blurb: 'Format, validate, view, and compare JSON.' },
  convert: { title: 'Converters', blurb: 'Convert JSON to and from CSV, YAML, XML, Excel, TOML, and TOON.' },
  codegen: { title: 'Code Generators', blurb: 'Turn JSON into typed classes and structs for your language.' },
  util: { title: 'Developer Utilities', blurb: 'Handy everyday tools for developers.' },
};

export const TOOLS: ToolInfo[] = [
  // Format / inspect
  { slug: 'json-formatter', label: 'JSON Formatter', family: 'format', desc: 'Format, beautify, and validate JSON.' },
  { slug: 'json-viewer', label: 'JSON Viewer', family: 'format', desc: 'Explore JSON as a collapsible tree.' },
  { slug: 'json-blob-viewer', label: 'JSON Blob Viewer', family: 'format', desc: 'Read large or minified JSON blobs.' },
  { slug: 'json-validator', label: 'JSON Validator', family: 'format', desc: 'Check JSON and pinpoint syntax errors.' },
  { slug: 'json-diff', label: 'JSON Diff', family: 'format', desc: 'Compare two JSON documents.' },
  { slug: 'json-schema-generator', label: 'JSON Schema Generator', family: 'format', desc: 'Generate a JSON Schema from JSON.' },
  { slug: 'jsonpath-tester', label: 'JSONPath Tester', family: 'format', desc: 'Evaluate JSONPath expressions.' },
  // Convert
  { slug: 'json-to-csv', label: 'JSON to CSV', family: 'convert', desc: 'Turn a JSON array into CSV.' },
  { slug: 'csv-to-json', label: 'CSV to JSON', family: 'convert', desc: 'Turn CSV rows into JSON objects.' },
  { slug: 'json-to-yaml', label: 'JSON to YAML', family: 'convert', desc: 'Convert JSON to readable YAML.' },
  { slug: 'yaml-to-json', label: 'YAML to JSON', family: 'convert', desc: 'Convert YAML config to JSON.' },
  { slug: 'json-to-xml', label: 'JSON to XML', family: 'convert', desc: 'Convert JSON to well-formed XML.' },
  { slug: 'xml-to-json', label: 'XML to JSON', family: 'convert', desc: 'Convert XML documents to JSON.' },
  { slug: 'json-to-excel', label: 'JSON to Excel', family: 'convert', desc: 'Export JSON to an .xlsx spreadsheet.' },
  { slug: 'excel-to-json', label: 'Excel to JSON', family: 'convert', desc: 'Convert spreadsheets to JSON.' },
  { slug: 'excel-to-csv', label: 'Excel to CSV', family: 'convert', desc: 'Convert Excel files to CSV.' },
  { slug: 'excel-to-xml', label: 'Excel to XML', family: 'convert', desc: 'Convert Excel files to XML.' },
  { slug: 'json-to-toml', label: 'JSON to TOML', family: 'convert', desc: 'Convert JSON to TOML config.' },
  { slug: 'toml-to-json', label: 'TOML to JSON', family: 'convert', desc: 'Convert TOML config to JSON.' },
  { slug: 'json-to-toon', label: 'JSON to TOON', family: 'convert', desc: 'Compact JSON for LLM prompts.' },
  { slug: 'toon-to-json', label: 'TOON to JSON', family: 'convert', desc: 'Expand TOON back into JSON.' },
  // Code generators
  { slug: 'json-to-csharp', label: 'JSON to C#', family: 'codegen', desc: 'Generate C# classes from JSON.' },
  { slug: 'json-to-typescript', label: 'JSON to TypeScript', family: 'codegen', desc: 'Generate TypeScript interfaces.' },
  { slug: 'json-to-go', label: 'JSON to Go', family: 'codegen', desc: 'Generate Go structs with json tags.' },
  { slug: 'json-to-python', label: 'JSON to Python', family: 'codegen', desc: 'Generate Python classes from JSON.' },
  { slug: 'json-to-java', label: 'JSON to Java', family: 'codegen', desc: 'Generate Java classes (POJOs).' },
  // Utilities
  { slug: 'base64', label: 'Base64 Encode/Decode', family: 'util', desc: 'Encode and decode Base64.' },
  { slug: 'uuid-generator', label: 'UUID Generator', family: 'util', desc: 'Generate random UUID v4 values.' },
  { slug: 'timestamp-converter', label: 'Timestamp Converter', family: 'util', desc: 'Unix epoch ↔ human date.' },
  { slug: 'jwt-decoder', label: 'JWT Decoder', family: 'util', desc: 'Decode a JWT header and payload.' },
  { slug: 'character-counter', label: 'Character Counter', family: 'util', desc: 'Count characters, words, and lines.' },
];

const BY_SLUG = new Map(TOOLS.map((t) => [t.slug, t]));

// A couple of high-traffic anchors used to pad when a family is small.
const ANCHORS = ['json-formatter', 'json-to-csv', 'json-diff'];

/** Returns up to `limit` related tools: same family first, then popular anchors. */
export function getRelatedTools(slug: string, limit = 6): ToolInfo[] {
  const current = BY_SLUG.get(slug);
  const picked: ToolInfo[] = [];
  const seen = new Set<string>([slug]);

  const add = (t?: ToolInfo) => {
    if (t && !seen.has(t.slug) && picked.length < limit) {
      seen.add(t.slug);
      picked.push(t);
    }
  };

  if (current) {
    for (const t of TOOLS) if (t.family === current.family) add(t);
  }
  for (const a of ANCHORS) add(BY_SLUG.get(a));
  for (const t of TOOLS) add(t); // final fallback to fill remaining slots

  return picked.slice(0, limit);
}
