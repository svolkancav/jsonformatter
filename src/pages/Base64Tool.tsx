import { useState } from 'react';
import { TextConverter } from '../components/TextConverter';
import { base64Encode, base64Decode } from '../utils/devTools';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function Base64ToolPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  return (
    <>
      <SEO
        title="Base64 Encode & Decode | Free Online Base64 Converter"
        description="Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 to text instantly. UTF-8 safe, runs entirely in your browser."
        keywords="base64, base64 encode, base64 decode, base64 converter, base64 encoder, base64 decoder, encode decode base64 online"
        canonicalUrl="https://jsonformater.com/base64"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Base64 Encode & Decode
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Encode text to Base64 or decode Base64 back to text instantly. UTF-8 safe and 100% in your browser.
          </p>
        </header>

        <AdSlot slotId="base64_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 mb-6">
            {(['encode', 'decode'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === m
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {m === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
              </button>
            ))}
          </div>

          <TextConverter
            key={mode}
            inputLabel={mode === 'encode' ? 'Text Input' : 'Base64 Input'}
            outputLabel={mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            placeholder={mode === 'encode' ? 'Hello, world!' : 'SGVsbG8sIHdvcmxkIQ=='}
            convertLabel={mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            downloadName={mode === 'encode' ? 'encoded.txt' : 'decoded.txt'}
            inputLanguage="text"
            outputLanguage="text"
            example={mode === 'encode' ? 'Hello, world!' : 'SGVsbG8sIHdvcmxkIQ=='}
            convert={mode === 'encode' ? base64Encode : base64Decode}
          />
        </div>

        <AdSlot slotId="base64_footer" />

        <ToolContent slug="base64" />
      </div>
    </>
  );
}
