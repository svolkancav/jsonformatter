import { TextConverter } from '../components/TextConverter';
import { csvToJson } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function CsvToJsonPage() {
  return (
    <>
      <SEO
        title="CSV to JSON Converter | Free Online CSV to JSON Tool"
        description="Free online CSV to JSON converter. Turn CSV rows into an array of JSON objects instantly — the header row becomes keys. Fast, private, browser-based."
        keywords="csv to json, csv to json converter, convert csv to json, csv json converter, csv to array, free online converter"
        canonicalUrl="https://jsonformater.com/csv-to-json"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CSV to JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert CSV data into a clean JSON array instantly. The header row becomes the keys and each row becomes an object — ready for your app, API, or database.
          </p>
        </header>

        <AdSlot slotId="csv_to_json_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="CSV Input"
            outputLabel="JSON Output"
            placeholder={'name,age\nAda,36\nLinus,54'}
            convertLabel="Convert CSV to JSON"
            downloadName="converted.json"
            uploadAccept=".csv,text/csv"
            inputLanguage="text"
            outputLanguage="json"
            example={'name,age\nAda,36\nLinus,54'}
            convert={csvToJson}
          />
        </div>

        <AdSlot slotId="csv_to_json_footer" />

        <ToolContent slug="csv-to-json" />
      </div>
    </>
  );
}
