import { TomlToJsonConverter } from '../components/TomlToJsonConverter';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';

export function TomlToJsonPage() {
  return (
    <>
      <SEO
        title="TOML to JSON Converter | Convert TOML to JSON Online"
        description="Free online TOML to JSON converter. Convert TOML configuration files to JSON format instantly. Perfect for Cargo.toml, pyproject.toml, and more."
        keywords="toml to json, toml json converter, convert toml to json, toml converter, json converter, configuration file converter"
        canonicalUrl="https://jsonformater.com/toml-to-json"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TOML to JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert TOML configuration files to JSON format instantly. Perfect for converting Cargo.toml, pyproject.toml, and other TOML files.
          </p>
        </header>

        <AdSlot slotId="toml_to_json_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TomlToJsonConverter />
        </div>

        <AdSlot slotId="toml_to_json_footer" />

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is TOML?</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p>
              TOML (Tom's Obvious Minimal Language) is a configuration file format that's easy to read due to obvious semantics. 
              It's designed to be minimal and human-readable, making it perfect for configuration files.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Common Uses:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cargo.toml files in Rust projects</li>
              <li>pyproject.toml in Python projects (Poetry, setuptools)</li>
              <li>Configuration files for various applications</li>
              <li>Package manager configuration files</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Example TOML:</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
{`[package]
name = "my-project"
version = "1.0.0"
authors = ["John Doe <john@example.com>"]

[dependencies]
serde = "1.0"
tokio = { version = "1.0", features = ["full"] }`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

