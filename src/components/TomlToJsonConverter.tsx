import { useState, useCallback } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import * as toml from 'toml';

interface TomlToJsonConverterProps {
  onJsonGenerated?: (json: string) => void;
}

export function TomlToJsonConverter({ onJsonGenerated }: TomlToJsonConverterProps) {
  const [tomlInput, setTomlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prettyPrint, setPrettyPrint] = useState(true);

  const validateAndConvert = useCallback(() => {
    setError('');
    setLoading(true);
    setCopied(false);

    try {
      if (!tomlInput.trim()) {
        setError('Please enter TOML data to convert');
        setLoading(false);
        return;
      }

      // Parse TOML to object
      const parsedData = toml.parse(tomlInput);
      
      // Convert to JSON
      const jsonString = prettyPrint 
        ? JSON.stringify(parsedData, null, 2)
        : JSON.stringify(parsedData);
      
      setJsonOutput(jsonString);
      onJsonGenerated?.(jsonString);
      setLoading(false);
    } catch (err) {
      setError(`Invalid TOML: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [tomlInput, prettyPrint, onJsonGenerated]);

  const handleFileUpload = useCallback(async (file: File) => {
    setLoading(true);
    setError('');
    setCopied(false);

    try {
      const text = await file.text();
      setTomlInput(text);
      
      // Auto-convert after upload
      setTimeout(() => {
        try {
          const parsedData = toml.parse(text);
          const jsonString = prettyPrint 
            ? JSON.stringify(parsedData, null, 2)
            : JSON.stringify(parsedData);
          setJsonOutput(jsonString);
          onJsonGenerated?.(jsonString);
          setLoading(false);
        } catch (parseErr) {
          setError(`TOML parsing error: ${parseErr instanceof Error ? parseErr.message : 'Unknown error'}`);
          setLoading(false);
        }
      }, 100);
    } catch (err) {
      setError(`File read error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [prettyPrint, onJsonGenerated]);

  const handleDownload = useCallback(() => {
    if (!jsonOutput) return;

    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [jsonOutput]);

  const handleCopy = useCallback(async () => {
    if (!jsonOutput) return;

    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  }, [jsonOutput]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTomlInput(text);
    } catch (err) {
      setError('Failed to read from clipboard');
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            TOML Input
          </label>
          <div className="flex gap-2">
            <button
              onClick={handlePaste}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 transition-colors"
            >
              Paste
            </button>
            <label className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded text-blue-700 dark:text-blue-300 cursor-pointer transition-colors flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Upload
              <input
                type="file"
                accept=".toml,text/toml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <textarea
          value={tomlInput}
          onChange={(e) => {
            setTomlInput(e.target.value);
            setError('');
            setJsonOutput('');
          }}
          placeholder='name = "John"
age = 30
city = "New York"'
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none"
        />
      </div>

      {/* Options */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={prettyPrint}
            onChange={(e) => setPrettyPrint(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          <span>Pretty print (formatted JSON)</span>
        </label>
      </div>

      {/* Convert Button */}
      <button
        onClick={validateAndConvert}
        disabled={loading || !tomlInput.trim()}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Converting...
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            Convert TOML to JSON
          </>
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">Error</p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Output Section */}
      {jsonOutput && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              JSON Output
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 rounded text-green-700 dark:text-green-300 transition-colors flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Download
              </button>
            </div>
          </div>
          <textarea
            value={jsonOutput}
            readOnly
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none"
          />
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">About TOML</h3>
        <p className="text-xs text-blue-800 dark:text-blue-400">
          TOML (Tom's Obvious Minimal Language) is a configuration file format that's easy to read due to obvious semantics. 
          It's commonly used for configuration files in projects like Cargo (Rust), Poetry (Python), and many others.
        </p>
      </div>
    </div>
  );
}

