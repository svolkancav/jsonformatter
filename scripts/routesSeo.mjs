// Single source of truth for per-route <title>/meta used by the prerender step
// (scripts/prerender.mjs). Keep these aligned with each page's <SEO> props so
// the raw HTML Google sees matches what the app renders client-side.
//
// When you add a NEW static page, add an entry here too. Blog articles are
// picked up automatically from src/data/blogArticles.ts — no edit needed here.

export const SITE = 'https://jsonformater.com';

export const staticRoutes = [
  {
    path: '/',
    title: 'Free Online JSON Formatter, Blob Viewer & Excel Converter | jsonformater.com',
    description: 'Format, beautify, and view JSON online for free. Instantly convert JSON to Excel or Excel to JSON, and explore JSON Blobs with our free online tool.',
    keywords: 'free json formatter, online json formatter, json blob viewer, json to excel converter, excel to json converter, json viewer, free online json tool, json beautifier',
  },
  {
    path: '/json-formatter',
    title: 'Free Online JSON Formatter & Validator',
    description: 'Format, validate, and beautify your JSON data instantly with our free online JSON formatter tool.',
    keywords: 'free json formatter, online json formatter, json validator, json beautifier, format json online, json minifier, json syntax checker',
  },
  {
    path: '/json-viewer',
    title: 'Free Online JSON Viewer & Analyzer',
    description: 'Paste your JSON and view it in a readable tree structure. Fast, secure, and free online JSON viewer tool.',
    keywords: 'free json viewer, online json viewer, json analyzer, json tree viewer, json structure viewer, json pretty print',
  },
  {
    path: '/json-blob-viewer',
    title: 'Free Online JSON Blob Viewer & Formatter',
    description: 'Load and view JSON blob data online. Instantly prettify, inspect, and convert your JSON blobs.',
    keywords: 'free json blob viewer, online json blob viewer, json blob formatter, json blob analyzer, json blob converter, json blob inspector',
  },
  {
    path: '/json-to-excel',
    title: 'Free Online JSON to Excel Converter',
    description: 'Convert JSON to Excel spreadsheets online for free. Fast, secure, and privacy-friendly JSON to XLSX tool.',
    keywords: 'free json to excel converter, online json to excel, json to xlsx converter, export json to excel, json spreadsheet converter, free online converter',
  },
  {
    path: '/excel-to-json',
    title: 'Free Online Excel to JSON Converter',
    description: 'Convert Excel (.xlsx or .csv) files to JSON instantly with our free online converter tool.',
    keywords: 'free excel to json converter, online excel to json, xlsx to json converter, csv to json converter, excel json converter, free online converter',
  },
  {
    path: '/excel-to-csv',
    title: 'Free Online Excel to CSV Converter',
    description: 'Convert Excel (.xlsx or .xls) files to CSV format instantly with our free online converter tool. Customize delimiter, quotes, encoding, and more.',
    keywords: 'free excel to csv converter, online excel to csv, xlsx to csv converter, xls to csv converter, excel csv converter, free online converter',
  },
  {
    path: '/excel-to-xml',
    title: 'Free Online Excel to XML Converter',
    description: 'Convert Excel (.xlsx or .csv) files to XML instantly with our free online converter tool. Fast, secure, and easy to use.',
    keywords: 'free excel to xml converter, online excel to xml, xlsx to xml converter, csv to xml converter, excel xml converter, free online converter',
  },
  {
    path: '/json-to-toon',
    title: 'JSON to TOON Converter | Free Online JSON to TOON Format Tool',
    description: 'Free online JSON to TOON converter. Convert JSON data to TOON (Token-Oriented Object Notation) format instantly and reduce token usage by 30-60% for LLM APIs.',
    keywords: 'json to toon, json to toon converter, convert json to toon, toon converter, toon format, token optimization, llm format, json converter',
  },
  {
    path: '/toon-to-json',
    title: 'TOON to JSON Converter | Convert TOON Format to JSON Online',
    description: 'Free online TOON to JSON converter. Convert TOON (Token-Oriented Object Notation) format to JSON instantly. Perfect for converting LLM-optimized data back to JSON.',
    keywords: 'toon to json, toon to json converter, convert toon to json, toon converter, json converter, token optimization, llm format',
  },
  {
    path: '/json-to-toml',
    title: 'JSON to TOML Converter | Convert JSON to TOML Online',
    description: 'Free online JSON to TOML converter. Convert JSON data to TOML format instantly. Perfect for configuration files, Cargo.toml, and more.',
    keywords: 'json to toml, json toml converter, convert json to toml, toml converter, json converter, configuration file converter',
  },
  {
    path: '/toml-to-json',
    title: 'TOML to JSON Converter | Convert TOML to JSON Online',
    description: 'Free online TOML to JSON converter. Convert TOML configuration files to JSON format instantly. Perfect for Cargo.toml, pyproject.toml, and more.',
    keywords: 'toml to json, toml json converter, convert toml to json, toml converter, json converter, configuration file converter',
  },
  {
    path: '/json-to-csv',
    title: 'JSON to CSV Converter | Free Online JSON to CSV Tool',
    description: 'Free online JSON to CSV converter. Turn an array of JSON objects into clean CSV instantly — keys become columns, objects become rows. Fast, private, browser-based.',
    keywords: 'json to csv, json to csv converter, convert json to csv, json array to csv, json csv converter, free online converter',
  },
  {
    path: '/csv-to-json',
    title: 'CSV to JSON Converter | Free Online CSV to JSON Tool',
    description: 'Free online CSV to JSON converter. Turn CSV rows into an array of JSON objects instantly — the header row becomes keys. Fast, private, browser-based.',
    keywords: 'csv to json, csv to json converter, convert csv to json, csv json converter, csv to array, free online converter',
  },
  {
    path: '/json-to-yaml',
    title: 'JSON to YAML Converter | Free Online JSON to YAML Tool',
    description: 'Free online JSON to YAML converter. Convert JSON data to clean, readable YAML instantly — perfect for config files, Kubernetes, CI pipelines, and Docker Compose.',
    keywords: 'json to yaml, json to yaml converter, convert json to yaml, yaml converter, json yaml, free online converter',
  },
  {
    path: '/yaml-to-json',
    title: 'YAML to JSON Converter | Free Online YAML to JSON Tool',
    description: 'Free online YAML to JSON converter. Convert YAML config files to JSON instantly — perfect for turning Kubernetes, CI, or Docker Compose YAML into JSON your code can use.',
    keywords: 'yaml to json, yaml to json converter, convert yaml to json, yaml json converter, yaml parser, free online converter',
  },
  {
    path: '/json-to-xml',
    title: 'JSON to XML Converter | Free Online JSON to XML Tool',
    description: 'Free online JSON to XML converter. Convert JSON data to well-formed XML instantly — ideal for SOAP services, legacy systems, and XML-based integrations.',
    keywords: 'json to xml, json to xml converter, convert json to xml, json xml converter, free online converter',
  },
  {
    path: '/xml-to-json',
    title: 'XML to JSON Converter | Free Online XML to JSON Tool',
    description: 'Free online XML to JSON converter. Convert XML documents to JSON instantly — turn SOAP responses, RSS feeds, and legacy XML into JSON your code can use.',
    keywords: 'xml to json, xml to json converter, convert xml to json, xml json converter, xml parser, free online converter',
  },
  {
    path: '/jwt-decoder',
    title: 'JWT Decoder | Free Online JSON Web Token Decoder',
    description: 'Free online JWT decoder. Paste a JSON Web Token to instantly decode its header and payload as readable JSON, with expiry info. Runs entirely in your browser.',
    keywords: 'jwt decoder, decode jwt, json web token decoder, jwt parser, jwt debugger, decode json web token, free online jwt',
  },
  {
    path: '/base64',
    title: 'Base64 Encode & Decode | Free Online Base64 Converter',
    description: 'Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 to text instantly. UTF-8 safe, runs entirely in your browser.',
    keywords: 'base64, base64 encode, base64 decode, base64 converter, base64 encoder, base64 decoder, encode decode base64 online',
  },
  {
    path: '/uuid-generator',
    title: 'UUID Generator | Free Online UUID v4 Generator',
    description: 'Free online UUID generator. Instantly generate one or many random UUID (v4) values. Cryptographically random, runs entirely in your browser.',
    keywords: 'uuid generator, guid generator, uuid v4, generate uuid, random uuid, online uuid, unique id generator',
  },
  {
    path: '/timestamp-converter',
    title: 'Unix Timestamp Converter | Epoch to Date & Date to Epoch',
    description: 'Free online Unix timestamp converter. Convert an epoch timestamp to a readable date, or a date back to a Unix timestamp. Handles seconds and milliseconds.',
    keywords: 'unix timestamp converter, epoch converter, timestamp to date, date to timestamp, epoch to date, unix time, convert timestamp',
  },
  {
    path: '/json-diff',
    title: 'JSON Diff | Free Online JSON Compare Tool',
    description: 'Free online JSON diff tool. Compare two JSON documents and see exactly what was added, removed, or changed. Runs entirely in your browser.',
    keywords: 'json diff, json compare, compare json, json difference, diff json online, json comparison tool',
  },
  {
    path: '/json-to-go',
    title: 'JSON to Go Struct Converter | Free Online JSON to Go Tool',
    description: 'Convert JSON to Go structs instantly. Free online JSON to Go struct generator with correct types and json tags. Runs entirely in your browser.',
    keywords: 'json to go, json to go struct, json to golang, generate go structs, go struct generator, json struct tags',
  },
  {
    path: '/json-to-python',
    title: 'JSON to Python Converter | Generate Python Classes from JSON',
    description: 'Convert JSON to Python classes instantly. Free online JSON to Python class generator with type hints and nested class support. Runs in your browser.',
    keywords: 'json to python, json to python class, json to dataclass, generate python classes, python class generator, json to pydantic',
  },
  {
    path: '/json-to-java',
    title: 'JSON to Java Converter | Generate Java Classes from JSON',
    description: 'Convert JSON to Java classes instantly. Free online JSON to Java POJO generator with correct types and nested class support. Runs entirely in your browser.',
    keywords: 'json to java, json to java class, json to pojo, generate java classes, java class generator, json to java object',
  },
  {
    path: '/json-validator',
    title: 'JSON Validator - Validate JSON Online Free',
    description: 'Free online JSON validator. Check if your JSON is valid, find syntax errors, and get detailed error messages.',
    keywords: 'json validator, validate json, json checker, json syntax checker',
  },
  {
    path: '/character-counter',
    title: 'Character Counter - Free Online Word & Character Count Tool',
    description: 'Free online character counter. Count characters, words, lines, sentences and more instantly. Perfect for social media, SEO, and writing.',
    keywords: 'character counter, word counter, text analyzer, character count, word count',
  },
  {
    path: '/blog',
    title: 'Blog | JSON, TOON, TOML & Developer Data Format Guides',
    description: 'Tutorials, guides, and best practices for working with JSON, TOON, TOML, and other developer data formats.',
    keywords: 'json blog, json tutorials, json guides, toon, toml, developer data formats',
  },
  {
    path: '/tutorials',
    title: 'JSON Tutorials & Guides | JSON Formatter',
    description: 'Step-by-step JSON tutorials and guides covering formatting, validation, conversion, and best practices for developers.',
    keywords: 'json tutorials, json guides, learn json, json how to',
  },
  {
    path: '/about',
    title: 'About JSON Formatter | Professional Developer Tools',
    description: 'Learn about JSON Formatter, the free online tool for formatting, validating, and converting JSON data. Built by developers for developers.',
    keywords: 'about json formatter, developer tools, json tools, free online tools, json converter',
  },
  {
    path: '/contact',
    title: 'Contact JSON Formatter | Get Support & Feedback',
    description: "Contact the JSON Formatter team for support, feedback, or feature requests. We're here to help with your JSON formatting and conversion needs.",
    keywords: 'contact json formatter, support, feedback, json tools help',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | JSON Formatter - Your Data is Safe',
    description: 'Learn how JSON Formatter protects your privacy. All data processing happens locally in your browser.',
    keywords: 'privacy policy, data protection, json formatter privacy, secure json tools, no data collection',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | JSON Formatter',
    description: 'Learn how JSON Formatter uses cookies and how you can control your cookie preferences in compliance with GDPR/CCPA.',
    keywords: 'cookie policy, GDPR, CCPA, privacy, cookie consent',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | JSON Formatter',
    description: 'Disclaimer for JSON Formatter: information accuracy, no warranties, and limitation of liability.',
    keywords: 'disclaimer, no warranty, liability, information accuracy',
  },
  {
    path: '/sitemap',
    title: 'HTML Sitemap | JSON Formatter',
    description: 'Browse all pages and tools on JSON Formatter using our HTML sitemap for users.',
    keywords: 'sitemap, site map, pages, navigation',
  },

  // --- Sample JSON data library ---
  {
    path: '/sample-json',
    title: 'Sample JSON Data | Free Example JSON Datasets for Testing',
    description: 'Free, copy-paste-ready sample JSON datasets for testing and development — users, products, orders, GeoJSON, API responses and more.',
    keywords: 'sample json, sample json data, example json, json test data, dummy json data, json examples, mock json',
  },
  { path: '/sample-json/users', title: 'Sample JSON: Users | Free Example JSON to Copy', description: 'A ready-to-use sample JSON array of user objects for testing forms, tables, APIs, and front-end mock data.', keywords: 'sample json users, user json example, mock user data json' },
  { path: '/sample-json/products', title: 'Sample JSON: Products | Free Example JSON to Copy', description: 'A sample JSON array of e-commerce product objects with price, stock, categories, and tags for testing catalogs and carts.', keywords: 'sample json products, product json example, ecommerce json data' },
  { path: '/sample-json/employees', title: 'Sample JSON: Employees | Free Example JSON to Copy', description: 'A sample JSON dataset of employees with departments, salaries, and managers for HR apps, tables, and reporting demos.', keywords: 'sample json employees, employee json example, hr json data' },
  { path: '/sample-json/orders', title: 'Sample JSON: Orders | Free Example JSON to Copy', description: 'A sample JSON array of orders with nested line items, totals, and shipping for testing order history and invoices.', keywords: 'sample json orders, order json example, nested json sample' },
  { path: '/sample-json/blog-posts', title: 'Sample JSON: Blog Posts | Free Example JSON to Copy', description: 'A sample JSON array of blog post objects with author, tags, and timestamps for testing CMS front-ends and feeds.', keywords: 'sample json blog posts, blog json example, cms json data' },
  { path: '/sample-json/todos', title: 'Sample JSON: Todo List | Free Example JSON to Copy', description: 'A simple sample JSON array of todo items with status and priority — the classic dataset for tutorials and to-do apps.', keywords: 'sample json todos, todo json example, todo list json' },
  { path: '/sample-json/geojson', title: 'Sample GeoJSON: Points | Free Example GeoJSON to Copy', description: 'A sample GeoJSON FeatureCollection with point features and properties for testing maps and geospatial code.', keywords: 'sample geojson, geojson example, geojson points sample' },
  { path: '/sample-json/api-response', title: 'Sample JSON: Paginated API Response | Free Example JSON', description: 'A sample JSON API response with a data array plus pagination metadata — the common envelope pattern for REST APIs.', keywords: 'sample api response json, paginated json example, rest api json sample' },

  // --- JSON error reference ---
  {
    path: '/json-errors',
    title: 'Common JSON Errors and How to Fix Them | Error Reference',
    description: 'A reference of the most common JSON parse errors in JavaScript and Python — what each error message means and exactly how to fix it.',
    keywords: 'json errors, json parse error, json syntax error, fix json error, jsondecodeerror, unexpected token json',
  },
  { path: '/json-errors/unexpected-token', title: 'How to Fix: Unexpected token < in JSON at position 0', description: 'What "Unexpected token < in JSON at position 0" means in JavaScript and how to fix it — usually you received HTML instead of JSON.', keywords: 'unexpected token in json, unexpected token < in json at position 0, json parse html error' },
  { path: '/json-errors/unexpected-end-of-json-input', title: 'How to Fix: Unexpected end of JSON input', description: 'What causes "Unexpected end of JSON input" in JavaScript and how to fix truncated or empty JSON.', keywords: 'unexpected end of json input, json parse empty, truncated json error' },
  { path: '/json-errors/unexpected-token-o-in-json', title: 'How to Fix: Unexpected token o in JSON at position 1', description: 'Why "Unexpected token o in JSON at position 1" happens — you passed an object to JSON.parse instead of a string.', keywords: 'unexpected token o in json, json parse object error, json.parse object' },
  { path: '/json-errors/unexpected-non-whitespace-character', title: 'How to Fix: Unexpected non-whitespace character after JSON', description: 'What "Unexpected non-whitespace character after JSON" means and how to fix trailing or concatenated data.', keywords: 'unexpected non-whitespace character after json, json trailing data error' },
  { path: '/json-errors/expecting-value', title: 'How to Fix: Expecting value: line 1 column 1 (char 0)', description: 'The most common Python JSONDecodeError — what "Expecting value" means and how to fix it.', keywords: 'expecting value line 1 column 1 char 0, jsondecodeerror expecting value, python json error' },
  { path: '/json-errors/expecting-delimiter', title: "How to Fix: Expecting ',' delimiter (Python JSON)", description: 'Why Python raises "Expecting \',\' delimiter" and how to fix the missing comma or bad structure.', keywords: "expecting ',' delimiter, jsondecodeerror delimiter, python json missing comma" },
  { path: '/json-errors/extra-data', title: 'How to Fix: Extra data (Python JSONDecodeError)', description: 'What Python\'s "Extra data" JSONDecodeError means and how to fix multiple values in one string.', keywords: 'json extra data error, jsondecodeerror extra data, python json multiple objects' },
  { path: '/json-errors/expecting-property-name', title: 'How to Fix: Expecting property name enclosed in double quotes', description: 'Why you get "Expecting property name enclosed in double quotes" — usually single quotes, unquoted keys, or a trailing comma.', keywords: 'expecting property name enclosed in double quotes, json single quotes error, python json property name' },
];
