import { useState } from 'react';
import { JsonFormatter } from '../components/JsonFormatter';
import { ExcelToJsonConverter } from '../components/ExcelToJsonConverter';
import { JsonToExcelConverter } from '../components/JsonToExcelConverter';
import { ToolNavigation, ToolType } from '../components/ToolNavigation';
import { Book, Code, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Home() {
  const [activeTool, setActiveTool] = useState<ToolType>('formatter');
  const [sharedJson, setSharedJson] = useState('');

  const handleJsonGenerated = (json: string) => {
    setSharedJson(json);
  };

  const loadExample = (json: string) => {
    const event = new CustomEvent('loadExample', { detail: json });
    window.dispatchEvent(event);
  };

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'formatter':
        return <JsonFormatter />;
      case 'excel-to-json':
        return <ExcelToJsonConverter onJsonGenerated={handleJsonGenerated} />;
      case 'json-to-excel':
        return <JsonToExcelConverter initialJson={sharedJson} />;
      default:
        return <JsonFormatter />;
    }
  };

  const getSEOData = () => {
    switch (activeTool) {
      case 'formatter':
        return {
          title: 'JSON Formatter - Format, Validate & Beautify JSON Online',
          description: 'Free online JSON formatter and validator. Format, beautify, minify and validate JSON data instantly. Convert JSON to C#, TypeScript, Java, Python classes.',
          keywords: 'json formatter, json validator, json beautifier, json minifier, json to csharp, format json online'
        };
      case 'excel-to-json':
        return {
          title: 'Excel to JSON Converter | Convert XLSX or CSV to JSON Online',
          description: 'Easily convert Excel or CSV files to JSON online. Upload your Excel sheet, preview JSON output, and download it instantly.',
          keywords: 'excel to json converter, convert excel to json online, csv to json, xlsx to json, free converter'
        };
      case 'json-to-excel':
        return {
          title: 'JSON to Excel Converter | Export JSON to XLSX Online',
          description: 'Convert JSON data to Excel (.xlsx) instantly. Paste JSON, validate it, and download as Excel file — simple, secure, and free.',
          keywords: 'json to excel converter, convert json to excel online, export json to xlsx, json to spreadsheet'
        };
      default:
        return {
          title: 'JSON Formatter - Format, Validate & Beautify JSON Online',
          description: 'Free online JSON formatter and validator. Format, beautify, minify and validate JSON data instantly. Convert JSON to C#, TypeScript, Java, Python classes.',
          keywords: 'json formatter, json validator, json beautifier, json minifier, json to csharp, format json online'
        };
    }
  };

  const seoData = getSEOData();

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTool === 'formatter' && 'JSON Formatter & Validator'}
            {activeTool === 'excel-to-json' && 'Excel to JSON Converter'}
            {activeTool === 'json-to-excel' && 'JSON to Excel Converter'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {activeTool === 'formatter' && 'Format, validate, and beautify your JSON data instantly. Professional tools for developers, completely free.'}
            {activeTool === 'excel-to-json' && 'Easily convert Excel or CSV files to JSON online. Upload your Excel sheet, preview JSON output, and download it instantly.'}
            {activeTool === 'json-to-excel' && 'Convert JSON data to Excel (.xlsx) instantly. Paste JSON, validate it, and download as Excel file — simple, secure, and free.'}
          </p>
        </header>

        {/* Tool Navigation */}
        <div className="mb-8">
          <ToolNavigation activeTool={activeTool} onToolChange={setActiveTool} />
        </div>

        {/* Main Tool Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-12">
          {renderActiveTool()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            to="/json-formatter"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JSON Formatter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Format and validate JSON data</p>
          </Link>

          <Link
            to="/json-viewer"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Code className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JSON Viewer</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">View JSON in tree structure</p>
          </Link>

          <Link
            to="/json-blob-viewer"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Code className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JSON Blob Viewer</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">View and format JSON blobs</p>
          </Link>

          <Link
            to="/json-to-excel"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Code className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JSON to Excel</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Convert JSON to Excel spreadsheets</p>
          </Link>

          <Link
            to="/excel-to-json"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Excel to JSON</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Convert Excel files to JSON</p>
          </Link>

          <Link
            to="/json-to-csharp"
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JSON to C#</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Generate C# classes from JSON</p>
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">What is JSON?</h2>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="text-lg leading-relaxed">
                JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that has become the universal standard for data exchange on the web. Despite its name suggesting a connection to JavaScript, JSON is completely language-independent and is supported by virtually every modern programming language including C#, Java, Python, PHP, Ruby, and many others.
              </p>

              <p className="leading-relaxed">
                Created by Douglas Crockford in the early 2000s, JSON was designed with simplicity in mind. It provides an easy way for humans to read and write data while being simple for machines to parse and generate. This dual advantage has made JSON the preferred choice over older formats like XML for web APIs, configuration files, and data storage.
              </p>

              <p className="leading-relaxed">
                The format is built on two universal data structures: a collection of name/value pairs (realized as an object, record, struct, dictionary, hash table, keyed list, or associative array in various languages) and an ordered list of values (realized as an array, vector, list, or sequence). Because these are universal data structures, JSON can easily exchange data between different programming languages and platforms.
              </p>

              <p className="leading-relaxed">
                JSON's simplicity extends to its syntax. The entire specification fits on a single page, making it easy to implement parsers and generators. This simplicity has contributed significantly to its widespread adoption across the software development industry. Today, JSON is the backbone of modern web development, powering REST APIs, NoSQL databases, and configuration systems.
              </p>

              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mt-6">
                <p className="font-mono text-sm mb-2 text-gray-500 dark:text-gray-400">Example:</p>
                <pre className="font-mono text-sm overflow-x-auto">{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin", "user"]
}`}</pre>
                <button
                  onClick={() => loadExample(`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin", "user"]
}`)}
                  className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Try This Example
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">What is JSON Used For?</h2>
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Web APIs and Data Exchange</h3>
                <p className="leading-relaxed">
                  JSON is the de facto standard for REST APIs. When your mobile app requests data from a server, when a website loads user information, or when microservices communicate with each other, they're likely using JSON. Companies like Twitter, Facebook, Google, and GitHub all use JSON for their public APIs. The format's simplicity makes it perfect for transmitting data between client and server applications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Configuration Files</h3>
                <p className="leading-relaxed">
                  Modern development tools extensively use JSON for configuration. Package.json in Node.js projects, tsconfig.json for TypeScript, and settings.json in VS Code are all examples. JSON's readability makes it easy for developers to understand and modify configuration settings without extensive documentation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. NoSQL Databases</h3>
                <p className="leading-relaxed">
                  Databases like MongoDB, CouchDB, and Amazon DynamoDB store data in JSON or JSON-like formats (BSON for MongoDB). This allows for flexible schemas where different documents can have different structures, making these databases ideal for applications where data models evolve frequently.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Browser Storage</h3>
                <p className="leading-relaxed">
                  Web applications use JSON to store data in localStorage and sessionStorage. This enables features like saving user preferences, caching data, and maintaining application state across page refreshes. JSON's lightweight nature makes it perfect for client-side storage.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Data Migration and Backup</h3>
                <p className="leading-relaxed">
                  JSON's universal support makes it excellent for exporting and importing data between different systems. Whether you're migrating from one database to another or creating backups, JSON provides a reliable, human-readable format that can be easily processed by any system.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON Syntax Rules</h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-400">
              <p className="text-lg leading-relaxed">
                JSON follows strict syntax rules that ensure data can be reliably parsed across different systems. Understanding these rules is essential for working with JSON effectively.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">Data is in name/value pairs:</strong> Properties are written as "name": "value"
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">Data is separated by commas:</strong> Each property must be followed by a comma, except the last one
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">Curly braces hold objects:</strong> Objects are enclosed in {}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">Square brackets hold arrays:</strong> Arrays are enclosed in []
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">Strings use double quotes:</strong> All strings must be wrapped in double quotes, not single quotes
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">Property names must be strings:</strong> All keys must be enclosed in double quotes
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mt-6">
                <p className="font-mono text-sm mb-2 text-gray-500 dark:text-gray-400">Valid JSON Example:</p>
                <pre className="font-mono text-sm overflow-x-auto">{`{
  "user": {
    "id": 12345,
    "username": "johndoe",
    "email": "john@example.com",
    "isVerified": true,
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "age": 30
    },
    "hobbies": ["reading", "coding", "gaming"],
    "metadata": null
  }
}`}</pre>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON vs XML</h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              While both JSON and XML are used for data interchange, JSON has largely superseded XML in modern web development. Here's a detailed comparison:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-left p-4 font-bold text-gray-900 dark:text-white">JSON</th>
                    <th className="text-left p-4 font-bold text-gray-900 dark:text-white">XML</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Syntax</td>
                    <td className="p-4">Simple, concise, easy to read</td>
                    <td className="p-4">Verbose, requires closing tags</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Data Types</td>
                    <td className="p-4">Supports strings, numbers, booleans, null, objects, arrays</td>
                    <td className="p-4">Everything is a string, requires parsing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Size</td>
                    <td className="p-4">Smaller, less bandwidth</td>
                    <td className="p-4">Larger due to opening/closing tags</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Parsing Speed</td>
                    <td className="p-4">Faster to parse</td>
                    <td className="p-4">Slower parsing</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Arrays</td>
                    <td className="p-4">Native array support</td>
                    <td className="p-4">No native array support</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Comments</td>
                    <td className="p-4">Not supported</td>
                    <td className="p-4">Supported</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-semibold">Metadata</td>
                    <td className="p-4">Limited</td>
                    <td className="p-4">Rich metadata support with attributes</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Use Case</td>
                    <td className="p-4">APIs, web apps, configuration</td>
                    <td className="p-4">Legacy systems, document markup, complex data</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">When to Use JSON</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Modern web APIs</li>
                  <li>• Mobile applications</li>
                  <li>• Configuration files</li>
                  <li>• NoSQL databases</li>
                  <li>• Real-time data exchange</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">When to Use XML</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Document markup (HTML, SVG)</li>
                  <li>• Legacy system integration</li>
                  <li>• Complex data with metadata</li>
                  <li>• SOAP web services</li>
                  <li>• When comments are needed</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-0">Common JSON Errors</h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Trailing Commas</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  JSON does not allow commas after the last property in an object or last element in an array.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Wrong:</p>
                    <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm overflow-x-auto">{`{
  "name": "John",
  "age": 30,
}`}</pre>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">✓ Correct:</p>
                    <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm overflow-x-auto">{`{
  "name": "John",
  "age": 30
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Single Quotes</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  JSON requires double quotes for strings. Single quotes will cause parsing errors.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Wrong:</p>
                    <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm overflow-x-auto">{`{'name': 'John'}`}</pre>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">✓ Correct:</p>
                    <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm overflow-x-auto">{`{"name": "John"}`}</pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Unquoted Property Names</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  All property names must be enclosed in double quotes.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Wrong:</p>
                    <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm overflow-x-auto">{`{name: "John"}`}</pre>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">✓ Correct:</p>
                    <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm overflow-x-auto">{`{"name": "John"}`}</pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Comments</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Standard JSON does not support comments. Remove all comments before parsing.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Wrong:</p>
                    <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm overflow-x-auto">{`{
  // This is a comment
  "name": "John"
}`}</pre>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">✓ Correct:</p>
                    <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm overflow-x-auto">{`{
  "name": "John"
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">5. Undefined and NaN Values</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  JSON does not support undefined or NaN. Use null for missing values.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Wrong:</p>
                    <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm overflow-x-auto">{`{
  "value": undefined,
  "count": NaN
}`}</pre>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">✓ Correct:</p>
                    <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm overflow-x-auto">{`{
  "value": null,
  "count": 0
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">JSON Best Practices</h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Use Consistent Naming Conventions:</strong> Choose either camelCase or snake_case and stick with it throughout your API.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Keep Structures Flat:</strong> Avoid unnecessary nesting. Deep nesting makes data harder to work with.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Use Appropriate Data Types:</strong> Don't store numbers as strings or booleans as 1/0.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Validate Input:</strong> Always validate JSON data, especially from external sources.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Handle Errors Gracefully:</strong> Provide clear error messages when JSON parsing fails.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Use ISO 8601 for Dates:</strong> Format dates as "2024-01-15T10:30:00Z" for universal compatibility.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Consider File Size:</strong> For production, minify JSON to reduce bandwidth. For development, use pretty-printing for readability.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Document Your Schema:</strong> For complex APIs, maintain documentation about expected JSON structure and data types.
                </div>
              </div>
            </div>
          </section>
        </article>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Explore More JSON Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Access our complete suite of JSON conversion and validation tools
          </p>
          <Link
            to="/tools"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            View All Tools
          </Link>
        </div>
      </div>
    </>
  );
}
