export interface ToolContentData {
  intro: { heading: string; paragraphs: string[] };
  steps: { heading: string; items: string[] };
  example?: {
    heading: string;
    description: string;
    input: string;
    output: string;
    inputLabel?: string;
    outputLabel?: string;
  };
  tips?: { heading: string; items: { title: string; text: string }[] };
  faqs: { question: string; answer: string }[];
}

export const toolContent: Record<string, ToolContentData> = {
  'json-formatter': {
    intro: {
      heading: 'What Is a JSON Formatter and Why You Need One',
      paragraphs: [
        'JSON (JavaScript Object Notation) has become the universal language of APIs, configuration files, and data storage, but raw JSON returned from a server is almost always minified into a single, unreadable line. A JSON formatter takes that compressed string and reshapes it into a clean, indented, color-friendly structure so you can actually understand what the data contains. Instead of squinting at a wall of braces and commas, you see a clear hierarchy of objects, arrays, and key-value pairs.',
        'Beyond beautifying, a good formatter also validates. JSON has strict syntax rules — double-quoted keys, no trailing commas, no comments — and a single misplaced character will break a parser. Our tool checks your input as you paste it and points to the exact location of any error, turning a frustrating debugging session into a few seconds of work.',
        'Everything runs locally in your browser. Your JSON is never uploaded to a server, logged, or stored, which means you can safely format API responses containing tokens, customer records, or other sensitive data without it ever leaving your machine.',
      ],
    },
    steps: {
      heading: 'How to Format JSON Online',
      items: [
        'Copy the raw or minified JSON from your API response, log file, or configuration file.',
        'Paste it into the input editor above. The tool parses it instantly as you type.',
        'Click Format (or Beautify) to pretty-print the JSON with consistent indentation, or click Minify to strip whitespace for production use.',
        'If the JSON contains a syntax error, read the highlighted message to find the missing comma, bracket, or quote, then fix it.',
        'Copy the formatted result with one click, or download it for use in your project.',
      ],
    },
    example: {
      heading: 'Before and After: Formatting Example',
      description:
        'Here is a typical minified API response on the left and the same data after formatting on the right. The indented version makes the nested structure obvious at a glance.',
      input: '{"id":42,"name":"Ada","roles":["admin","editor"],"active":true}',
      output: `{
  "id": 42,
  "name": "Ada",
  "roles": [
    "admin",
    "editor"
  ],
  "active": true
}`,
      inputLabel: 'Minified',
      outputLabel: 'Formatted',
    },
    tips: {
      heading: 'Common JSON Mistakes the Validator Catches',
      items: [
        { title: 'Trailing commas', text: 'A comma after the last item in an object or array is valid in JavaScript but illegal in JSON. Remove it.' },
        { title: 'Single quotes', text: 'JSON requires double quotes for both keys and string values. Single quotes will always fail to parse.' },
        { title: 'Unquoted keys', text: 'Every object key must be wrapped in double quotes, even simple ones like { "id": 1 }.' },
        { title: 'Comments', text: 'Standard JSON does not allow // or /* */ comments. Strip them before parsing or use JSON5 elsewhere.' },
      ],
    },
    faqs: [
      { question: 'Is the JSON formatter free to use?', answer: 'Yes, it is completely free with no sign-up, no limits, and no watermarks. You can use it for personal and commercial work without restriction.' },
      { question: 'Does my data get uploaded anywhere?', answer: 'No. All formatting and validation happens entirely in your browser using client-side JavaScript. Your JSON never touches our servers, so it is safe for confidential data.' },
      { question: 'What is the difference between formatting and minifying?', answer: 'Formatting (beautifying) adds indentation and line breaks so JSON is easy to read. Minifying does the opposite — it removes all unnecessary whitespace to make the file as small as possible, which is ideal for production network payloads.' },
      { question: 'Can it handle very large JSON files?', answer: 'Yes. The tool is optimized for large inputs and can comfortably handle files several megabytes in size. Performance ultimately depends on your device memory, but multi-megabyte files format in a moment.' },
      { question: 'Why does my JSON show an error?', answer: 'The most common causes are trailing commas, single quotes instead of double quotes, unquoted keys, or a missing closing bracket. The validator highlights the exact position so you can fix it quickly.' },
    ],
  },

  'json-viewer': {
    intro: {
      heading: 'View and Explore JSON as an Interactive Tree',
      paragraphs: [
        'When a JSON document grows to hundreds or thousands of lines, scrolling through formatted text stops being practical. A JSON viewer renders your data as a collapsible tree, letting you expand only the branches you care about and collapse everything else. This turns a deeply nested API response into something you can navigate like a file explorer.',
        'Tree views are especially useful for understanding the shape of unfamiliar data. You can quickly see which fields are objects, which are arrays, how deep the nesting goes, and where a particular value lives — all without manually counting brackets. This is invaluable when integrating with a third-party API whose structure you are seeing for the first time.',
        'As with all our tools, the viewer processes everything in your browser. Nothing is uploaded, so you can inspect production responses and sensitive payloads with complete privacy.',
      ],
    },
    steps: {
      heading: 'How to Use the JSON Viewer',
      items: [
        'Paste your JSON into the input area. It is parsed and rendered as a tree automatically.',
        'Click the arrows next to objects and arrays to expand or collapse individual branches.',
        'Use collapse-all to get a high-level overview, then drill into just the sections you need.',
        'Read values directly in the tree, noting their data types (string, number, boolean, null).',
        'Switch back to raw or formatted text view whenever you need to copy a portion of the data.',
      ],
    },
    example: {
      heading: 'From Flat Text to Navigable Tree',
      description:
        'A nested order object is far easier to scan as a tree. Each level can be collapsed so you focus on one part at a time.',
      input: '{"order":{"id":7,"items":[{"sku":"A1","qty":2}],"paid":true}}',
      output: `order
├─ id: 7
├─ items [1]
│  └─ 0
│     ├─ sku: "A1"
│     └─ qty: 2
└─ paid: true`,
      inputLabel: 'Raw JSON',
      outputLabel: 'Tree view',
    },
    faqs: [
      { question: 'How is a viewer different from a formatter?', answer: 'A formatter outputs indented text you read top to bottom. A viewer renders an interactive tree you can expand and collapse, which scales much better for large or deeply nested documents.' },
      { question: 'Can I collapse large arrays?', answer: 'Yes. Arrays and objects each have a toggle, so you can collapse a thousand-element array down to a single line and expand it only when needed.' },
      { question: 'Is my data private?', answer: 'Completely. The viewer runs in your browser and never sends your JSON to any server.' },
      { question: 'Does it show data types?', answer: 'Yes. Strings, numbers, booleans, and null values are visually distinguished so you can understand the schema at a glance.' },
    ],
  },

  'json-blob-viewer': {
    intro: {
      heading: 'What Is a JSON Blob and How to Read It',
      paragraphs: [
        'A "JSON blob" usually refers to a large, unformatted chunk of JSON — often pasted from a database column, a log line, a webhook payload, or a clipboard copy where all the structure has been flattened into one continuous string. On its own it is nearly impossible to read. A blob viewer parses that string, validates it, and presents it in a readable, explorable form.',
        'Developers frequently encounter JSON blobs when debugging. A logging system might dump an entire request body on a single line, or a NoSQL database might store a document as a serialized string. Rather than manually inserting line breaks, you paste the blob here and immediately get a clean, navigable view of the underlying data.',
        'Because parsing happens locally, you can safely inspect blobs that contain authentication tokens, personal data, or internal identifiers. Nothing you paste is transmitted or retained.',
      ],
    },
    steps: {
      heading: 'How to View a JSON Blob',
      items: [
        'Copy the JSON blob from your log, database, or clipboard — even if it is one giant line.',
        'Paste it into the viewer. The tool parses and structures it for you instantly.',
        'Explore the result as formatted text or an interactive tree to understand its contents.',
        'If the blob is invalid, use the error message to locate and repair the broken syntax.',
        'Copy individual sections or the fully formatted output for use elsewhere.',
      ],
    },
    faqs: [
      { question: 'What exactly is a JSON blob?', answer: 'It is simply a large block of JSON text, typically minified or unformatted, that needs to be parsed and beautified before it can be read comfortably.' },
      { question: 'Can it handle escaped or stringified JSON?', answer: 'Yes. Blobs are often double-encoded (JSON stored as a string inside other JSON). Paste it in and the viewer will help you decode and read the structure.' },
      { question: 'Is there a size limit?', answer: 'There is no hard limit. The viewer handles multi-megabyte blobs; performance depends on your device memory.' },
      { question: 'Is my blob kept private?', answer: 'Yes — all processing is client-side and nothing is uploaded or stored.' },
    ],
  },

  'json-to-excel': {
    intro: {
      heading: 'Convert JSON to Excel Spreadsheets Online',
      paragraphs: [
        'JSON is perfect for machines, but when you need to share data with analysts, managers, or clients, a spreadsheet is far more accessible. Converting JSON to Excel turns arrays of objects into rows and columns that anyone can sort, filter, and chart in Microsoft Excel, Google Sheets, or Numbers — no coding required.',
        'Our converter intelligently maps your JSON structure to spreadsheet columns. Each object becomes a row, each key becomes a column header, and nested values are flattened so the result is a clean, tabular .xlsx file ready to open. This is ideal for exporting API data, reporting, and handing datasets to non-technical colleagues.',
        'The conversion runs entirely in your browser, so even large datasets containing private information are processed without ever being uploaded to a server.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Excel',
      items: [
        'Paste your JSON — typically an array of objects — into the input field.',
        'The tool detects the keys and builds column headers automatically.',
        'Review the preview to confirm the rows and columns look correct.',
        'Click Convert / Download to generate an .xlsx file.',
        'Open the downloaded file in Excel, Google Sheets, or any spreadsheet application.',
      ],
    },
    example: {
      heading: 'JSON Array to Spreadsheet Rows',
      description:
        'An array of user objects becomes a table where each object is a row and each property is a column.',
      input: `[
  {"name": "Ada", "age": 36},
  {"name": "Linus", "age": 54}
]`,
      output: `name   | age
-------|----
Ada    | 36
Linus  | 54`,
      inputLabel: 'JSON',
      outputLabel: 'Excel sheet',
    },
    faqs: [
      { question: 'What JSON structure works best?', answer: 'An array of flat objects converts most cleanly, since each object maps to a row and each key to a column. Nested objects are flattened into dotted column names where possible.' },
      { question: 'What file format do I get?', answer: 'You receive a standard .xlsx file that opens in Microsoft Excel, Google Sheets, LibreOffice Calc, and Apple Numbers.' },
      { question: 'Can it handle nested JSON?', answer: 'Yes. Nested objects are flattened into separate columns. Deeply nested arrays may need restructuring for the cleanest tabular result.' },
      { question: 'Is my data uploaded?', answer: 'No. The entire conversion happens in your browser, so your data stays on your device.' },
    ],
  },

  'excel-to-json': {
    intro: {
      heading: 'Convert Excel Spreadsheets to JSON',
      paragraphs: [
        'Spreadsheets are where business data lives, but applications and APIs speak JSON. Converting Excel to JSON bridges that gap: it takes the rows and columns from an .xlsx or .xls file and produces a clean array of JSON objects you can feed straight into code, a database, or an API request.',
        'The converter treats your first row as the set of keys and every subsequent row as an object. The result is structured, valid JSON that mirrors your spreadsheet exactly — perfect for seeding a database, importing test data, or migrating a manually maintained sheet into a real application.',
        'Your file is read and converted locally in the browser. It is never uploaded, so confidential spreadsheets stay private.',
      ],
    },
    steps: {
      heading: 'How to Convert Excel to JSON',
      items: [
        'Upload your Excel file, or paste tabular data directly.',
        'Make sure the first row contains your column headers — these become the JSON keys.',
        'The tool reads each row and builds a corresponding JSON object.',
        'Review the generated JSON array in the output.',
        'Copy or download the JSON for use in your application, API, or database.',
      ],
    },
    example: {
      heading: 'Spreadsheet Rows to JSON Objects',
      description:
        'The header row defines the keys, and each data row becomes an object in the resulting array.',
      input: `name   | age
Ada    | 36
Linus  | 54`,
      output: `[
  { "name": "Ada", "age": 36 },
  { "name": "Linus", "age": 54 }
]`,
      inputLabel: 'Excel sheet',
      outputLabel: 'JSON',
    },
    faqs: [
      { question: 'Which Excel formats are supported?', answer: 'Both modern .xlsx and legacy .xls files are supported, along with pasted tabular data.' },
      { question: 'How are headers handled?', answer: 'The first row is treated as the keys for each JSON object. Make sure your headers are descriptive and free of duplicates.' },
      { question: 'Can I convert a specific sheet?', answer: 'Multi-sheet workbooks are read starting from the first sheet. Move the data you want to convert to the first sheet for predictable results.' },
      { question: 'Is my spreadsheet uploaded?', answer: 'No. Conversion is performed entirely in your browser and your file never leaves your device.' },
    ],
  },

  'excel-to-csv': {
    intro: {
      heading: 'Convert Excel to CSV Online',
      paragraphs: [
        'CSV (Comma-Separated Values) is the most portable data format there is — readable by virtually every database, programming language, and analytics tool. Converting an Excel workbook to CSV strips away the proprietary formatting and leaves you with plain, universally compatible text that imports cleanly anywhere.',
        'This is the format of choice when you need to bulk-import data, feed a command-line tool, or move information between systems that do not understand .xlsx. Our converter reads your spreadsheet and outputs properly escaped CSV, handling commas and quotes inside cells so your data stays intact.',
        'Conversion happens locally in your browser, keeping even sensitive datasets completely private.',
      ],
    },
    steps: {
      heading: 'How to Convert Excel to CSV',
      items: [
        'Upload your .xlsx or .xls file.',
        'The tool reads the rows and columns from the first sheet.',
        'Values containing commas or quotes are automatically escaped to keep the CSV valid.',
        'Preview the comma-separated output.',
        'Download the .csv file for import into databases, scripts, or other tools.',
      ],
    },
    faqs: [
      { question: 'Why convert to CSV instead of keeping Excel?', answer: 'CSV is plain text and universally supported. It is ideal for database imports, scripting, and moving data between systems that cannot read .xlsx files.' },
      { question: 'How are commas inside cells handled?', answer: 'Cells containing commas, quotes, or line breaks are automatically wrapped in quotes and escaped so the resulting CSV parses correctly.' },
      { question: 'Which sheet gets converted?', answer: 'The first sheet of the workbook is converted. Place your target data on the first sheet for predictable output.' },
      { question: 'Is my file private?', answer: 'Yes. Everything is processed in your browser and nothing is uploaded.' },
    ],
  },

  'excel-to-xml': {
    intro: {
      heading: 'Convert Excel to XML Online',
      paragraphs: [
        'XML remains the backbone of countless enterprise systems, document standards, and legacy integrations. When you have data in a spreadsheet but a downstream system expects XML, this converter does the translation: each row becomes a structured XML record with elements derived from your column headers.',
        'The result is well-formed XML that you can feed into configuration loaders, SOAP services, publishing pipelines, or any system that consumes XML. It saves you from hand-writing tags or building a one-off script for a simple data hand-off.',
        'As with all our converters, the work happens in your browser. Your spreadsheet data is never transmitted to a server.',
      ],
    },
    steps: {
      heading: 'How to Convert Excel to XML',
      items: [
        'Upload your Excel file containing a header row and data rows.',
        'The header row becomes the XML element names for each field.',
        'Each data row is wrapped into its own record element.',
        'Review the generated, well-formed XML.',
        'Copy or download the XML for your target system.',
      ],
    },
    faqs: [
      { question: 'What does the XML structure look like?', answer: 'Each row becomes a record element, and each column becomes a child element named after its header. The output is well-formed and ready to consume.' },
      { question: 'Are special characters escaped?', answer: 'Yes. Characters like &, <, and > are escaped into valid XML entities so the document parses correctly.' },
      { question: 'Can I customize element names?', answer: 'Element names come from your column headers, so rename your headers in the spreadsheet to control the XML tag names.' },
      { question: 'Is my data uploaded?', answer: 'No — conversion runs entirely client-side in your browser.' },
    ],
  },

  'json-to-toml': {
    intro: {
      heading: 'Convert JSON to TOML Online',
      paragraphs: [
        'TOML (Tom’s Obvious, Minimal Language) is a configuration format designed to be easy for humans to read and write. It is the standard for tools like Rust’s Cargo and Python’s pyproject.toml, where its clear sections and minimal punctuation make configuration files far friendlier than JSON.',
        'If you have data or settings in JSON and need them in a TOML config file, this converter handles the translation. It maps JSON objects to TOML tables, arrays to TOML arrays, and preserves your strings, numbers, and booleans so the resulting file is valid and idiomatic.',
        'The conversion is performed locally in your browser, so your configuration data — which often contains keys and credentials — stays completely private.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to TOML',
      items: [
        'Paste your JSON object into the input editor.',
        'The converter maps objects to TOML tables and arrays to TOML arrays.',
        'Review the generated TOML, organized into readable sections.',
        'Copy the result into your config file (for example pyproject.toml or Cargo.toml).',
        'Validate it in your tool of choice to confirm everything loads correctly.',
      ],
    },
    example: {
      heading: 'JSON Object to TOML Tables',
      description: 'Nested JSON objects become clearly labeled TOML tables, which read much more naturally in a config file.',
      input: `{
  "title": "App",
  "owner": { "name": "Ada" }
}`,
      output: `title = "App"

[owner]
name = "Ada"`,
      inputLabel: 'JSON',
      outputLabel: 'TOML',
    },
    faqs: [
      { question: 'What is TOML used for?', answer: 'TOML is a configuration file format prized for readability. It powers Rust’s Cargo.toml, Python’s pyproject.toml, and many other modern developer tools.' },
      { question: 'How are nested objects converted?', answer: 'Nested JSON objects become TOML tables (sections in square brackets), and deeper nesting becomes dotted or nested table names.' },
      { question: 'Are data types preserved?', answer: 'Yes. Strings, numbers, booleans, and arrays are mapped to their TOML equivalents so the output is valid and idiomatic.' },
      { question: 'Is my data private?', answer: 'Yes — the conversion runs entirely in your browser and nothing is uploaded.' },
    ],
  },

  'toml-to-json': {
    intro: {
      heading: 'Convert TOML to JSON Online',
      paragraphs: [
        'While TOML is excellent for human-edited configuration, most applications and APIs work with JSON internally. Converting TOML to JSON lets you take a readable config file and turn it into the structured data your code actually consumes — no manual parsing required.',
        'This converter reads TOML tables, arrays, and typed values and produces an equivalent JSON object. It is useful for loading TOML configuration into JavaScript tooling, validating config against a JSON schema, or migrating a project from TOML-based settings to a JSON pipeline.',
        'Everything is processed in your browser, so configuration files containing secrets remain entirely on your machine.',
      ],
    },
    steps: {
      heading: 'How to Convert TOML to JSON',
      items: [
        'Paste your TOML configuration into the input editor.',
        'The converter parses tables, arrays, and typed values.',
        'A matching JSON object is generated instantly.',
        'Review and copy the formatted JSON output.',
        'Use it in your application, validation pipeline, or API request.',
      ],
    },
    example: {
      heading: 'TOML Tables to JSON Object',
      description: 'TOML sections are converted into nested JSON objects with the correct value types preserved.',
      input: `title = "App"

[owner]
name = "Ada"`,
      output: `{
  "title": "App",
  "owner": { "name": "Ada" }
}`,
      inputLabel: 'TOML',
      outputLabel: 'JSON',
    },
    faqs: [
      { question: 'Does it preserve data types?', answer: 'Yes. TOML integers, floats, booleans, dates, and strings are mapped to their natural JSON counterparts.' },
      { question: 'How are TOML tables represented?', answer: 'Each TOML table becomes a nested JSON object, and arrays of tables become arrays of objects.' },
      { question: 'Can I convert a full config file?', answer: 'Yes. Paste an entire Cargo.toml or pyproject.toml and the converter will produce the equivalent JSON structure.' },
      { question: 'Is my file uploaded?', answer: 'No. All parsing happens client-side in your browser.' },
    ],
  },

  'json-to-toon': {
    intro: {
      heading: 'Convert JSON to TOON Online',
      paragraphs: [
        'TOON (Token-Oriented Object Notation) is a compact, token-efficient serialization format designed for the age of large language models. Because LLM costs and context limits are measured in tokens, representing structured data in fewer tokens than JSON can meaningfully reduce cost and free up context window for actual reasoning.',
        'This converter translates standard JSON into TOON, collapsing repetitive keys and verbose punctuation into a denser representation while preserving the underlying structure. It is especially useful when you are passing large datasets into a model prompt and want to fit more data into the same token budget.',
        'The conversion runs locally in your browser, so the data you prepare for your prompts is never uploaded or stored.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to TOON',
      items: [
        'Paste the JSON you intend to send to a language model.',
        'The converter rewrites it into the more compact TOON representation.',
        'Compare the token-efficient output against your original JSON.',
        'Copy the TOON into your prompt or pipeline.',
        'Convert it back to JSON later if your application needs standard JSON again.',
      ],
    },
    faqs: [
      { question: 'What is TOON and why use it?', answer: 'TOON (Token-Oriented Object Notation) is a compact format that represents the same data as JSON using fewer tokens, which lowers cost and saves context when working with large language models.' },
      { question: 'Is TOON lossless?', answer: 'TOON preserves the structure and values of your data so it can be converted back to JSON. It optimizes representation, not content.' },
      { question: 'When should I use TOON over JSON?', answer: 'Use TOON when you are sending sizable structured data into an LLM prompt and want to minimize token usage. Stick with JSON for normal application and API work.' },
      { question: 'Is my data private?', answer: 'Yes. The conversion is performed entirely in your browser with no uploads.' },
    ],
  },

  'toon-to-json': {
    intro: {
      heading: 'Convert TOON to JSON Online',
      paragraphs: [
        'TOON (Token-Oriented Object Notation) is a compact format optimized for language model prompts, but your applications, databases, and APIs expect standard JSON. This converter takes TOON input and expands it back into clean, valid JSON you can use anywhere.',
        'It is the natural companion to JSON-to-TOON: you compress data into TOON to save tokens when talking to a model, then convert the model’s TOON output back into JSON so the rest of your system can consume it normally. This round-trip keeps your prompts efficient without forcing the rest of your stack to understand TOON.',
        'All processing happens in your browser, keeping your data private throughout the round trip.',
      ],
    },
    steps: {
      heading: 'How to Convert TOON to JSON',
      items: [
        'Paste your TOON data into the input editor.',
        'The converter expands it back into standard JSON structure.',
        'Review the formatted, valid JSON output.',
        'Copy or download it for use in your application or API.',
        'Validate the JSON if it is headed into a strict schema.',
      ],
    },
    faqs: [
      { question: 'What is the point of converting TOON back to JSON?', answer: 'TOON is compact for LLM prompts, but most software expects JSON. Converting back lets the rest of your application consume the data normally.' },
      { question: 'Is the conversion lossless?', answer: 'Yes. The structure and values encoded in TOON are restored into equivalent JSON.' },
      { question: 'Can I use this for LLM output?', answer: 'Absolutely. If a model returns TOON, paste it here to get usable JSON for your pipeline.' },
      { question: 'Is my data uploaded?', answer: 'No. Everything runs locally in your browser.' },
    ],
  },
};
