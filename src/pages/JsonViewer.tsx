import { JsonFormatter } from '../components/JsonFormatter';
import { SEO } from '../components/SEO';

export function JsonViewerPage() {
  return (
    <>
      <SEO
        title="Free Online JSON Viewer & Analyzer"
        description="Paste your JSON and view it in a readable tree structure. Fast, secure, and free online JSON viewer tool."
        keywords="free json viewer, online json viewer, json analyzer, json tree viewer, json structure viewer, json pretty print"
        canonicalUrl="https://jsonformater.com/json-viewer"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free Online JSON Viewer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Paste your JSON and view it in a readable tree structure. Fast, secure, and free online JSON viewer tool.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tree Structure View</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                View your JSON data in an organized tree structure for better readability and analysis.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get instant insights into your JSON structure with syntax highlighting and error detection.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All processing happens in your browser. Your data never leaves your device.
              </p>
            </div>
          </section>

          {/* How it works */}
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to Use Our JSON Viewer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Paste JSON Data</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Copy and paste your JSON data into the text area or upload a JSON file.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">View Tree Structure</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our tool automatically formats and displays your JSON in a readable tree structure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyze & Export</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore your data structure and export formatted JSON for your projects.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
