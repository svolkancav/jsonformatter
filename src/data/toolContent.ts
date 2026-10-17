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

  'text-diff': {
    intro: {
      heading: 'Compare Two Strings or Blocks of Text',
      paragraphs: [
        'Finding what changed between two pieces of text by reading them side by side is slow and unreliable — a single altered character, a swapped line, or a stray trailing space is exactly the kind of thing the eye skips over. A text diff does the comparison mechanically: it lines the two versions up, works out the longest sequence of lines they still share, and reports everything else as added or removed.',
        'This tool compares raw text, not parsed data, so it works on anything you can paste: log output, CSV rows, SQL queries, config files, translation strings, email drafts, or two revisions of the same paragraph. If you specifically need to compare JSON documents — where key order and whitespace should not count as changes — use the JSON Diff tool instead, which compares the parsed structure.',
        'The comparison happens entirely in your browser. Nothing you paste is uploaded, logged, or stored, so it is safe to use on internal logs and other sensitive text.',
      ],
    },
    steps: {
      heading: 'How to Compare Two Texts',
      items: [
        'Paste the original text into the left box.',
        'Paste the changed text into the right box.',
        'Optionally enable "Ignore case" or "Ignore whitespace" if those differences should not count.',
        'Click Compare Text.',
        'Read the result: green lines marked + exist only on the right, red lines marked − exist only on the left, and the counters summarise how much changed.',
        'Turn on "Hide unchanged lines" to collapse the untouched parts and focus on the differences.',
      ],
    },
    example: {
      heading: 'What a Text Diff Looks Like',
      description: 'One row was edited and one was replaced; the untouched rows are reported as unchanged.',
      input: 'Left:  2,Alan Turing,editor\nRight: 2,Alan Turing,admin',
      output: '- 2,Alan Turing,editor\n+ 2,Alan Turing,admin',
      inputLabel: 'Inputs',
      outputLabel: 'Difference',
    },
    tips: {
      heading: 'Tips for Cleaner Comparisons',
      items: [
        { title: 'Ignore whitespace for reformatted text', text: 'If one version was re-indented or wrapped differently, whitespace changes will drown out the real edits. Enabling "Ignore whitespace" trims each line and collapses runs of spaces and tabs before comparing.' },
        { title: 'Ignore case for identifiers and slugs', text: 'When comparing lists of keys, emails, or slugs where capitalisation is not meaningful, "Ignore case" keeps the diff focused on genuine differences.' },
        { title: 'Compare sections, not whole files', text: 'The comparison is line-based, so two very large and almost entirely different texts are expensive to align. If you hit the size limit, compare the relevant sections instead.' },
        { title: 'Watch for invisible changes', text: 'A line that looks identical but is reported as changed usually differs by a trailing space, a tab instead of spaces, or a different line ending. Windows CRLF and Unix LF endings are normalised automatically, so those never show up as false differences.' },
      ],
    },
    faqs: [
      { question: 'What is the difference between this and JSON Diff?', answer: 'This tool compares text literally, line by line, so formatting and ordering count as differences. JSON Diff parses both sides first and compares the resulting structure, so reindenting or reordering keys is not reported as a change. Use this one for plain text and JSON Diff for JSON documents.' },
      { question: 'Does it compare word by word or line by line?', answer: 'Line by line. A line that changed anywhere within it is shown as a removed line followed by an added line, so you can see the before and the after in full.' },
      { question: 'Are Windows and Unix line endings treated as differences?', answer: 'No. CRLF and LF endings are normalised before comparing, so a file saved on Windows and the same file saved on Linux will not show every line as changed.' },
      { question: 'Is there a size limit?', answer: 'Matching lines at the start and end of both texts are handled cheaply, so a small change inside a long file is fast. Only the differing middle is aligned with a full comparison, and if that middle is very large on both sides the tool tells you to compare smaller sections rather than freezing the page.' },
      { question: 'Is my text private?', answer: 'Yes. Both texts are compared entirely in your browser and are never uploaded or stored.' },
    ],
  },

  'json-validator': {
    intro: {
      heading: 'Validate JSON and Find the Exact Error',
      paragraphs: [
        'JSON has a deliberately small grammar, and parsers enforce it strictly. There is no tolerance for a trailing comma, a single-quoted string, an unquoted key, or a stray comment — any one of them makes the whole document unparseable, and the error a parser reports often points at the character where it gave up rather than the character you actually mistyped. A validator closes that gap: it checks the document against the JSON grammar and tells you the line and column where the structure first stopped making sense.',
        'Validation is worth doing before the data reaches anything expensive. A malformed payload that reaches your API becomes a 500 with a stack trace; the same payload checked in the browser is a five-second fix. It is also the fastest way to settle an argument about whose side a bug is on — if the response does not parse, the problem is upstream of your code.',
        'Note the difference between syntax and schema. This tool answers "is this valid JSON?", not "does this JSON have the fields my application expects?". A document can be perfectly valid and still be wrong for your use case; for that second question use the JSON Schema Generator to describe the shape you expect, then validate against it.',
        'Everything is parsed in your browser. Nothing is uploaded, so you can safely check payloads containing tokens or customer data.',
      ],
    },
    steps: {
      heading: 'How to Validate JSON',
      items: [
        'Paste the JSON you want to check into the editor.',
        'The document is parsed as you type — valid JSON is confirmed immediately.',
        'If it is invalid, read the reported position and the message describing what the parser expected there.',
        'Look slightly before the reported position: an unclosed bracket or a missing comma is usually a few characters earlier than where the parser noticed.',
        'Fix the problem, confirm the document validates, then copy the clean JSON out.',
      ],
    },
    example: {
      heading: 'A Document That Fails and Why',
      description: 'The trailing comma after the last property is legal in JavaScript but not in JSON, so the parser stops at the closing brace.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n}',
      output: 'Unexpected token } in JSON at position 29\n\nThe comma after "Ada" promises another\nkey/value pair that never arrives.',
      inputLabel: 'Invalid JSON',
      outputLabel: 'Error',
    },
    tips: {
      heading: 'What Usually Breaks',
      items: [
        { title: 'Trailing commas', text: 'JavaScript object literals allow a comma after the final entry; JSON does not. This is the single most common cause of an invalid document, especially in hand-edited config files.' },
        { title: 'The wrong kind of quote', text: 'JSON strings require double quotes. Single quotes, smart quotes pasted from a word processor, and backticks are all rejected. Keys must be quoted too, which trips up anyone used to writing JavaScript objects.' },
        { title: 'Comments', text: 'Standard JSON has no comment syntax. Dialects like JSON5 and JSONC add them, and some tools accept them, but a strict parser will not. Strip comments before validating, or convert the file to a format that supports them such as YAML or TOML.' },
        { title: 'An invisible byte order mark', text: 'A file saved as UTF-8 with BOM starts with bytes that are not whitespace and not an opening brace. The document looks perfect on screen and still fails to parse. Re-save the file as UTF-8 without BOM.' },
        { title: 'NaN, Infinity and undefined', text: 'These are JavaScript values with no JSON equivalent. A serializer that emits them produces output no conformant parser will read back. Represent them as null or as strings instead.' },
        { title: 'Duplicate keys', text: 'The specification does not forbid repeating a key, so most parsers accept it and silently keep the last occurrence. The document validates, and you quietly lose data — worth checking by eye when a value is mysteriously wrong.' },
      ],
    },
    faqs: [
      { question: 'Does valid JSON mean my data is correct?', answer: 'No. Validation checks grammar only. A document with every field misspelled, or with a string where your code expects a number, is still valid JSON. Use a JSON Schema to check the shape and types your application depends on.' },
      { question: 'Why does the error position look wrong?', answer: 'A parser reports where the document stopped being consistent, which is often after the real mistake. A bracket left unclosed near the top is only detected at the end of the file. Work backwards from the reported position to the last structure you are certain is complete.' },
      { question: 'Is a bare string or number valid JSON?', answer: 'Yes. Since RFC 7159 any JSON value may stand alone, so "hello", 42, true and null are all valid documents. Older parsers that predate that revision accept only an object or array at the top level.' },
      { question: 'Are comments ever allowed?', answer: 'Not in standard JSON. JSONC (used by VS Code settings) and JSON5 permit them, and some parsers accept them as an extension, but anything strictly conformant will reject a document containing them.' },
      { question: 'What about very large numbers?', answer: 'JSON numbers have no defined precision limit, but most parsers read them as IEEE 754 doubles, so integers beyond 2^53 lose precision silently. The document validates; the value is still wrong. Transmit large identifiers as strings.' },
      { question: 'Is my data private?', answer: 'Yes. Parsing happens entirely in your browser and nothing is uploaded or stored.' },
    ],
  },

  'character-counter': {
    intro: {
      heading: 'Count Characters, Words and Lines',
      paragraphs: [
        'Almost every text field you write into has a limit, and the limit is almost never where you would guess. A meta description that renders cleanly in search results, a post that fits a social platform, an SMS that stays one segment, a database column declared VARCHAR(255) — each counts something slightly different, and finding out after the fact usually means truncated text somewhere public.',
        'This tool counts characters with and without spaces, words, lines and paragraphs as you type, so you can see where you stand against whichever limit you are writing for. It is also useful in the other direction: checking that generated or imported text is not unexpectedly empty, padded, or full of line breaks you did not intend.',
        'Counting looks trivial and is not, once text stops being plain ASCII. An emoji, an accented letter typed as a combining pair, or a flag made of two regional indicators can each count as one thing to a reader and several to a program. The section below explains where those differences come from, because they are the reason two character counters can disagree about the same sentence.',
        'Your text stays in the browser. Nothing is uploaded, so drafts and private notes are safe to paste.',
      ],
    },
    steps: {
      heading: 'How to Count Text',
      items: [
        'Paste or type your text into the box.',
        'Read the counts, which update on every keystroke.',
        'Compare the with-spaces and without-spaces figures — different platforms count each way.',
        'Use the word and line counts to check structure, for example that an import really has the number of rows you expect.',
      ],
    },
    example: {
      heading: 'The Same Text, Different Counts',
      description: 'Spaces, line breaks and non-ASCII characters all change the answer, which is why the counts are reported separately.',
      input: 'Hello, world!\nIt is a fine day.',
      output: 'Characters (with spaces)    : 30\nCharacters (without spaces) : 24\nWords                       : 7\nLines                       : 2',
      inputLabel: 'Text',
      outputLabel: 'Counts',
    },
    tips: {
      heading: 'Limits Worth Knowing',
      items: [
        { title: 'Search result snippets', text: 'Google truncates by pixel width rather than character count, but roughly 50 to 60 characters for a title and 150 to 160 for a meta description is the practical ceiling on desktop. Mobile is shorter. Put the important words first so a truncation still reads sensibly.' },
        { title: 'SMS segments', text: 'A plain GSM-7 message fits 160 characters. Include a single character outside that alphabet — a curly apostrophe pasted from a word processor is the classic culprit — and the whole message switches to UCS-2, dropping the limit to 70 and often doubling the cost.' },
        { title: 'Database columns', text: 'VARCHAR(255) in MySQL counts characters, but the bytes behind them depend on the encoding: under utf8mb4 one character can take four bytes. An index or row-size limit expressed in bytes will be reached long before the character count is.' },
        { title: 'Emoji are not one character', text: 'To JavaScript, length counts UTF-16 code units. Most emoji are two, a flag is four, and an emoji with a skin-tone modifier or a family built from joiners can be far more. A field that allows 20 characters may accept only five emoji.' },
        { title: 'Accents can be written two ways', text: 'The letter e-acute exists both as a single code point and as a plain e followed by a combining accent. They look identical and count differently. Normalising text to NFC before measuring or storing it avoids counts that change depending on where the text was typed.' },
        { title: 'Trailing whitespace hides', text: 'A space or newline at the end of a pasted line is invisible but counted, and it is a frequent cause of a value failing an exact-match comparison. Comparing the with-spaces and without-spaces counts is a quick way to spot padding.' },
      ],
    },
    faqs: [
      { question: 'How is a word counted?', answer: 'A word is a run of characters separated by whitespace, which matches how most editors count. Hyphenated compounds count as one word and a number counts as a word, so the figure can differ slightly from a word processor using its own rules.' },
      { question: 'Why does my count differ from another tool?', answer: 'Usually because of what each tool does with line breaks, trailing whitespace, or characters outside ASCII. A counter working in UTF-16 code units will report more than one counting visible characters whenever emoji or combining accents are present.' },
      { question: 'Does it count an empty line?', answer: 'Yes. Lines are counted by line breaks, so a blank line between paragraphs is a line. This matters when you are checking the row count of pasted data.' },
      { question: 'Can I count a whole document?', answer: 'Yes — paste as much as you like. Everything is counted locally, so size is limited only by your browser rather than by an upload limit.' },
      { question: 'Is my text private?', answer: 'Yes. The text never leaves your browser; there is no upload and nothing is stored.' },
    ],
  },

  'json-to-csharp': {
    intro: {
      heading: 'Convert JSON to C# Classes',
      paragraphs: [
        'Consuming a JSON API in C# means having a type to deserialize into. Writing that type by hand for a response with thirty fields and three levels of nesting is slow, and the mistakes it produces are quiet ones: a property spelled slightly differently simply arrives as null at runtime, with no compiler error to warn you. This tool reads your JSON and generates the matching class hierarchy, so the names and types line up with the payload from the start.',
        'Nested objects become their own named classes, arrays become List<T> of the element type, and values are mapped to the closest C# type — string, int, double, bool. Where the JSON uses names that are not valid C# identifiers, or uses camelCase where your codebase uses PascalCase, you get properties named the C# way with the original key preserved for the serializer.',
        'Which serializer you are targeting changes a few details. System.Text.Json ships with .NET and is the default for new projects; Newtonsoft.Json is still extremely common in existing code and is more forgiving about loose typing. The generated classes work with both, but the attribute you reach for and the behaviour around nulls and casing differ, which the notes below cover.',
        'Generation happens entirely in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to C#',
      items: [
        'Paste a representative JSON response into the input box. Use a sample with every optional field populated, so nothing is inferred as the wrong type.',
        'Set the root class name to something meaningful — it names the whole hierarchy.',
        'Generate the classes and read through the inferred types, paying attention to numbers and anything that came through as object.',
        'Copy the result into your project, one file per class or all together as nested types.',
        'Deserialize with JsonSerializer.Deserialize<Root>(json) for System.Text.Json, or JsonConvert.DeserializeObject<Root>(json) for Newtonsoft.',
      ],
    },
    example: {
      heading: 'JSON to a C# Class',
      description: 'Each key becomes a property with the matching type; the nested object becomes a class of its own.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: 'public class Root\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n    public Address Address { get; set; }\n}\n\npublic class Address\n{\n    public string City { get; set; }\n}',
      inputLabel: 'JSON',
      outputLabel: 'C#',
    },
    tips: {
      heading: 'Getting the Types Right',
      items: [
        { title: 'Match property names without renaming keys', text: 'C# convention is PascalCase; most JSON APIs send camelCase. Rather than naming properties after the JSON, keep C# naming and bridge the gap at the serializer: System.Text.Json takes PropertyNamingPolicy = JsonNamingPolicy.CamelCase globally, or [JsonPropertyName("someKey")] per property. Newtonsoft uses [JsonProperty("someKey")] or a CamelCasePropertyNamesContractResolver.' },
        { title: 'Integers larger than int', text: 'A sample containing a small id infers int, and the type holds until production sends an identifier above 2.1 billion — then deserialization throws. Database ids, timestamps in milliseconds and anything snowflake-shaped should be long, or string if the source system treats them as opaque.' },
        { title: 'Money should not be double', text: 'Inferring double from 19.99 is correct about the shape and wrong about the intent. Binary floating point cannot represent most decimal fractions exactly, so sums drift. Change monetary fields to decimal by hand after generating.' },
        { title: 'Nullable reference types', text: 'In a project with nullable reference types enabled, generated string properties produce a warning because nothing guarantees the JSON supplies them. Mark genuinely optional fields as string? and required ones with the required modifier, so the compiler enforces what the API actually promises.' },
        { title: 'Dates arrive as strings', text: 'JSON has no date type. An ISO 8601 string deserializes into DateTime or DateTimeOffset automatically with both serializers; prefer DateTimeOffset when the payload carries an offset, since DateTime silently discards it. A Unix timestamp needs a custom converter.' },
        { title: 'Fields that vary in type', text: 'If a key is sometimes a string and sometimes a number, no single property type fits. Use JsonElement (System.Text.Json) or JToken (Newtonsoft) to hold it, and branch on the value kind — attempting to force it into object loses the information you need to decide.' },
      ],
    },
    faqs: [
      { question: 'System.Text.Json or Newtonsoft.Json?', answer: 'System.Text.Json ships with .NET, is faster and allocates less, and is the right default for new code. Newtonsoft.Json is more permissive and has features System.Text.Json still lacks, such as broad TypeNameHandling and more flexible custom contracts, so it remains common in existing projects. The generated classes suit either.' },
      { question: 'Why is a property null after deserializing?', answer: 'Almost always a name mismatch. System.Text.Json is case-sensitive by default, so a PascalCase property will not bind to a camelCase key unless you set a naming policy or add [JsonPropertyName]. Setting PropertyNameCaseInsensitive = true is the quick fix.' },
      { question: 'Should I generate records instead of classes?', answer: 'Records suit payloads you only read, giving value equality and concise syntax, and both serializers support them. Classes with settable properties are easier when you mutate the object or when a framework needs a parameterless constructor.' },
      { question: 'How are arrays handled?', answer: 'An array becomes List<T> where T is inferred from the elements. An array of objects produces a named class for the element type. An empty array gives the generator nothing to infer from, so supply a sample with at least one element.' },
      { question: 'What happens to null values in the sample?', answer: 'A key whose only observed value is null carries no type information, so it is emitted as object. Find a sample where the field is populated, then set the type by hand.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation runs entirely in your browser and nothing is uploaded.' },
    ],
  },

  'json-to-typescript': {
    intro: {
      heading: 'Convert JSON to TypeScript Interfaces',
      paragraphs: [
        'TypeScript can only help you with data it knows the shape of. Fetch a JSON response without a type and everything downstream is any, which removes exactly the protection you adopted TypeScript for. Writing the interface by hand is the fix, and for a large response it is also the part everyone skips. This tool reads your JSON and produces the matching interfaces, nested types included.',
        'Objects become interfaces, arrays become typed arrays, and primitives map to string, number and boolean. Nested objects are extracted into their own named interfaces rather than inlined, so you can reference an inner type directly instead of digging through index access types.',
        'There is one thing worth being clear about before you rely on the result. TypeScript types are erased at compile time: an interface describes what you believe the server sends, and nothing checks that belief at runtime. If the API changes a field from a number to a string, your code keeps compiling and fails somewhere far from the cause. The notes below cover when that matters and what to do about it.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to TypeScript',
      items: [
        'Paste a representative JSON sample into the input box, ideally one where every optional field is present.',
        'Set the root interface name — the nested interfaces are named from it and from the keys.',
        'Generate the interfaces and review the inferred types, especially arrays and anything that came out as any.',
        'Copy the result into a .ts file, or into a types.ts shared across your API layer.',
        'Mark genuinely optional fields with ? and tighten any unions by hand, since a single sample cannot show you which fields may be absent.',
      ],
    },
    example: {
      heading: 'JSON to a TypeScript Interface',
      description: 'The nested object is extracted into its own interface so it can be referenced on its own.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "tags": ["admin"],\n  "address": { "city": "London" }\n}',
      output: 'interface Address {\n  city: string;\n}\n\ninterface Root {\n  id: number;\n  name: string;\n  tags: string[];\n  address: Address;\n}',
      inputLabel: 'JSON',
      outputLabel: 'TypeScript',
    },
    tips: {
      heading: 'Making the Types Trustworthy',
      items: [
        { title: 'Types do not validate at runtime', text: 'An interface is a compile-time claim and disappears from the emitted JavaScript. Nothing stops a response that contradicts it. For data crossing a network boundary, pair the generated interface with a runtime validator such as Zod or Valibot and parse at the edge — then everything inside your application really is the type it says it is.' },
        { title: 'Optional is not the same as nullable', text: 'A field that may be missing is name?: string; a field always present but sometimes empty is name: string | null. They are different, and conflating them produces undefined where your code checked for null. One JSON sample cannot tell them apart, so this is the first thing to fix by hand.' },
        { title: 'Mixed arrays need a union', text: 'An array containing both numbers and strings infers as (string | number)[] at best and any[] at worst. If the array really is heterogeneous, write the union explicitly; if the mixture was an accident in your sample, fix the sample.' },
        { title: 'Large integers lose precision', text: 'JSON.parse reads numbers as IEEE 754 doubles, so an id beyond 2^53 is silently rounded before your type ever sees it. Typing it as number hides the problem. Ask the API for such identifiers as strings, or parse with a library that preserves them as BigInt.' },
        { title: 'Prefer unknown over any for gaps', text: 'Where the generator cannot infer a type, any switches off checking for everything that touches the value. unknown keeps it honest: the compiler forces you to narrow before use, which turns a silent hole into a deliberate decision.' },
        { title: 'Interface or type alias', text: 'For object shapes the two are nearly interchangeable. Interfaces support declaration merging and give cleaner error messages for extended shapes; type aliases are needed for unions, intersections and mapped types. Generated output uses interfaces because API payloads are plain object shapes.' },
      ],
    },
    faqs: [
      { question: 'Will these types catch a breaking API change?', answer: 'No, not on their own. TypeScript checks your code against the type you wrote, not the server against it. If the API changes, the code still compiles and fails at runtime. Validate the response with a schema library at the boundary if that risk matters.' },
      { question: 'How do I mark optional fields?', answer: 'Add ? after the property name. A single JSON sample cannot reveal optionality, so the generator assumes every observed key is always present; compare a few responses, or read the API documentation, and mark the rest.' },
      { question: 'Why did a field come out as any?', answer: 'Because the sample gave nothing to infer from — usually a null value or an empty array. Find a sample where the field is populated, or narrow the type by hand; prefer unknown to any if you genuinely do not know.' },
      { question: 'Should I use interface or type?', answer: 'Either works for object shapes. Interfaces merge across declarations and often produce more readable errors; type aliases are required for unions and mapped types. Pick one and apply it consistently across the codebase.' },
      { question: 'Can I generate types for a whole API at once?', answer: 'This tool converts one JSON document at a time. If the API publishes an OpenAPI or JSON Schema description, generating from that is better: it carries optionality, formats and enums that no single example response can show.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
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
        'Go gives you no way to read JSON loosely without paying for it later. You either decode into map[string]any and type-assert at every use, or you define a struct that mirrors the payload. The struct is the right answer and also the tedious one, because every field needs a name, a type and a tag. This tool reads your JSON and writes those structs for you.',
        'Nested objects become separate named structs rather than anonymous inline ones, arrays become slices of the element type, and values map to string, int, float64 and bool. Field names are exported so encoding/json can see them, and each carries a json tag preserving the original key — without the tag, Go would look for a capitalised key that the API does not send.',
        'The generated types are a starting point that is correct about shape and conservative about meaning. The notes below cover the four decisions a sample cannot make for you: which fields are genuinely optional, how big the numbers get, what to do with timestamps, and how to survive a field whose type varies.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Go',
      items: [
        'Paste a representative JSON response into the input box.',
        'Set the root struct name; nested structs are named from it and from the keys.',
        'Generate the structs and read the inferred types, particularly numbers and anything that came out as any.',
        'Copy them into your package and decode with json.Unmarshal(data, &root).',
        'Add omitempty, pointers or custom types where the notes below apply.',
      ],
    },
    example: {
      heading: 'JSON to a Go Struct',
      description: 'Exported fields with json tags, and a named struct for the nested object.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: 'type Root struct {\n\tID      int     `json:"id"`\n\tName    string  `json:"name"`\n\tAddress Address `json:"address"`\n}\n\ntype Address struct {\n\tCity string `json:"city"`\n}',
      inputLabel: 'JSON',
      outputLabel: 'Go',
    },
    tips: {
      heading: 'Decisions the Sample Cannot Make',
      items: [
        { title: 'Absent and zero look the same', text: 'Unmarshal leaves a missing field at its zero value, so a missing count and a count of 0 are indistinguishable, as are a missing flag and false. When that distinction matters, make the field a pointer — *int, *bool — and check for nil. The cost is a dereference at every use, so apply it only where it earns its keep.' },
        { title: 'omitempty is about encoding, not decoding', text: 'Adding omitempty changes what Marshal writes out; it has no effect on reading. It also treats every zero value as empty, so a legitimate 0 or false disappears from the output. Combine it with a pointer when you need to send an explicit zero.' },
        { title: 'int is platform-sized, ids are not', text: 'A sample with a small id infers int. That is 64-bit on most builds and 32-bit on some, and either way it is a guess. Use int64 for database identifiers and millisecond timestamps, and string for identifiers the source treats as opaque, which also sidesteps precision loss.' },
        { title: 'Timestamps need the right type', text: 'encoding/json unmarshals an RFC 3339 string straight into time.Time, which covers most APIs. Any other layout — a Unix epoch, a date without a timezone — needs a named type with its own UnmarshalJSON. Decoding it into string and parsing later works but spreads the format knowledge across your code.' },
        { title: 'Keep what you do not model', text: 'A field whose shape varies, or one you want to forward untouched, fits json.RawMessage: it holds the original bytes and defers the decision. Decoding it into any gives you map[string]any and float64 for every number, which is almost always worse.' },
        { title: 'Unknown fields are silently dropped', text: 'By default Unmarshal ignores keys with no matching field, which is forgiving in production and unhelpful in tests. A json.Decoder with DisallowUnknownFields turns a drifting API into a visible error, which is worth enabling where you control both ends.' },
      ],
    },
    faqs: [
      { question: 'Why does my field stay empty after unmarshalling?', answer: 'Either the field is unexported — encoding/json can only set capitalised fields — or the json tag does not match the key. Matching is case-insensitive as a fallback, but an explicit tag is the only reliable answer.' },
      { question: 'Should I use pointers for every optional field?', answer: 'No. Pointers earn their place only where you must tell absent from zero. Everywhere else they add nil checks and allocations for no benefit, and a zero value is the clearer default.' },
      { question: 'How are arrays of objects handled?', answer: 'They become a slice of a named struct generated from the element shape. An empty array gives nothing to infer from, so include at least one populated element in your sample.' },
      { question: 'What about numbers that are sometimes decimal?', answer: 'If a key is 1 in one response and 1.5 in another, int will fail on the second. Use float64, or json.Number when you need the exact text — for money, decode as a string and use a decimal library.' },
      { question: 'Can I generate structs for a streaming API?', answer: 'Yes. The struct is the same whether you use json.Unmarshal on a complete document or json.Decoder over a stream of newline-delimited objects; only the reading loop differs.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'json-to-python': {
    intro: {
      heading: 'Convert JSON to Python Classes',
      paragraphs: [
        'json.loads gives you dictionaries, and dictionaries work until the codebase grows. Then a typo in a key becomes a KeyError three modules away, your editor cannot complete a field name, and nothing tells you when the API drops a field you depend on. Defining classes that mirror the payload fixes all three. This tool generates them from a JSON sample.',
        'Nested objects become their own classes, arrays become typed lists, and values map to str, int, float and bool. Because Python type hints are not enforced at runtime, the class you get is documentation the tooling can read — useful to mypy, pyright and your editor, and invisible to the interpreter.',
        'Which flavour of class you want depends on how much you need at runtime. A dataclass is plain and fast; a TypedDict keeps the data as a dict while typing its keys; a pydantic model actually validates and coerces incoming data. The notes below cover when each is the right call, along with the conversions a JSON sample cannot describe.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Python',
      items: [
        'Paste a representative JSON response into the input box.',
        'Set the root class name; nested classes are named from the keys.',
        'Generate the classes and review the inferred types, especially anything that came out as Any.',
        'Copy them into a module and build instances with Root(**data), or switch to pydantic if you want the data validated.',
        'Mark optional fields with Optional[...] and tighten types the sample could not reveal.',
      ],
    },
    example: {
      heading: 'JSON to a Python Dataclass',
      description: 'Each key becomes an annotated attribute; the nested object becomes its own dataclass.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: '@dataclass\nclass Address:\n    city: str\n\n@dataclass\nclass Root:\n    id: int\n    name: str\n    address: Address',
      inputLabel: 'JSON',
      outputLabel: 'Python',
    },
    tips: {
      heading: 'Choosing the Right Shape',
      items: [
        { title: 'dataclass, TypedDict or pydantic', text: 'A dataclass gives you real objects with attribute access and almost no overhead — the default choice for internal data. A TypedDict types a plain dict, so it costs nothing at runtime and suits data you pass straight to something else. A pydantic model is the only one of the three that checks and coerces at runtime, which is what you want at the edge where untrusted JSON arrives.' },
        { title: 'Type hints do not validate', text: 'Annotating a field as int does not stop a str being assigned to it. Root(**data) will happily build an object whose types contradict every annotation, and the failure surfaces much later. If the JSON comes from outside your process, validate it — pydantic, attrs with validators, or an explicit check.' },
        { title: 'Nested objects are not converted for you', text: 'Root(**data) assigns the inner dict to the address attribute as a dict, not as an Address. Attribute access then fails in a confusing way. Write a from_dict classmethod that constructs children explicitly, or use pydantic, which recurses automatically.' },
        { title: 'JSON keys are not always valid identifiers', text: 'Keys like class, from or user-id cannot be attribute names. Rename them and map back: a dataclass needs the conversion in from_dict, while pydantic handles it with Field(alias="from") plus populate_by_name.' },
        { title: 'Floats are wrong for money', text: 'A sample with 19.99 infers float, and binary floating point cannot hold that value exactly, so totals drift by cents. Use decimal.Decimal for monetary amounts and parse from the string form — passing a float into Decimal carries the error in with it.' },
        { title: 'Dates arrive as strings', text: 'JSON has no date type. datetime.fromisoformat handles most ISO 8601 input on modern Python, and pydantic converts it for you if the field is annotated datetime. A plain dataclass leaves it as a str until you convert it yourself.' },
      ],
    },
    faqs: [
      { question: 'Will the generated classes validate my data?', answer: 'Not by themselves. Dataclasses and TypedDicts are hints for your type checker and editor; nothing is enforced while the program runs. Use pydantic when the data crosses a trust boundary and must be checked.' },
      { question: 'How do I mark a field as optional?', answer: 'Annotate it Optional[str] — or str | None on Python 3.10 and later — and give it a default of None so the constructor does not require it. A single sample cannot show which fields may be absent, so this is a manual pass.' },
      { question: 'Why is a nested field a dict instead of a class?', answer: 'Because **data only assigns the top level. Add a from_dict classmethod that builds the nested classes, or use pydantic, which constructs them recursively.' },
      { question: 'Should keys be converted to snake_case?', answer: 'Attribute names should follow Python convention, but the mapping back to the original key has to live somewhere — an alias in pydantic, or the conversion in your own from_dict. Renaming without that mapping silently breaks deserialization.' },
      { question: 'What about very large integers?', answer: 'Python integers are arbitrary precision, so a large id survives json.loads intact — one of the few languages where this is not a problem. The risk returns the moment that value is sent on to a system backed by 64-bit integers or JavaScript.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'json-to-java': {
    intro: {
      heading: 'Convert JSON to Java Classes',
      paragraphs: [
        'Deserializing JSON in Java means handing Jackson or Gson a class to map onto. Writing that class for a large response is mechanical work with a sharp edge: a property named slightly wrong does not fail to compile, it simply arrives null, and you find out in production. This tool generates the class hierarchy from your JSON so the names and types match the payload from the start.',
        'Nested objects become their own classes, arrays become List<T>, and values map to String, int, double and boolean. Getters and setters keep the classes usable by any mapper and by frameworks that expect JavaBeans conventions.',
        'The notes below cover the choices a sample cannot make: when to prefer the boxed Integer over int, how to let names differ between JSON and Java, why BigDecimal matters for money, and how to stop an evolving API from breaking your deserializer.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Java',
      items: [
        'Paste a representative JSON response into the input box.',
        'Set the root class name; nested classes are named from the keys.',
        'Generate the classes and review the inferred types, particularly numbers.',
        'Copy each class into its own file in your package.',
        'Deserialize with new ObjectMapper().readValue(json, Root.class) for Jackson, or new Gson().fromJson(json, Root.class) for Gson.',
      ],
    },
    example: {
      heading: 'JSON to a Java Class',
      description: 'Fields with accessors, and a separate class for the nested object.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: 'public class Root {\n    private int id;\n    private String name;\n    private Address address;\n\n    public int getId() { return id; }\n    public void setId(int id) { this.id = id; }\n    // ...\n}\n\npublic class Address {\n    private String city;\n    // ...\n}',
      inputLabel: 'JSON',
      outputLabel: 'Java',
    },
    tips: {
      heading: 'Getting the Details Right',
      items: [
        { title: 'int cannot be absent', text: 'A primitive int defaults to 0 when the key is missing, so you cannot tell an absent value from a real zero. Use the boxed Integer, Long or Boolean for anything genuinely optional and check for null. Keep primitives for fields the API always sends.' },
        { title: 'Let the names differ', text: 'JSON keys are often snake_case while Java wants camelCase. Rather than deforming your field names, annotate: Jackson takes @JsonProperty("user_name") per field or a PropertyNamingStrategies.SNAKE_CASE on the mapper; Gson uses @SerializedName or a FieldNamingPolicy.' },
        { title: 'Tolerate unknown fields', text: 'Jackson throws UnrecognizedPropertyException by default, so the day the API adds a field, your deserializer fails on data that is perfectly fine. Annotate classes with @JsonIgnoreProperties(ignoreUnknown = true), or disable FAIL_ON_UNKNOWN_PROPERTIES on the mapper.' },
        { title: 'BigDecimal for money', text: 'double is the natural inference for 19.99 and the wrong type for currency, because binary floating point cannot represent most decimal fractions. Use BigDecimal and let Jackson read it straight from the JSON number; converting via double first reintroduces the error you were avoiding.' },
        { title: 'Records for read-only payloads', text: 'From Java 16, a record expresses an immutable payload in one line per field and Jackson supports it directly. Use records for responses you only read; keep mutable classes where a framework needs a no-arg constructor and setters.' },
        { title: 'Dates need a format', text: 'Jackson maps an ISO 8601 string onto Instant or OffsetDateTime once jackson-datatype-jsr310 is registered. Anything else — a custom layout, an epoch in milliseconds — needs @JsonFormat or a custom deserializer. Prefer OffsetDateTime when the payload carries an offset so it is not discarded.' },
      ],
    },
    faqs: [
      { question: 'Jackson or Gson?', answer: 'Jackson is the default in the Spring ecosystem, has broader annotation support and handles streaming well. Gson is smaller and simpler, which suits Android and lightweight tools. The generated classes work with either.' },
      { question: 'Do I need getters and setters?', answer: 'Jackson can read private fields directly if configured to, but accessors are the convention and are what frameworks expect. Lombok with @Data removes the boilerplate without changing the result.' },
      { question: 'Why is a field null after deserializing?', answer: 'The JSON key did not match the Java property. Check for a case or naming-style difference and add @JsonProperty or @SerializedName to state the mapping explicitly.' },
      { question: 'How are arrays handled?', answer: 'As List<T> with the element type inferred from the contents. An array of objects produces a named class for its elements; an empty array leaves nothing to infer, so include a populated element.' },
      { question: 'What about a field whose type varies?', answer: 'Deserialize it as JsonNode (Jackson) or JsonElement (Gson) and branch on the actual type. Mapping it to Object loses the information you need to tell the cases apart.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'json-schema-generator': {
    intro: {
      heading: 'Generate a JSON Schema from JSON',
      paragraphs: [
        'JSON Schema describes the shape of your data — which fields exist, their types, and which are required — so you can validate real data against a contract and catch bad payloads early. Writing a schema by hand is tedious; this tool infers one from a JSON sample automatically.',
        'Paste any JSON and get a draft-07 JSON Schema with types (string, integer, number, boolean, array, object, null), nested object schemas, array item schemas, and a required list. Use it as a starting point and tighten constraints (formats, min/max, enums) as needed.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Generate a JSON Schema',
      items: [
        'Paste a representative JSON sample into the input.',
        'Click Generate JSON Schema.',
        'Review the draft-07 schema with inferred types and required fields.',
        'Copy or download it, then refine constraints (formats, enums, min/max) for your needs.',
      ],
    },
    example: {
      heading: 'JSON to JSON Schema',
      description: 'Each field is typed, and present keys are marked required.',
      input: '{ "id": 1, "name": "Ada" }',
      output: '{\n  "type": "object",\n  "properties": {\n    "id": { "type": "integer" },\n    "name": { "type": "string" }\n  },\n  "required": ["id", "name"]\n}',
      inputLabel: 'JSON',
      outputLabel: 'Schema',
    },
    faqs: [
      { question: 'Which JSON Schema version does it produce?', answer: 'It generates a draft-07 schema, the most widely supported version across validators.' },
      { question: 'Does it detect required fields?', answer: 'Yes. Every key present in the sample is added to the required array; remove any that should be optional.' },
      { question: 'How are nested objects and arrays handled?', answer: 'Nested objects get their own schema, and arrays get an items schema inferred from the first element.' },
      { question: 'Is my data private?', answer: 'Yes — the schema is generated entirely in your browser.' },
    ],
  },

  'jsonpath-tester': {
    intro: {
      heading: 'Test JSONPath Expressions Online',
      paragraphs: [
        'JSONPath is a query language for JSON — like XPath for XML. It lets you select values deep inside a document with a compact expression, which is invaluable for extracting fields, filtering arrays, and configuring integrations that use JSONPath.',
        'This tester evaluates your JSONPath against your JSON and shows every match instantly, so you can build and debug expressions without writing code. It supports the common JSONPath syntax including wildcards, recursive descent, array slices, and filters.',
        'All evaluation happens in your browser; your data is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Use the JSONPath Tester',
      items: [
        'Paste your JSON into the input.',
        'Enter a JSONPath expression, e.g. $.store.books[*].title.',
        'Click Evaluate JSONPath to see the matching values.',
        'Refine the expression until it selects exactly what you need.',
      ],
    },
    tips: {
      heading: 'Handy JSONPath Syntax',
      items: [
        { title: '$', text: 'The root of the document.' },
        { title: '.key / [\'key\']', text: 'Select a child property by name.' },
        { title: '[*]', text: 'All elements of an array (wildcard).' },
        { title: '..key', text: 'Recursive descent — find key at any depth.' },
        { title: '[0], [-1:]', text: 'Index or slice into an array.' },
        { title: '[?(@.price<20)]', text: 'Filter by a condition on each element.' },
      ],
    },
    faqs: [
      { question: 'What is JSONPath used for?', answer: 'It selects and extracts values from JSON with a concise expression — used in tooling, APIs, log processing, and integration platforms.' },
      { question: 'What syntax is supported?', answer: 'Common JSONPath: root ($), child access, wildcards ([*]), recursive descent (..), array slices, and filter expressions.' },
      { question: 'Why do I get an empty result?', answer: 'The path matched nothing. Check spelling, array wildcards ([*]), and that the structure matches your expression.' },
      { question: 'Is my data private?', answer: 'Yes — evaluation runs entirely in your browser.' },
    ],
  },

  'json-to-rust': {
    intro: {
      heading: 'Convert JSON to Rust Structs',
      paragraphs: [
        'Rust will not let you be vague about the shape of your data, which is the point. Deserializing JSON means declaring a struct and deriving serde on it, and the compiler then holds you to it. The work is writing the struct, and for a response of any size that is a lot of typing with no interesting decisions in it. This tool does that part.',
        'Objects become structs with #[derive(Serialize, Deserialize)], arrays become Vec<T>, and values map to String, i64, f64 and bool. Nested objects get their own named structs, so you can pass an inner type around on its own.',
        'serde is unusually strict compared with the JSON libraries of most languages, and that strictness surfaces as compile-time and deserialize-time errors rather than silent nulls. The notes below cover the attributes that absorb the mismatch between how JSON is written and how Rust wants to read it.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Rust',
      items: [
        'Paste a representative JSON response into the input box.',
        'Set the root struct name; nested structs are named from the keys.',
        'Generate the structs and review the inferred types, especially integer widths.',
        'Add serde to your crate with cargo add serde --features derive and cargo add serde_json.',
        'Deserialize with serde_json::from_str::<Root>(&body)?, then add the attributes below where the payload needs them.',
      ],
    },
    example: {
      heading: 'JSON to a Rust Struct',
      description: 'A derive on each struct is all serde needs; the nested object becomes its own type.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: '#[derive(Serialize, Deserialize)]\nstruct Root {\n    id: i64,\n    name: String,\n    address: Address,\n}\n\n#[derive(Serialize, Deserialize)]\nstruct Address {\n    city: String,\n}',
      inputLabel: 'JSON',
      outputLabel: 'Rust',
    },
    tips: {
      heading: 'The serde Attributes That Matter',
      items: [
        { title: 'Rename instead of renaming', text: 'Rust fields are snake_case; plenty of APIs send camelCase. #[serde(rename_all = "camelCase")] on the struct handles the whole thing at once, and #[serde(rename = "someKey")] covers a single awkward field. This is also how you deal with keys that are Rust keywords, such as type or match.' },
        { title: 'Missing fields are an error by default', text: 'Unlike most languages, serde fails deserialization when a field has no value rather than filling in a default. Use Option<T> for genuinely optional fields, or #[serde(default)] to fall back to Default::default(). This strictness is a feature — it catches an API change immediately rather than at the point of use.' },
        { title: 'Option<T> and null are the same thing', text: 'serde maps both an absent key and an explicit null onto None, so Option alone cannot tell them apart. When that distinction is meaningful, the usual pattern is Option<Option<T>> with #[serde(default, deserialize_with = ...)], which is as awkward as it sounds — worth doing only where the API really uses null as a signal.' },
        { title: 'Unknown fields are ignored unless you say otherwise', text: 'Extra keys are skipped quietly, which is the right default for a public API you do not control. Add #[serde(deny_unknown_fields)] when you own both ends and want drift to show up as an error.' },
        { title: 'Integer width is a real choice', text: 'A sample with a small id infers something narrow, and serde will refuse to deserialize a value that does not fit — an out-of-range error rather than a silent wrap, which is better but still a failure. Use i64 for identifiers and epoch milliseconds, and u64 only when the source genuinely cannot be negative.' },
        { title: 'Keep what you cannot type', text: 'A field whose shape varies fits serde_json::Value, which holds any JSON and defers the decision. For a field that is one of a few known shapes, an enum with #[serde(untagged)] is better: serde tries each variant in order and you keep the type safety.' },
      ],
    },
    faqs: [
      { question: 'Why does deserialization fail with "missing field"?', answer: 'Because serde requires every field unless told otherwise. Make the field Option<T> if it can be absent, or add #[serde(default)] to supply a default. This is the single most common surprise when coming to serde from a more permissive language.' },
      { question: 'Do I need both Serialize and Deserialize?', answer: 'Only what you use. Deriving Deserialize alone is enough to read JSON; add Serialize when you also write it. Deriving both costs nothing at runtime and keeps the type usable in either direction.' },
      { question: 'How do I handle dates?', answer: 'serde has no date type of its own. Enable the serde feature on chrono or time and annotate the field as DateTime<Utc> or OffsetDateTime; for a non-standard format use #[serde(with = "...")] pointing at a module that parses it.' },
      { question: 'What about borrowed strings?', answer: 'Deserializing into &str avoids an allocation but ties the struct to the lifetime of the input buffer, which makes it awkward to return from a function. Use String unless profiling shows the allocation matters.' },
      { question: 'Can I generate enums from JSON?', answer: 'Not from a single sample — one example cannot show the full set of variants. Generate the struct first, then replace a string field with an enum once you know the possible values, using #[serde(rename_all = "lowercase")] to match the wire format.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'json-to-kotlin': {
    intro: {
      heading: 'Convert JSON to Kotlin Data Classes',
      paragraphs: [
        'A Kotlin data class is close to the ideal shape for a JSON payload: one line per field, equality and copying for free, and nullability in the type system rather than in your head. The only tedious part is writing it out for a response with thirty keys. This tool generates the data classes from a JSON sample.',
        'Objects become data classes, arrays become List<T>, and values map to String, Int, Double and Boolean. Nested objects get their own data classes so each level can be referenced on its own.',
        'Kotlin gives you something most languages do not: the compiler can enforce which fields may be null, provided you tell it the truth. A JSON sample cannot, so the generated types start out non-null and the notes below cover how to correct them — along with the differences between kotlinx.serialization, Moshi and Gson, which matter more here than in most ecosystems.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to Kotlin',
      items: [
        'Paste a representative JSON response into the input box.',
        'Set the root class name; nested classes are named from the keys.',
        'Generate the data classes and review the inferred types.',
        'Add @Serializable and the kotlinx.serialization plugin, or annotate for Moshi or Gson if that is what your project uses.',
        'Mark optional fields nullable with ? and give them defaults, then decode with Json.decodeFromString<Root>(body).',
      ],
    },
    example: {
      heading: 'JSON to a Kotlin Data Class',
      description: 'One line per property, and a separate data class for the nested object.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: '@Serializable\ndata class Root(\n    val id: Int,\n    val name: String,\n    val address: Address\n)\n\n@Serializable\ndata class Address(\n    val city: String\n)',
      inputLabel: 'JSON',
      outputLabel: 'Kotlin',
    },
    tips: {
      heading: 'Nullability and Library Differences',
      items: [
        { title: 'Tell the truth about null', text: 'Kotlin null-safety only protects you if the types are honest. Declaring a field String when the API sometimes omits it does not prevent the null — it just moves the failure to a confusing place, or in Gson’s case lets a null sit inside a non-null type where the compiler believes it cannot be. Mark anything genuinely optional as String?.' },
        { title: 'Defaults need the right setting', text: 'Giving a property a default lets kotlinx.serialization fill it in when the key is absent. Note that it will not re-emit a value equal to the default when encoding unless you set encodeDefaults = true, which surprises people whose outgoing payloads lose fields.' },
        { title: 'Gson can break null-safety', text: 'Gson constructs objects by reflection, bypassing Kotlin constructors and the null checks in them, so a missing key can leave a non-null String holding null and the crash happens later at an unrelated line. kotlinx.serialization and Moshi both respect Kotlin types; prefer them in new Kotlin code.' },
        { title: 'Rename rather than rewrite', text: 'Use @SerialName("user_name") with kotlinx.serialization or @Json(name = "user_name") with Moshi to keep idiomatic Kotlin property names while matching the wire format. A global naming strategy is also available, but per-property annotations survive refactoring more predictably.' },
        { title: 'Unknown keys are a hard error', text: 'kotlinx.serialization throws when the payload carries a key the class does not declare. For an API you do not control, configure Json { ignoreUnknownKeys = true } — otherwise a harmless additive change on the server breaks your client.' },
        { title: 'Int versus Long for identifiers', text: 'A sample id of 1 infers Int, which overflows above about 2.1 billion. Database identifiers and millisecond timestamps should be Long; identifiers the server treats as opaque are safest as String.' },
      ],
    },
    faqs: [
      { question: 'kotlinx.serialization, Moshi or Gson?', answer: 'kotlinx.serialization is the Kotlin-native option, compile-time generated and reflection-free, and it understands defaults and nullability properly. Moshi is a solid choice on Android, especially with its Kotlin codegen. Gson is widely used in older projects but does not respect Kotlin null-safety.' },
      { question: 'Why is a non-null property null at runtime?', answer: 'Almost always Gson, which builds objects reflectively and skips the constructor checks. Switch to kotlinx.serialization or Moshi with codegen, or mark the property nullable and handle it honestly.' },
      { question: 'How do I make a field optional?', answer: 'Make it nullable with ? and give it a default of null, or give a non-null property a sensible default. Either lets decoding succeed when the key is absent; nullable also allows an explicit null in the payload.' },
      { question: 'Do data classes work with nested objects?', answer: 'Yes. Each nested object becomes its own @Serializable data class and the parent references it by type; decoding builds the whole tree in one call.' },
      { question: 'What about dates?', answer: 'There is no built-in date type. Use kotlinx-datetime with Instant, or write a KSerializer for the format your API sends. Keeping the raw String and parsing at the point of use also works but scatters the format knowledge.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'json-to-php': {
    intro: {
      heading: 'Convert JSON to PHP Classes',
      paragraphs: [
        'json_decode is so convenient that most PHP code never gets past it. You get an associative array, you index into it, and the first thing anyone learns about the shape is the undefined-key warning in the log. Modern PHP has typed properties, constructor promotion and readonly, which make a class worth defining — your editor completes the fields, static analysis catches the typos, and the structure is written down somewhere.',
        'This tool turns a JSON sample into those classes. Objects become classes with typed properties, arrays become PHP arrays, and values map to int, float, string and bool. Nested objects become their own classes so each level is named.',
        'PHP has a couple of JSON-specific traps that other languages do not: arrays serve as both lists and maps, and integers overflow into floats silently. The notes below cover those along with the decisions a single sample cannot make.',
        'Everything runs in your browser — your JSON is never uploaded.',
      ],
    },
    steps: {
      heading: 'How to Convert JSON to PHP',
      items: [
        'Paste a representative JSON response into the input box.',
        'Set the root class name; nested classes are named from the keys.',
        'Generate the classes and review the inferred types.',
        'Copy them into your project, one class per file to suit PSR-4 autoloading.',
        'Decode with json_decode($body, true) and map the array onto your classes, or write a static fromArray method on each class.',
      ],
    },
    example: {
      heading: 'JSON to a PHP Class',
      description: 'Constructor property promotion keeps the class to the fields themselves.',
      input: '{\n  "id": 1,\n  "name": "Ada",\n  "address": { "city": "London" }\n}',
      output: 'class Root\n{\n    public function __construct(\n        public readonly int $id,\n        public readonly string $name,\n        public readonly Address $address,\n    ) {}\n}\n\nclass Address\n{\n    public function __construct(\n        public readonly string $city,\n    ) {}\n}',
      inputLabel: 'JSON',
      outputLabel: 'PHP',
    },
    tips: {
      heading: 'PHP-Specific Traps',
      items: [
        { title: 'Large integers turn into floats', text: 'json_decode converts any integer beyond PHP_INT_MAX into a float, losing precision without a warning — a 64-bit identifier can come back subtly wrong. Pass JSON_BIGINT_AS_STRING to keep such values as strings, and type the property string. This is the most damaging PHP-specific JSON bug and the easiest to miss.' },
        { title: 'Arrays are lists and maps at once', text: 'PHP has one array type for both, so json_encode decides by inspecting the keys: sequential integers from zero produce a JSON array, anything else an object. Unset an element from the middle of a list and the next encode silently emits an object instead. Use array_values() before encoding a list.' },
        { title: 'Associative or object decoding', text: 'json_decode($s, true) gives arrays; without the flag you get stdClass. Arrays are easier to iterate and test; objects read better with ->. Pick one per codebase — mixing them produces code that cannot decide how to access anything.' },
        { title: 'Arrays have no element type', text: 'PHP generics do not exist, so an array of Address objects is just array. Record the element type in a docblock as @var Address[] — Psalm, PHPStan and PhpStorm all read it, which is the only way static analysis can help you inside the loop.' },
        { title: 'Floats are wrong for money', text: 'Inferring float from 19.99 repeats the usual binary floating point problem, and PHP has no native decimal type. Store monetary amounts as integer minor units, or use a library such as brick/math, and keep the value a string on the wire.' },
        { title: 'Nullable and optional differ', text: 'A property typed ?string accepts null but is still required by the constructor. A field that may be absent entirely needs a default as well — ?string $middleName = null — otherwise building the object from a payload that omits it throws an ArgumentCountError.' },
      ],
    },
    faqs: [
      { question: 'Why does an id come back as a float?', answer: 'The value exceeded PHP_INT_MAX, so json_decode converted it to a float and lost precision. Decode with JSON_BIGINT_AS_STRING and treat the identifier as a string.' },
      { question: 'Should I decode to arrays or objects?', answer: 'Arrays, via the true flag, are the common default and map cleanly onto a fromArray constructor. Objects read more naturally when you are passing the decoded value straight through. Be consistent rather than correct.' },
      { question: 'How do I convert nested data into nested classes?', answer: 'Write a static fromArray method on each class that constructs its children explicitly. Nothing in PHP does this automatically; a serializer such as Symfony Serializer or JMS can, at the cost of a dependency and some configuration.' },
      { question: 'Do I need getters?', answer: 'Not with readonly promoted properties, which give you immutability and direct access in one line. Getters still make sense when a value is computed or when you need to keep the option of changing the representation later.' },
      { question: 'How do I control what json_encode outputs?', answer: 'Implement JsonSerializable and return the exact array you want. Without it, json_encode emits public properties only, which quietly drops anything private or protected.' },
      { question: 'Is my JSON private?', answer: 'Yes. Generation happens entirely in your browser and nothing is uploaded.' },
    ],
  },

  'cron-expression-generator': {
    intro: {
      heading: 'What Is a Cron Expression?',
      paragraphs: [
        'A cron expression is a compact string of five fields that defines a repeating schedule — used by cron on Linux, CI pipelines, cloud schedulers, and countless job runners. The five fields are minute, hour, day of month, month, and day of week, and each can be a specific value, a list, a range, or a step like */5.',
        'The syntax is powerful but easy to get wrong. This tool translates any cron expression into plain English, shows you the next times it will run, and offers ready-made presets you can start from — so you can build and verify a schedule with confidence.',
        'Everything is computed in your browser; nothing you type is uploaded.',
      ],
    },
    steps: {
      heading: 'How to Use the Cron Generator',
      items: [
        'Type a cron expression, or click a preset to fill one in.',
        'Read the plain-English description of when it runs.',
        'Check the next 5 run times to confirm the schedule is what you expect.',
        'Copy the expression into your crontab, CI config, or scheduler.',
      ],
    },
    example: {
      heading: 'Example',
      description: 'The expression on the left runs every 15 minutes, from 9 AM to 5 PM, on weekdays.',
      input: '*/15 9-17 * * 1-5',
      output: 'Every 15 minutes, between 09:00 and 17:59, Monday through Friday',
      inputLabel: 'Cron',
      outputLabel: 'Meaning',
    },
    tips: {
      heading: 'Cron Syntax Quick Tips',
      items: [
        { title: '*', text: 'Every value for that field (e.g. every minute).' },
        { title: '*/n', text: 'Every n units — */5 in minutes means every 5 minutes.' },
        { title: 'a-b', text: 'A range, e.g. 9-17 for hours 9 through 17.' },
        { title: 'a,b,c', text: 'A list of specific values, e.g. 1,15,30.' },
        { title: 'Day of week', text: '0 and 7 both mean Sunday; 1 is Monday.' },
        { title: 'Order', text: 'minute, hour, day-of-month, month, day-of-week.' },
      ],
    },
    faqs: [
      { question: 'What do the five fields mean?', answer: 'In order: minute (0–59), hour (0–23), day of month (1–31), month (1–12), and day of week (0–6, where 0 is Sunday).' },
      { question: 'What does */5 mean?', answer: 'A step value. In the minute field, */5 means "every 5 minutes". In the hour field it would mean every 5 hours.' },
      { question: 'What time zone are the next runs in?', answer: 'The next run times are shown in UTC. Your actual server may use a different time zone, so adjust accordingly.' },
      { question: 'Is my expression sent anywhere?', answer: 'No. Parsing and next-run calculation happen entirely in your browser.' },
    ],
  },
};
