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
];
