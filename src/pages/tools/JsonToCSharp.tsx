import { useState } from 'react';
import { Code2, Copy, Download, CheckCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { generateCSharpClasses } from '../../utils/generators';

export function JsonToCSharp() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [className, setClassName] = useState('Root');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const result = generateCSharpClasses(input, className);
      setOutput(result);
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${className}.cs`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadExample = (json: string, name: string) => {
    setInput(json);
    setClassName(name);
    setError('');
  };

  return (
    <>
      <SEO
        title="JSON to C# Converter - Generate C# Classes from JSON Online"
        description="Convert JSON to C# classes instantly. Free online JSON to C# converter with proper naming conventions, nullable types, and nested class support."
        keywords="json to csharp, json to c# converter, generate c# classes, json to c# online, c# class generator"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to C# Class Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Convert JSON data to C# classes instantly. Generate production-ready code with proper types, properties, and naming conventions.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-12">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Root Class Name
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Root"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                JSON Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-96 px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                placeholder='{"name": "John", "age": 30}'
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  C# Output
                </label>
                {output && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>
              <textarea
                value={output}
                readOnly
                className="w-full h-96 px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                placeholder="C# classes will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleConvert}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              Generate C# Classes
            </button>
            <button
              onClick={() => {
                setInput('');
                setOutput('');
                setError('');
                setClassName('Root');
              }}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How to Use JSON to C# Converter</h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Paste Your JSON:</strong> Copy your JSON data and paste it into the left input box. The JSON can be from an API response, a file, or any valid JSON source.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Set Class Name:</strong> Enter the desired name for your root C# class. Use PascalCase naming convention (e.g., "User", "Product", "ApiResponse").
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Generate:</strong> Click the "Generate C# Classes" button. The tool will automatically create C# classes with proper types, properties, and nested classes.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Copy or Download:</strong> Use the Copy button to copy the generated code to your clipboard, or Download to save it as a .cs file.
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Examples</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Simple User Object</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Convert a basic user JSON object into a C# class. This is the most common use case for API responses.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                  <pre className="text-sm overflow-x-auto">{`{
  "id": 12345,
  "username": "johndoe",
  "email": "john@example.com",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
                <button
                  onClick={() => loadExample(`{
  "id": 12345,
  "username": "johndoe",
  "email": "john@example.com",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}`, 'User')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Try This Example
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Nested Objects</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Handle complex JSON with nested objects. The tool automatically creates separate classes for nested structures.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                  <pre className="text-sm overflow-x-auto">{`{
  "user": {
    "name": "John Doe",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    }
  }
}`}</pre>
                </div>
                <button
                  onClick={() => loadExample(`{
  "user": {
    "name": "John Doe",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    }
  }
}`, 'Response')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Try This Example
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Arrays and Collections</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Convert JSON arrays to C# List properties. Perfect for working with collections of data.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                  <pre className="text-sm overflow-x-auto">{`{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "tags": ["electronics", "computers"]
    }
  ]
}`}</pre>
                </div>
                <button
                  onClick={() => loadExample(`{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "tags": ["electronics", "computers"]
    }
  ]
}`, 'ProductResponse')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Try This Example
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Common Issues and Solutions</h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Invalid JSON Error</h3>
                <p className="mb-2">
                  <strong>Problem:</strong> You see "Invalid JSON" error message.
                </p>
                <p>
                  <strong>Solution:</strong> Validate your JSON first using our JSON Validator tool. Common issues include trailing commas, single quotes instead of double quotes, or unquoted property names.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Property Names with Special Characters</h3>
                <p className="mb-2">
                  <strong>Problem:</strong> JSON properties contain spaces or special characters.
                </p>
                <p>
                  <strong>Solution:</strong> The generator handles this automatically, but you may need to use JsonProperty attributes in your C# code for proper serialization.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nullable Values</h3>
                <p className="mb-2">
                  <strong>Problem:</strong> Some JSON values are null.
                </p>
                <p>
                  <strong>Solution:</strong> The tool generates proper nullable types for value types. For complete null safety, enable nullable reference types in your C# project.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  What C# version does the generated code target?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The generated code uses modern C# syntax compatible with C# 8.0 and later. It includes auto-properties and follows current C# best practices.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Does it support JSON.NET (Newtonsoft.Json)?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! The generated classes work with both Newtonsoft.Json and System.Text.Json. You can add the appropriate serialization attributes as needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  How does it handle arrays?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  JSON arrays are converted to C# List&lt;T&gt; properties. If the array contains objects, a separate class is created for the array item type.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Can I customize the generated class names?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can set the root class name in the input field. Nested class names are automatically generated based on the JSON property names using PascalCase convention.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  What about date and time properties?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  String properties that look like ISO 8601 dates are kept as strings. You can manually change them to DateTime or DateTimeOffset in your code if needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Is the generated code production-ready?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The code follows C# conventions and is suitable for production use. However, always review and test the generated code, especially for complex scenarios.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Does it handle large JSON files?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, the tool can handle large JSON files. However, very large files may take a moment to process. All processing happens in your browser, so performance depends on your device.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Can I use this for commercial projects?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely! This tool is completely free to use for both personal and commercial projects with no restrictions.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
