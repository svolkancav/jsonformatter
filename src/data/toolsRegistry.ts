// Central registry of tools, used to render "Related tools" cross-links for
// internal linking (SEO) and discovery. Path is derived as `/${slug}`.

export type ToolFamily = 'format' | 'convert' | 'codegen' | 'util';

export interface ToolInfo {
  slug: string;
  label: string;
  family: ToolFamily;
}

export const TOOLS: ToolInfo[] = [
  // Format / inspect
  { slug: 'json-formatter', label: 'JSON Formatter', family: 'format' },
  { slug: 'json-viewer', label: 'JSON Viewer', family: 'format' },
  { slug: 'json-blob-viewer', label: 'JSON Blob Viewer', family: 'format' },
  { slug: 'json-validator', label: 'JSON Validator', family: 'format' },
  { slug: 'json-diff', label: 'JSON Diff', family: 'format' },
  // Convert
  { slug: 'json-to-csv', label: 'JSON to CSV', family: 'convert' },
  { slug: 'csv-to-json', label: 'CSV to JSON', family: 'convert' },
  { slug: 'json-to-yaml', label: 'JSON to YAML', family: 'convert' },
  { slug: 'yaml-to-json', label: 'YAML to JSON', family: 'convert' },
  { slug: 'json-to-xml', label: 'JSON to XML', family: 'convert' },
  { slug: 'xml-to-json', label: 'XML to JSON', family: 'convert' },
  { slug: 'json-to-excel', label: 'JSON to Excel', family: 'convert' },
  { slug: 'excel-to-json', label: 'Excel to JSON', family: 'convert' },
  { slug: 'excel-to-csv', label: 'Excel to CSV', family: 'convert' },
  { slug: 'excel-to-xml', label: 'Excel to XML', family: 'convert' },
  { slug: 'json-to-toml', label: 'JSON to TOML', family: 'convert' },
  { slug: 'toml-to-json', label: 'TOML to JSON', family: 'convert' },
  { slug: 'json-to-toon', label: 'JSON to TOON', family: 'convert' },
  { slug: 'toon-to-json', label: 'TOON to JSON', family: 'convert' },
  // Code generators
  { slug: 'json-to-csharp', label: 'JSON to C#', family: 'codegen' },
  { slug: 'json-to-typescript', label: 'JSON to TypeScript', family: 'codegen' },
  { slug: 'json-to-go', label: 'JSON to Go', family: 'codegen' },
  { slug: 'json-to-python', label: 'JSON to Python', family: 'codegen' },
  { slug: 'json-to-java', label: 'JSON to Java', family: 'codegen' },
  // Utilities
  { slug: 'base64', label: 'Base64 Encode/Decode', family: 'util' },
  { slug: 'uuid-generator', label: 'UUID Generator', family: 'util' },
  { slug: 'timestamp-converter', label: 'Timestamp Converter', family: 'util' },
  { slug: 'jwt-decoder', label: 'JWT Decoder', family: 'util' },
  { slug: 'character-counter', label: 'Character Counter', family: 'util' },
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
