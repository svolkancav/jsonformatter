import { useState, useCallback } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { CodeEditor, CodeBlock, type CodeLang } from './CodeHighlight';

interface TextConverterProps {
  inputLabel: string;
  outputLabel: string;
  placeholder: string;
  convertLabel: string;
  downloadName: string;
  uploadAccept?: string;
  /** Syntax-highlighting language for the input / output panes. */
  inputLanguage?: CodeLang;
  outputLanguage?: CodeLang;
  /** Transforms input to output; throw an Error with a helpful message on bad input. */
  convert: (input: string) => string;
}

/**
 * Reusable input -> convert -> output tool UI (paste, upload, copy, download,
 * error handling). Each tool page supplies its own `convert` function.
 */
export function TextConverter({
  inputLabel,
  outputLabel,
  placeholder,
  convertLabel,
  downloadName,
  uploadAccept = '.txt',
  inputLanguage = 'json',
  outputLanguage = 'json',
  convert,
}: TextConverterProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = useCallback(
    (value: string) => {
      setError('');
      setCopied(false);
      if (!value.trim()) {
        setError('Please enter some data to convert.');
        setOutput('');
        return;
      }
      try {
        setOutput(convert(value));
      } catch (err) {
        setOutput('');
        setError(err instanceof Error ? err.message : 'Conversion failed.');
      }
    },
    [convert],
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      const text = await file.text();
      setInput(text);
      run(text);
    },
    [run],
  );

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, downloadName]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard.');
    }
  }, [output]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      setError('Failed to read from clipboard.');
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {inputLabel}
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
                accept={uploadAccept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <CodeEditor
          value={input}
          onChange={(value) => {
            setInput(value);
            setError('');
            setOutput('');
          }}
          language={inputLanguage}
          placeholder={placeholder}
          minHeight="26rem"
        />
      </div>

      <button
        onClick={() => run(input)}
        disabled={!input.trim()}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <FileText className="w-5 h-5" />
        {convertLabel}
      </button>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">Error</p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
          </div>
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {outputLabel}
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
          <CodeBlock code={output} language={outputLanguage} minHeight="30rem" />
        </div>
      )}
    </div>
  );
}

export default TextConverter;
