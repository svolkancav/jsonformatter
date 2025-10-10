import { useState, useEffect } from 'react';
import { Copy, CheckCircle2, Wand2, Share2, Download } from 'lucide-react';
import { ShareModal } from './ShareModal';

export function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [minified, setMinified] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState('');
  const [copiedFormatted, setCopiedFormatted] = useState(false);
  const [copiedMinified, setCopiedMinified] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const handleLoadExample = (event: CustomEvent) => {
      setJsonInput(event.detail);
      setFormatted('');
      setMinified('');
      setStats(null);
      setError('');
    };

    window.addEventListener('loadExample' as any, handleLoadExample as any);
    return () => window.removeEventListener('loadExample' as any, handleLoadExample as any);
  }, []);

  const handleFormat = () => {
    setError('');

    if (!jsonInput.trim()) {
      setError('Please enter JSON data to format');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsed, null, 2);
      const minifiedJson = JSON.stringify(parsed);

      setFormatted(formattedJson);
      setMinified(minifiedJson);

      const lines = formattedJson.split('\n').length;
      const size = new Blob([formattedJson]).size;

      setStats({
        lineCount: lines,
        characterCount: formattedJson.length,
        size: size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`,
      });
    } catch (err) {
      setError('Invalid JSON syntax. Please check your input.');
      setFormatted('');
      setMinified('');
      setStats(null);
    }
  };

  const copyToClipboard = async (text: string, type: 'formatted' | 'minified') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'formatted') {
        setCopiedFormatted(true);
        setTimeout(() => setCopiedFormatted(false), 2000);
      } else {
        setCopiedMinified(true);
        setTimeout(() => setCopiedMinified(false), 2000);
      }
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const loadExample = () => {
    const example = `{
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "roles": ["admin", "user"],
    "settings": {
      "theme": "dark",
      "notifications": true
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`;
    setJsonInput(example);
    setFormatted('');
    setMinified('');
    setStats(null);
    setError('');
  };

  const handleDownload = () => {
    const content = formatted || jsonInput;
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (!jsonInput.trim()) {
      setError('Please enter JSON data to share');
      return;
    }

    try {
      JSON.parse(jsonInput);
      setShowShareModal(true);
    } catch {
      setError('Cannot share invalid JSON. Please fix the errors first.');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON Input
            </label>
            <button
              onClick={loadExample}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              Load Example
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter your JSON here, e.g., {"name": "John", "age": 30}'
            className="w-full h-64 px-4 py-3 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none text-gray-900 dark:text-gray-100"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleFormat}
            className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Format JSON
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Save & Share
          </button>
          {(formatted || jsonInput) && (
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>

        {stats && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Lines</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{stats.lineCount}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Characters</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{stats.characterCount}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Size</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{stats.size}</p>
              </div>
            </div>
          </div>
        )}

        {formatted && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Formatted</h3>
                <button
                  onClick={() => copyToClipboard(formatted, 'formatted')}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  {copiedFormatted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="w-full h-96 px-4 py-3 font-mono text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto text-gray-900 dark:text-gray-100">
                {formatted}
              </pre>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Minified</h3>
                <button
                  onClick={() => copyToClipboard(minified, 'minified')}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  {copiedMinified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="w-full h-96 px-4 py-3 font-mono text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto text-gray-900 dark:text-gray-100 break-all">
                {minified}
              </pre>
            </div>
          </div>
        )}
      </div>

      {showShareModal && (
        <ShareModal
          jsonContent={jsonInput}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
