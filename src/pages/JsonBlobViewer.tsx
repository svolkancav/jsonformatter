import { JsonFormatter } from '../components/JsonFormatter';
import { SEO } from '../components/SEO';

export function JsonBlobViewerPage() {
  return (
    <>
      <SEO
        title="Free Online JSON Blob Viewer & Formatter"
        description="Load and view JSON blob data online. Instantly prettify, inspect, and convert your JSON blobs."
        keywords="free json blob viewer, online json blob viewer, json blob formatter, json blob analyzer, json blob converter, json blob inspector"
        canonicalUrl="https://jsonformater.com/json-blob-viewer"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free Online JSON Blob Viewer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Load and view JSON blob data online. Instantly prettify, inspect, and convert your JSON blobs.
            </p>
          </header>

          <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <JsonFormatter />
          </main>

          {/* Features Section */}
          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Blob Data Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Handle large JSON blob data with ease. Upload, paste, or load from URLs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Formatting</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automatically format and beautify your JSON blob data for better readability.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Inspect blob structure, validate syntax, and identify data patterns.
              </p>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Perfect for JSON Blob Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Database Blobs</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  View and format JSON data stored as blobs in databases like MySQL, PostgreSQL, or SQLite.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">API Responses</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analyze large JSON responses from APIs and web services in a readable format.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Uploads</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Process JSON files uploaded as binary data and convert them to readable format.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Migration</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Inspect and validate JSON blob data during system migrations and data transfers.
                </p>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to View JSON Blobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Load Blob Data</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Upload your JSON blob file or paste the blob data directly into our viewer.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Auto-Format</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our tool automatically detects and formats the JSON blob into readable structure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Inspect & Export</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore the formatted data, validate structure, and export for your needs.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
