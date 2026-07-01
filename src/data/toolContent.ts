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

  'json-to-csv': {
    intro: {
      heading: 'Convert JSON to CSV Online',
      paragraphs: [
        'CSV is the format every spreadsheet, database, and analytics tool understands. Converting a JSON array to CSV lets you hand structured data to non-technical colleagues, import it into Excel or Google Sheets, or bulk-load it into a database — without writing any parsing code.',
        'The converter maps each object in your JSON array to a row and each property name to a column header. It automatically escapes values that contain commas, quotes, or line breaks so the resulting CSV is valid and opens cleanly everywhere. This is the fastest way to turn an API export or query result into a shareable table.',
        'Everything runs in your browser, so even datasets containing private information are converted without being uploaded to a server.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to CSV',
      items: [
        'Paste your JSON — ideally an array of flat objects — into the input box.',
        'Click Convert JSON to CSV. Keys become the header row and each object becomes a data row.',
        'Review the CSV output; values with commas or quotes are escaped automatically.',
        'Copy the result or download it as a .csv file.',
        'Open it in Excel, Google Sheets, or import it into your database.',
      ],
    },
    example: {
      heading: 'JSON Array to CSV',
      description: 'An array of objects becomes a header row plus one row per object.',
      input: '[{"name":"Ada","age":36},{"name":"Linus","age":54}]',
      output: 'name,age\nAda,36\nLinus,54',
      inputLabel: 'JSON',
      outputLabel: 'CSV',
    },
    faqs: [
      { question: 'What JSON structure works best?', answer: 'An array of flat objects with consistent keys converts most cleanly — each object becomes a row and each key a column.' },
      { question: 'How are commas inside values handled?', answer: 'Values containing commas, quotes, or line breaks are automatically wrapped in double quotes and escaped per the CSV standard (RFC 4180), so the output stays valid.' },
      { question: 'Can it handle nested JSON?', answer: 'CSV is flat, so deeply nested objects are best flattened first. Simple one-level objects convert directly.' },
      { question: 'Is my data private?', answer: 'Yes. Conversion happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'csv-to-json': {
    intro: {
      heading: 'Convert CSV to JSON Online',
      paragraphs: [
        'Spreadsheets and exports live in CSV, but applications and APIs speak JSON. Converting CSV to JSON turns rows and columns into a clean array of objects you can drop straight into code, a database, or an API request.',
        'The converter treats the first row as the keys and every following row as an object. It also detects numbers and booleans so your JSON has proper types rather than everything being a string — ready to use without extra cleanup.',
        'Your file is parsed locally in the browser and never uploaded, so confidential data stays on your device.',
      ],
    },
    steps: {
      heading: 'How to Convert CSV to JSON',
      items: [
        'Paste your CSV, or upload a .csv file. Make sure the first row is your column headers.',
        'Click Convert CSV to JSON.',
        'Each row becomes a JSON object keyed by the header names.',
        'Review the JSON array, then copy or download it.',
        'Use it in your application, API, or database import.',
      ],
    },
    example: {
      heading: 'CSV Rows to JSON Objects',
      description: 'The header row defines the keys; each data row becomes an object.',
      input: 'name,age\nAda,36\nLinus,54',
      output: '[\n  { "name": "Ada", "age": 36 },\n  { "name": "Linus", "age": 54 }\n]',
      inputLabel: 'CSV',
      outputLabel: 'JSON',
    },
    faqs: [
      { question: 'Does it detect numbers and booleans?', answer: 'Yes. Values like 36 or true are converted to real JSON numbers and booleans rather than strings, so the output is ready to use.' },
      { question: 'What if my CSV has no header row?', answer: 'The first row is always treated as keys. Add a header row describing each column for meaningful JSON keys.' },
      { question: 'Are quoted fields with commas handled?', answer: 'Yes. Standard CSV quoting and escaping is parsed correctly, so values containing commas stay intact.' },
      { question: 'Is my file uploaded?', answer: 'No. Parsing runs entirely in your browser.' },
    ],
  },

  'json-to-yaml': {
    intro: {
      heading: 'Convert JSON to YAML Online',
      paragraphs: [
        'YAML is the configuration language of modern infrastructure — Kubernetes manifests, CI/CD pipelines, Docker Compose, and countless app configs are written in it. Its clean, indentation-based syntax is far easier for humans to read and edit than JSON. Converting JSON to YAML gives you that readable form instantly.',
        'The converter maps JSON objects to YAML mappings, arrays to YAML sequences, and preserves your strings, numbers, and booleans. The result is valid, idiomatic YAML you can paste straight into a config file.',
        'Conversion happens in your browser, so configuration data — which often contains sensitive values — never leaves your device.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to YAML',
      items: [
        'Paste your JSON into the input box.',
        'Click Convert JSON to YAML.',
        'Objects become indented mappings and arrays become dashed lists.',
        'Review the readable YAML output.',
        'Copy it into your Kubernetes, CI, Docker Compose, or app config file.',
      ],
    },
    example: {
      heading: 'JSON to YAML',
      description: 'Nested JSON becomes clean, indented YAML.',
      input: '{"name":"app","ports":[80,443],"debug":true}',
      output: 'name: app\nports:\n  - 80\n  - 443\ndebug: true',
      inputLabel: 'JSON',
      outputLabel: 'YAML',
    },
    faqs: [
      { question: 'What is YAML used for?', answer: 'YAML is the standard for human-edited configuration: Kubernetes, GitHub Actions and other CI, Docker Compose, and many application config files.' },
      { question: 'Are data types preserved?', answer: 'Yes. Strings, numbers, booleans, arrays, and nested objects are all mapped to their YAML equivalents.' },
      { question: 'Why is YAML easier to read than JSON?', answer: 'YAML uses indentation instead of braces and quotes, and supports comments, which makes configuration files cleaner and self-documenting.' },
      { question: 'Is my data private?', answer: 'Yes — the conversion runs entirely in your browser with no uploads.' },
    ],
  },

  'yaml-to-json': {
    intro: {
      heading: 'Convert YAML to JSON Online',
      paragraphs: [
        'YAML is great for humans, but most programs, APIs, and validators work with JSON. Converting YAML to JSON lets you take a readable config file and turn it into the structured data your code actually consumes.',
        'The converter parses YAML mappings, sequences, and typed values and produces an equivalent JSON document. It is ideal for feeding Kubernetes, CI, or Docker Compose configuration into tooling, validating YAML against a JSON schema, or debugging exactly how a YAML file will be interpreted.',
        'Everything is processed in your browser, so configuration files containing secrets stay entirely on your machine.',
      ],
    },
    steps: {
      heading: 'How to Convert YAML to JSON',
      items: [
        'Paste your YAML, or upload a .yaml / .yml file.',
        'Click Convert YAML to JSON.',
        'Mappings become objects and sequences become arrays, with types preserved.',
        'Review the formatted JSON output.',
        'Copy or download it for your application, API, or validation pipeline.',
      ],
    },
    example: {
      heading: 'YAML to JSON',
      description: 'Indented YAML becomes a nested JSON object.',
      input: 'name: app\nports:\n  - 80\n  - 443\ndebug: true',
      output: '{\n  "name": "app",\n  "ports": [80, 443],\n  "debug": true\n}',
      inputLabel: 'YAML',
      outputLabel: 'JSON',
    },
    faqs: [
      { question: 'Does it preserve data types?', answer: 'Yes. YAML numbers, booleans, strings, lists, and nested mappings are mapped to their natural JSON counterparts.' },
      { question: 'Can I convert a whole Kubernetes or Compose file?', answer: 'Yes. Paste an entire manifest or docker-compose.yml and get the equivalent JSON structure.' },
      { question: 'What if my YAML is invalid?', answer: 'You will get a clear error describing the parse problem, such as bad indentation, so you can fix it quickly.' },
      { question: 'Is my file uploaded?', answer: 'No. All parsing happens client-side in your browser.' },
    ],
  },

  'json-to-xml': {
    intro: {
      heading: 'Convert JSON to XML Online',
      paragraphs: [
        'XML remains the backbone of SOAP web services, many enterprise systems, document standards, and legacy integrations. When you have JSON but a downstream system expects XML, this converter does the translation, turning your objects and arrays into well-formed XML elements.',
        'Each JSON key becomes an element and nested objects become nested elements, producing valid XML you can feed into SOAP calls, configuration loaders, or publishing pipelines. Special characters are escaped automatically so the output always parses.',
        'The work happens in your browser — your JSON is never transmitted to a server.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to XML',
      items: [
        'Paste your JSON into the input box.',
        'Click Convert JSON to XML.',
        'Keys become XML elements; nested objects become nested elements.',
        'Review the well-formed, indented XML output.',
        'Copy or download it for your target system.',
      ],
    },
    example: {
      heading: 'JSON to XML',
      description: 'A nested JSON object becomes nested XML elements.',
      input: '{"note":{"to":"Ada","from":"Linus"}}',
      output: '<note>\n  <to>Ada</to>\n  <from>Linus</from>\n</note>',
      inputLabel: 'JSON',
      outputLabel: 'XML',
    },
    faqs: [
      { question: 'What does the XML structure look like?', answer: 'Each JSON key becomes an element named after it, and nested objects become nested elements. Arrays produce repeated elements.' },
      { question: 'Are special characters escaped?', answer: 'Yes. Characters like &, <, and > are escaped into valid XML entities so the document is well-formed.' },
      { question: 'What if my JSON is an array at the top level?', answer: 'XML needs a single root, so a top-level array is wrapped in a root element automatically to keep the output valid.' },
      { question: 'Is my data uploaded?', answer: 'No — the conversion runs entirely client-side in your browser.' },
    ],
  },

  'xml-to-json': {
    intro: {
      heading: 'Convert XML to JSON Online',
      paragraphs: [
        'XML powers SOAP responses, RSS feeds, and countless legacy and enterprise systems, but modern applications work with JSON. Converting XML to JSON lets you take any XML document and turn it into the structured data your code can consume directly.',
        'The converter reads XML elements and attributes and produces an equivalent JSON object, preserving nesting. It is ideal for consuming a SOAP or RSS response in a JavaScript app, migrating away from XML, or simply inspecting an XML payload in a friendlier format.',
        'All processing happens in your browser, so your XML — including any sensitive content — stays on your device.',
      ],
    },
    steps: {
      heading: 'How to Convert XML to JSON',
      items: [
        'Paste your XML, or upload an .xml file.',
        'Click Convert XML to JSON.',
        'Elements become object keys and nested elements become nested objects.',
        'Review the formatted JSON output.',
        'Copy or download it for your application or API.',
      ],
    },
    example: {
      heading: 'XML to JSON',
      description: 'Nested XML elements become a nested JSON object.',
      input: '<note>\n  <to>Ada</to>\n  <from>Linus</from>\n</note>',
      output: '{\n  "note": {\n    "to": "Ada",\n    "from": "Linus"\n  }\n}',
      inputLabel: 'XML',
      outputLabel: 'JSON',
    },
    faqs: [
      { question: 'How are XML attributes handled?', answer: 'Attributes are preserved in the JSON output with a prefix so they are not confused with child elements.' },
      { question: 'Can it handle SOAP or RSS?', answer: 'Yes. Any well-formed XML document — SOAP envelopes, RSS feeds, config files — converts to an equivalent JSON structure.' },
      { question: 'What if my XML is malformed?', answer: 'You will get an error so you can locate and fix the invalid markup before converting.' },
      { question: 'Is my XML uploaded?', answer: 'No. Everything is parsed locally in your browser.' },
    ],
  },

  'jwt-decoder': {
    intro: {
      heading: 'What Is a JWT and How to Decode It',
      paragraphs: [
        'A JSON Web Token (JWT) is a compact, URL-safe token used for authentication and authorization across the web. It has three parts separated by dots — a header, a payload, and a signature — and each of the first two is just base64url-encoded JSON. That means anyone can read a JWT’s contents; the signature only proves it has not been tampered with, it does not hide the data.',
        'This decoder splits the token, base64url-decodes the header and payload, and shows them as readable JSON. It also surfaces the standard time claims (exp, iat) as human-readable dates and tells you whether the token has expired — invaluable when debugging why an API keeps returning 401.',
        'Crucially, decoding happens entirely in your browser. Your token — which may grant access to real accounts — is never sent to any server, so it is safe to inspect production tokens here.',
      ],
    },
    steps: {
      heading: 'How to Decode a JWT',
      items: [
        'Copy the JWT from your request header, cookie, or logs (a "Bearer " prefix is fine — it is stripped).',
        'Paste it into the input box.',
        'Click Decode JWT.',
        'Read the decoded header and payload as formatted JSON, plus expiry details.',
        'Check the claims — issuer, subject, scopes, expiry — to debug your auth flow.',
      ],
    },
    tips: {
      heading: 'Good to Know About JWTs',
      items: [
        { title: 'Decoding is not verifying', text: 'This tool reads the token; it does not check the signature. Never trust a decoded payload without verifying the signature server-side.' },
        { title: 'Do not put secrets in the payload', text: 'The payload is readable by anyone who has the token. Store only non-sensitive claims there.' },
        { title: 'exp is a Unix timestamp', text: 'The exp claim is seconds since 1970. This tool converts it to a readable date and flags expired tokens.' },
        { title: 'Base64url, not base64', text: 'JWT segments use URL-safe base64 (- and _ instead of + and /), which is why plain base64 decoders sometimes fail on them.' },
      ],
    },
    faqs: [
      { question: 'Is it safe to paste my token here?', answer: 'Yes. Decoding happens entirely in your browser using client-side JavaScript. Your token is never transmitted, logged, or stored.' },
      { question: 'Does this verify the signature?', answer: 'No. This tool decodes the header and payload so you can read them. Signature verification requires the secret or public key and must be done on your server.' },
      { question: 'Why can I read the payload without a key?', answer: 'A JWT is only encoded, not encrypted. The header and payload are base64url-encoded JSON that anyone can decode — the signature exists to detect tampering, not to hide the contents.' },
      { question: 'How do I know if a token is expired?', answer: 'The decoder reads the exp claim, converts it to a readable date, and flags whether the token has already expired.' },
    ],
  },

  'base64': {
    intro: {
      heading: 'What Is Base64 Encoding?',
      paragraphs: [
        'Base64 is a way of representing binary or text data using only 64 printable ASCII characters (A–Z, a–z, 0–9, + and /). It exists so that data can travel safely through systems that were designed for text — email bodies, URLs, JSON fields, HTTP headers, and data URIs — without special bytes getting corrupted along the way.',
        'Encoding does not compress or encrypt anything: Base64 output is actually about a third larger than the input, and anyone can decode it. It is purely a safe transport format, not a security measure. This tool encodes text to Base64 and decodes Base64 back to text, handling full UTF-8 so accented characters and emoji survive the round trip.',
        'Everything happens in your browser — nothing you paste is uploaded, so it is safe for tokens or private data.',
      ],
    },
    steps: {
      heading: 'How to Encode or Decode Base64',
      items: [
        'Choose Encode to Base64 or Decode from Base64 with the toggle.',
        'Paste your text (to encode) or your Base64 string (to decode).',
        'Click the button to convert.',
        'Copy or download the result.',
      ],
    },
    example: {
      heading: 'Text ↔ Base64',
      description: 'Encoding turns readable text into a Base64 string; decoding reverses it exactly.',
      input: 'Hello, world!',
      output: 'SGVsbG8sIHdvcmxkIQ==',
      inputLabel: 'Text',
      outputLabel: 'Base64',
    },
    faqs: [
      { question: 'Is Base64 encryption?', answer: 'No. Base64 is encoding, not encryption. It is fully reversible by anyone and provides no security — never use it to protect secrets.' },
      { question: 'Why is my Base64 longer than the original?', answer: 'Base64 represents every 3 bytes as 4 characters, so the output is roughly 33% larger than the input. That is expected.' },
      { question: 'Does it handle emoji and accented characters?', answer: 'Yes. This tool encodes and decodes full UTF-8, so non-ASCII characters round-trip correctly.' },
      { question: 'Is my data private?', answer: 'Yes — encoding and decoding run entirely in your browser with no uploads.' },
    ],
  },

  'timestamp-converter': {
    intro: {
      heading: 'What Is a Unix Timestamp?',
      paragraphs: [
        'A Unix timestamp (also called epoch time) is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970. It is the most common way computers store and exchange points in time because it is just a single number, free of time zones and formatting ambiguity.',
        'Timestamps appear everywhere in development — JWT exp/iat claims, database records, API responses, log files. This converter turns an epoch value into human-readable dates (ISO 8601, UTC, and your local time) and turns a date back into a timestamp. It automatically detects whether your number is in seconds or milliseconds.',
        'All conversion happens in your browser; nothing is sent anywhere.',
      ],
    },
    steps: {
      heading: 'How to Convert Timestamps',
      items: [
        'Pick Timestamp → Date or Date → Timestamp.',
        'Paste a Unix timestamp (seconds or milliseconds) or a date.',
        'Click convert to see the result in multiple formats.',
        'Copy whichever representation you need.',
      ],
    },
    example: {
      heading: 'Epoch to Date',
      description: 'The timestamp 1700000000 (seconds) converts to a readable UTC date.',
      input: '1700000000',
      output: 'ISO 8601 (UTC): 2023-11-14T22:13:20.000Z',
      inputLabel: 'Unix timestamp',
      outputLabel: 'Date',
    },
    faqs: [
      { question: 'Seconds or milliseconds?', answer: 'Both work. The converter detects the magnitude — long numbers are treated as milliseconds, shorter ones as seconds — and shows you both.' },
      { question: 'What time zone is used?', answer: 'It shows ISO 8601 and UTC (time-zone independent) plus your browser’s local time, so you can pick what you need.' },
      { question: 'What date formats can I input?', answer: 'Standard formats like 2026-07-01 or full ISO 8601 such as 2026-07-01T10:00:00Z parse reliably.' },
      { question: 'Is my data private?', answer: 'Yes — everything runs locally in your browser.' },
    ],
  },

  'uuid-generator': {
    intro: {
      heading: 'What Is a UUID?',
      paragraphs: [
        'A UUID (Universally Unique Identifier), also called a GUID, is a 128-bit value written as 36 characters like 550e8400-e29b-41d4-a716-446655440000. UUIDs let independent systems create identifiers that are virtually guaranteed never to collide, without needing a central authority — which is why they are everywhere in databases, APIs, message queues, and distributed systems.',
        'This generator produces version 4 UUIDs, which are randomly generated. It uses the browser’s cryptographically secure random source, so the values are suitable for real identifiers, not just placeholders. You can generate anywhere from one to a thousand at once and copy them all with a click.',
        'Generation happens entirely in your browser — the values are created on your device and never transmitted.',
      ],
    },
    steps: {
      heading: 'How to Generate UUIDs',
      items: [
        'Enter how many UUIDs you need (1–1000).',
        'Click Generate.',
        'Click Copy all to copy the whole list, or select individual values.',
        'Regenerate any time for a fresh batch.',
      ],
    },
    faqs: [
      { question: 'What version of UUID is this?', answer: 'These are UUID v4 (random) values, generated using the browser’s cryptographically secure random number generator.' },
      { question: 'Are they truly unique?', answer: 'Version 4 UUIDs have 122 random bits, so the odds of a collision are astronomically small — safe to use as unique identifiers in practice.' },
      { question: 'Can I generate many at once?', answer: 'Yes — up to 1000 at a time. Enter the count and click Generate.' },
      { question: 'Are the UUIDs sent to a server?', answer: 'No. They are generated locally in your browser and never leave your device.' },
    ],
  },

  'json-diff': {
    intro: {
      heading: 'Compare Two JSON Documents',
      paragraphs: [
        'When two JSON payloads should be the same but behave differently — an API response before and after a change, two config files, an expected vs. actual test fixture — spotting the difference by eye is slow and error-prone. A JSON diff parses both documents and tells you exactly what changed, by key path, ignoring irrelevant formatting like whitespace and key order.',
        'This tool reports three kinds of change: values added on the right, values removed on the right, and values that changed between the two. Because it compares the parsed structure rather than the raw text, reformatting or reordering keys will not show up as false differences — only real data changes do.',
        'Both documents are compared in your browser; nothing is uploaded.',
      ],
    },
    steps: {
      heading: 'How to Diff JSON',
      items: [
        'Paste the original JSON in the left box.',
        'Paste the changed JSON in the right box.',
        'Click Compare JSON.',
        'Read the list of differences, each labeled with its key path and whether it was added, removed, or changed.',
      ],
    },
    example: {
      heading: 'What a Diff Looks Like',
      description: 'Only the real change is reported, with its exact path.',
      input: 'Left:  {"name":"Ada","age":36}\nRight: {"name":"Ada","age":37}',
      output: '~ age: 36 → 37',
      inputLabel: 'Inputs',
      outputLabel: 'Difference',
    },
    faqs: [
      { question: 'Does key order or formatting matter?', answer: 'No. The tool compares the parsed structure, so reordering keys or reformatting whitespace will not appear as a difference — only actual value changes do.' },
      { question: 'What do +, - and ~ mean?', answer: 'Plus means a value present only on the right (added), minus means present only on the left (removed), and tilde means the value changed between the two.' },
      { question: 'Can it compare nested objects and arrays?', answer: 'Yes. It walks the full structure and reports differences with their complete key path, including inside nested objects and arrays.' },
      { question: 'Is my data private?', answer: 'Yes — both documents are compared entirely in your browser with no uploads.' },
    ],
  },

  'json-to-go': {
    intro: {
      heading: 'Convert JSON to Go Structs',
      paragraphs: [
        'Go is statically typed, so consuming JSON usually means first defining a struct that mirrors the data, complete with json field tags. Writing those structs by hand for a large API response is tedious and error-prone. This tool reads your JSON and generates the matching Go structs instantly, with correct field types and json tags.',
        'It handles nested objects by generating separate named structs, turns arrays into slices, and infers Go types (string, int, float64, bool) from the values. Field names are exported (capitalized) and each carries a json tag so encoding/json maps them back to the original keys.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Go',
      items: [
        'Paste your JSON into the input box.',
        'Optionally set the root struct name.',
        'Click Generate Go Structs.',
        'Copy the structs or download them as a .go file, then drop them into your package.',
      ],
    },
    example: {
      heading: 'JSON to Go Struct',
      description: 'A JSON object becomes an exported struct with json tags.',
      input: '{"id": 1, "name": "Ada", "active": true}',
      output: 'type Root struct {\n\tId     int    `json:"id"`\n\tName   string `json:"name"`\n\tActive bool   `json:"active"`\n}',
      inputLabel: 'JSON',
      outputLabel: 'Go',
    },
    faqs: [
      { question: 'Does it add json tags?', answer: 'Yes. Every field gets a json tag matching the original JSON key, so encoding/json marshals and unmarshals correctly.' },
      { question: 'How are nested objects handled?', answer: 'Each nested object becomes its own named struct, and arrays become slices of the appropriate type.' },
      { question: 'What Go types are used?', answer: 'Strings map to string, whole numbers to int, decimals to float64, booleans to bool, and unknown/null values to interface{}.' },
      { question: 'Is my data private?', answer: 'Yes — generation happens entirely in your browser.' },
    ],
  },

  'json-to-python': {
    intro: {
      heading: 'Convert JSON to Python Classes',
      paragraphs: [
        'When you consume JSON in Python, mapping it onto typed classes makes your code clearer and safer than passing raw dictionaries around. This tool generates Python classes from your JSON automatically, inferring types and creating nested classes for nested objects.',
        'It saves you from hand-writing boilerplate for large API responses and gives you a typed starting point you can adapt to dataclasses, Pydantic models, or plain classes as your project requires.',
        'All processing is in your browser, so your data stays on your device.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Python',
      items: [
        'Paste your JSON into the input box.',
        'Optionally set the root class name.',
        'Click Generate Python Classes.',
        'Copy the classes or download them as a .py file.',
      ],
    },
    faqs: [
      { question: 'Does it produce dataclasses or Pydantic models?', answer: 'It generates typed Python classes you can use directly or quickly adapt into @dataclass or Pydantic BaseModel form depending on your stack.' },
      { question: 'How are nested objects handled?', answer: 'Nested JSON objects become their own classes, referenced from the parent, so the full structure is typed.' },
      { question: 'Does it add type hints?', answer: 'Yes. Fields are annotated with inferred Python types (str, int, float, bool, list) so your editor and type checker understand the shape.' },
      { question: 'Is my data private?', answer: 'Yes — everything runs locally in your browser.' },
    ],
  },

  'json-to-java': {
    intro: {
      heading: 'Convert JSON to Java Classes',
      paragraphs: [
        'Java applications typically model JSON with POJOs (plain old Java objects) that Jackson or Gson can serialize and deserialize. Writing those classes by hand for a complex payload is slow. This tool generates the Java classes from your JSON instantly, with correct types and nested classes.',
        'It infers Java types (String, int, double, boolean) from the values, creates a separate class for each nested object, and turns arrays into List fields — giving you a typed starting point ready to paste into your project.',
        'Conversion happens in your browser; your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Java',
      items: [
        'Paste your JSON into the input box.',
        'Optionally set the root class name.',
        'Click Generate Java Classes.',
        'Copy the classes or download them, then add getters/setters or serialization annotations as your framework needs.',
      ],
    },
    faqs: [
      { question: 'Does it work with Jackson and Gson?', answer: 'Yes. The generated POJOs map cleanly to JSON with both Jackson and Gson; you can add annotations if you need custom field names.' },
      { question: 'How are nested objects handled?', answer: 'Each nested object becomes its own class, and arrays become List fields of the appropriate type.' },
      { question: 'What Java types are used?', answer: 'Strings map to String, whole numbers to int, decimals to double, booleans to boolean, and arrays to List.' },
      { question: 'Is my data private?', answer: 'Yes — generation runs entirely in your browser.' },
    ],
  },
};
