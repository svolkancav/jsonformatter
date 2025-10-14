import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export function UnderstandingJSON() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
            Tutorial
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            January 15, 2025
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            8 min read
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Understanding JSON: A Complete Guide for Developers
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          Master the fundamentals of JSON and learn how to work with this essential data format in modern web development.
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is JSON?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that has become the de facto standard for data exchange on the web. Despite its name suggesting a connection to JavaScript, JSON is completely language-independent and can be used with virtually any programming language.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Created by Douglas Crockford in the early 2000s, JSON was designed to be easy for humans to read and write while being simple for machines to parse and generate. Its simplicity and effectiveness have made it the preferred choice for API responses, configuration files, and data storage across the software development industry.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">JSON Syntax Rules</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            JSON follows a strict set of syntax rules that ensure data can be reliably parsed across different systems:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
            <li>Data is represented in name/value pairs</li>
            <li>Data is separated by commas</li>
            <li>Curly braces hold objects</li>
            <li>Square brackets hold arrays</li>
            <li>String values must be wrapped in double quotes</li>
            <li>No trailing commas are allowed</li>
            <li>No comments are supported in standard JSON</li>
          </ul>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <pre>{`{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "email": "john@example.com"
}`}</pre>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">JSON Data Types</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            JSON supports six fundamental data types that cover most data representation needs:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-6">1. String</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            A sequence of characters enclosed in double quotes. Strings can contain any Unicode character and support escape sequences.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
            <pre>{`"name": "Alice Smith"`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-6">2. Number</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Can be an integer or floating-point value. JSON doesn't distinguish between different numeric types.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
            <pre>{`"age": 25, "temperature": -12.5, "pi": 3.14159`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-6">3. Boolean</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Represents true or false values (lowercase only).
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
            <pre>{`"isActive": true, "isDeleted": false`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-6">4. Null</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Represents an empty or non-existent value.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
            <pre>{`"middleName": null`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-6">5. Object</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            An unordered collection of name/value pairs enclosed in curly braces.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
            <pre>{`{
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zipCode": "12345"
  }
}`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-6">6. Array</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            An ordered list of values enclosed in square brackets.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
            <pre>{`"hobbies": ["reading", "coding", "gaming"]`}</pre>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Use Cases</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            JSON's versatility makes it ideal for numerous applications in modern software development:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">API Communication</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            REST APIs predominantly use JSON for request and response payloads. Its lightweight nature and ease of parsing make it perfect for client-server communication. When you make an API call, you typically send and receive data in JSON format.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">Configuration Files</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Many applications use JSON for configuration files (like package.json in Node.js projects). It's more readable than XML and simpler than YAML for most use cases, making it an excellent choice for storing application settings and metadata.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">Data Storage</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            NoSQL databases like MongoDB store data in JSON-like formats. This allows for flexible schemas and easy integration with JavaScript applications. LocalStorage and SessionStorage in browsers also commonly use JSON for data serialization.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">Data Exchange</h3>
          <p className="text-gray-600 dark:text-gray-400">
            JSON is the go-to format for importing and exporting data between different systems. Its universal support across programming languages and platforms makes it ideal for data migration, backup, and integration scenarios.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-3">
            <li><strong>Use descriptive property names:</strong> Choose clear, self-documenting names that indicate what the data represents.</li>
            <li><strong>Be consistent with naming conventions:</strong> Stick to either camelCase or snake_case throughout your JSON structure.</li>
            <li><strong>Keep structures flat when possible:</strong> Avoid unnecessary nesting that can make data harder to work with.</li>
            <li><strong>Validate JSON before using it:</strong> Always validate JSON data, especially when it comes from external sources.</li>
            <li><strong>Use appropriate data types:</strong> Don't store numbers as strings or booleans as numbers.</li>
            <li><strong>Document your JSON schema:</strong> For complex structures, maintain documentation about expected fields and data types.</li>
            <li><strong>Handle null values explicitly:</strong> Decide whether null is appropriate or if the field should be omitted entirely.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            JSON has earned its place as the standard data interchange format for modern web development. Its simplicity, readability, and universal support make it an essential skill for any developer. Understanding JSON thoroughly will help you work more effectively with APIs, databases, and data in general.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Whether you're building a REST API, configuring an application, or exchanging data between systems, JSON provides a reliable and efficient solution. Take time to master its syntax and best practices, and you'll find yourself working with data more confidently and efficiently.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/blog/json-best-practices"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Best Practices for JSON Data Structure Design
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn proven patterns for designing efficient JSON structures
            </p>
          </Link>
          <Link
            to="/blog/common-json-errors"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Common JSON Formatting Errors
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Troubleshoot and fix the most common JSON errors
            </p>
          </Link>
        </div>
      </div>
    </article>
  );
}
