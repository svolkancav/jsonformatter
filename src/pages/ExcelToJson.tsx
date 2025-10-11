import { ExcelToJsonConverter } from '../components/ExcelToJsonConverter';
import { SEO } from '../components/SEO';

export function ExcelToJsonPage() {
  return (
    <>
      <SEO
        title="Free Online Excel to JSON Converter"
        description="Convert Excel (.xlsx or .csv) files to JSON instantly with our free online converter tool."
        keywords="free excel to json converter, online excel to json, xlsx to json converter, csv to json converter, excel json converter, free online converter"
        canonicalUrl="https://jsonformater.com/excel-to-json"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Free Online Excel to JSON Converter
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Convert Excel (.xlsx or .csv) files to JSON instantly with our free online converter tool.
            </p>
          </header>

          <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <ExcelToJsonConverter />
          </main>

          {/* Features Section */}
          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Drag & Drop Upload</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Simply drag and drop your Excel or CSV file to start the conversion process.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Supports .xlsx, .xls, and .csv files. Convert any spreadsheet format to JSON.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preview & Copy</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Preview the JSON output with syntax highlighting and copy or download easily.
              </p>
            </div>
          </section>

          {/* How it works */}
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to Convert Excel to JSON</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Excel File</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Upload your Excel (.xlsx, .xls) or CSV file using drag & drop or file picker.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Automatic Conversion</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our tool automatically parses your spreadsheet and converts it to JSON format.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download JSON</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Copy the JSON to clipboard or download as a .json file for your projects.
                </p>
              </div>
            </div>
          </section>

          {/* Supported formats */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Supported File Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">XLSX</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Excel 2007+</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Modern Excel format (.xlsx) with full support for all features.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">XLS</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Excel 97-2003</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Legacy Excel format (.xls) for older spreadsheet files.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">CSV</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Comma Separated</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  CSV files (.csv) with comma-separated values support.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
