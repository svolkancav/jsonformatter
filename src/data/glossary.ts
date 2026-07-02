export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
}

// Glossary of JSON / data-format terms. Rendered as one reference page.
export const glossaryTerms: GlossaryTerm[] = [
  { term: 'JSON', slug: 'json', definition: 'JavaScript Object Notation — a lightweight, text-based format for representing structured data as key/value pairs and arrays. The de facto standard for web APIs and configuration.' },
  { term: 'Object', slug: 'object', definition: 'An unordered collection of key/value pairs wrapped in curly braces { }. Keys must be double-quoted strings; values can be any JSON type.' },
  { term: 'Array', slug: 'array', definition: 'An ordered list of values wrapped in square brackets [ ]. Elements can be of mixed types, though uniform arrays are more common.' },
  { term: 'Key / Property', slug: 'key', definition: 'The name in a key/value pair. In JSON, keys must always be double-quoted strings, even for simple names like "id".' },
  { term: 'Value', slug: 'value', definition: 'The data associated with a key, or an element of an array. A JSON value is a string, number, boolean, null, object, or array.' },
  { term: 'Serialization', slug: 'serialization', definition: 'Converting an in-memory data structure (an object) into a string of JSON text so it can be stored or transmitted. The reverse is deserialization (parsing).' },
  { term: 'Parsing', slug: 'parsing', definition: 'Reading a JSON string and turning it into a native data structure your program can use, e.g. JSON.parse() in JavaScript or json.loads() in Python.' },
  { term: 'Minify', slug: 'minify', definition: 'Removing all non-essential whitespace (indentation and line breaks) from JSON to reduce its size for transmission or storage.' },
  { term: 'Beautify / Pretty-print', slug: 'beautify', definition: 'Adding consistent indentation and line breaks to JSON so it is easy for humans to read — the opposite of minifying.' },
  { term: 'JSON Schema', slug: 'json-schema', definition: 'A JSON-based vocabulary for describing and validating the structure of JSON data — which fields exist, their types, and which are required.' },
  { term: 'JSONPath', slug: 'jsonpath', definition: 'A query language for JSON, similar to XPath for XML, used to select and extract values from a document with a compact expression like $.store.books[*].title.' },
  { term: 'JWT', slug: 'jwt', definition: 'JSON Web Token — a compact, URL-safe token with a base64url-encoded JSON header and payload plus a signature, used for authentication and authorization.' },
  { term: 'NDJSON / JSONL', slug: 'ndjson', definition: 'Newline-Delimited JSON — one complete JSON value per line, with no enclosing array. Ideal for streaming and processing large datasets record by record.' },
  { term: 'TOON', slug: 'toon', definition: 'Token-Oriented Object Notation — a compact serialization of JSON designed to use fewer tokens in large language model prompts, reducing cost and context usage.' },
  { term: 'YAML', slug: 'yaml', definition: 'A human-friendly, indentation-based data format often used for configuration (Kubernetes, CI, Docker Compose). Interconvertible with JSON.' },
  { term: 'TOML', slug: 'toml', definition: 'A minimal configuration format with clear sections, used by tools like Rust’s Cargo and Python’s pyproject.toml. Interconvertible with JSON.' },
  { term: 'Epoch / Unix timestamp', slug: 'epoch', definition: 'The number of seconds since 1 January 1970 UTC — the most common machine-readable way to represent a point in time, seen in JWT exp/iat claims and APIs.' },
  { term: 'Base64', slug: 'base64', definition: 'An encoding that represents binary or text data using 64 printable ASCII characters, so it can travel safely through text-only channels. It is encoding, not encryption.' },
  { term: 'Escaping', slug: 'escaping', definition: 'Representing special characters in a JSON string using backslash sequences, e.g. \\" for a quote, \\n for a newline, \\\\ for a backslash.' },
  { term: 'MIME type', slug: 'mime-type', definition: 'The content type identifying JSON over HTTP is application/json. Servers should send this header so clients parse the body correctly.' },
];
