import { TextConverter } from '../components/TextConverter';
import { jsonToCsv } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function JsonToCsvPage() {
  return (
    <>
      <SEO
        title="JSON to CSV Converter | Free Online JSON to CSV Tool"
        description="Free online JSON to CSV converter. Turn an array of JSON objects into clean CSV instantly — keys become columns, objects become rows. Fast, private, browser-based."
        keywords="json to csv, json to csv converter, convert json to csv, json array to csv, json csv converter, free online converter"
        canonicalUrl="https://jsonformater.com/json-to-csv"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to CSV Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert a JSON array into clean CSV instantly. Each object becomes a row and each key a column — ready for Excel, Google Sheets, or a database import.
          </p>
        </header>

        <AdSlot slotId="json_to_csv_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="JSON Input"
            outputLabel="CSV Output"
            placeholder='[{"name": "Ada", "age": 36}, {"name": "Linus", "age": 54}]'
            convertLabel="Convert JSON to CSV"
            downloadName="converted.csv"
            uploadAccept=".json,application/json"
            convert={jsonToCsv}
          />
        </div>

        <AdSlot slotId="json_to_csv_footer" />

        <ToolContent slug="json-to-csv" />
      </div>
    </>
  );
}
