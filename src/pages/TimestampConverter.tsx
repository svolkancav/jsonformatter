import { useState } from 'react';
import { TextConverter } from '../components/TextConverter';
import { timestampToHuman, dateToTimestamp } from '../utils/devTools';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function TimestampConverterPage() {
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');

  return (
    <>
      <SEO
        title="Unix Timestamp Converter | Epoch to Date & Date to Epoch"
        description="Free online Unix timestamp converter. Convert an epoch timestamp (seconds or milliseconds) to a human-readable date, or a date back to a Unix timestamp. Runs in your browser."
        keywords="unix timestamp converter, epoch converter, timestamp to date, date to timestamp, epoch to date, unix time, convert timestamp"
        canonicalUrl="https://jsonformater.com/timestamp-converter"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Unix Timestamp Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert a Unix epoch timestamp to a readable date, or a date back to a timestamp. Handles both seconds and milliseconds.
          </p>
        </header>

        <AdSlot slotId="timestamp_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 mb-6">
            {([['toDate', 'Timestamp → Date'], ['toTimestamp', 'Date → Timestamp']] as const).map(
              ([m, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === m
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>

          <TextConverter
            key={mode}
            inputLabel={mode === 'toDate' ? 'Unix Timestamp' : 'Date'}
            outputLabel="Result"
            placeholder={mode === 'toDate' ? '1700000000' : '2026-07-01T10:00:00Z'}
            convertLabel={mode === 'toDate' ? 'Convert to Date' : 'Convert to Timestamp'}
            downloadName="timestamp.txt"
            inputLanguage="text"
            outputLanguage="text"
            example={mode === 'toDate' ? '1700000000' : '2026-07-01T10:00:00Z'}
            convert={mode === 'toDate' ? timestampToHuman : dateToTimestamp}
          />
        </div>

        <AdSlot slotId="timestamp_footer" />

        <ToolContent slug="timestamp-converter" />
      </div>
    </>
  );
}
