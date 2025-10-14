import { ExcelToCsvConverter } from '../components/ExcelToCsvConverter';
import { SEO } from '../components/SEO';

export function ExcelToCsvPage() {
  return (
    <>
      <SEO
        title="Free Online Excel to CSV Converter"
        description="Convert Excel (.xlsx or .xls) files to CSV format instantly with our free online converter tool. Customize delimiter, quotes, encoding, and more."
        keywords="free excel to csv converter, online excel to csv, xlsx to csv converter, xls to csv converter, excel csv converter, free online converter"
        canonicalUrl="https://jsonformater.com/excel-to-csv"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free Online Excel to CSV Converter
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Convert Excel (.xlsx or .xls) files to CSV format instantly with customizable formatting options. Simple, fast, and secure.
            </p>
          </header>

          <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <ExcelToCsvConverter />
          </main>

          {/* Features Section */}
          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable Format</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Choose delimiter, quote character, encoding, and line endings to match your needs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Sheets</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Support for Excel files with multiple sheets. Select which sheet to convert.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Preview the first 5 rows of your CSV output before downloading.
              </p>
            </div>
          </section>

          {/* How it works */}
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to Convert Excel to CSV</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload File</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Upload your Excel (.xlsx, .xls) file using drag & drop or file picker.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customize Format</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Choose your preferred delimiter, quotes, encoding, and other CSV options.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preview Output</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Review the first 5 rows to ensure the format is correct.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download CSV</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Copy to clipboard or download as a .csv file for your projects.
                </p>
              </div>
            </div>
          </section>

          {/* CSV Format Options */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">CSV Format Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Delimiter Options</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• <strong>Comma (,)</strong> - Standard CSV format</li>
                  <li>• <strong>Semicolon (;)</strong> - Common in European locales</li>
                  <li>• <strong>Tab</strong> - Tab-separated values (TSV)</li>
                  <li>• <strong>Space</strong> - Space-separated values</li>
                  <li>• <strong>Pipe (|)</strong> - Alternative delimiter</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quote Options</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• <strong>Double Quote (")</strong> - Standard CSV quoting</li>
                  <li>• <strong>Single Quote (')</strong> - Alternative quoting</li>
                  <li>• <strong>None</strong> - No quotes (escapes delimiters)</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Encoding Options</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• <strong>UTF-8</strong> - Universal encoding (recommended)</li>
                  <li>• <strong>UTF-16</strong> - Wide character encoding</li>
                  <li>• <strong>ISO-8859-1</strong> - Latin-1 encoding</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Line Ending Options</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• <strong>CRLF</strong> - Windows line endings (\r\n)</li>
                  <li>• <strong>LF</strong> - Unix/Mac line endings (\n)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why use Excel to CSV */}
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Convert Excel to CSV?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Universal Compatibility</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    CSV files can be opened by virtually any spreadsheet application, database, or programming language.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smaller File Size</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    CSV files are plain text and typically much smaller than Excel files, making them easier to share and store.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Import/Export</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Most databases and data processing tools support CSV format for importing and exporting data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Version Control Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    CSV files are plain text, making them easy to track changes in version control systems like Git.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

