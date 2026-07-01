import { useState } from 'react';
import { Code2, Copy, Download, CheckCircle } from 'lucide-react';
import { CodeEditor, CodeBlock, type CodeLang } from './CodeHighlight';

interface CodeGenToolProps {
  /** Output language for syntax highlighting. */
  language: CodeLang;
  /** Generator: (json, rootName) => source code. Throws on invalid JSON. */
  generate: (json: string, rootName: string) => string;
  outputLabel: string;
  buttonLabel: string;
  rootLabel: string;
  defaultRoot?: string;
  fileExtension: string;
}

/** Shared "JSON in → generated source out" tool used by the code generators. */
export function CodeGenTool({
  language,
  generate,
  outputLabel,
  buttonLabel,
  rootLabel,
  defaultRoot = 'Root',
  fileExtension,
}: CodeGenToolProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [rootName, setRootName] = useState(defaultRoot);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Please enter JSON data.');
      return;
    }
    try {
      setOutput(generate(input, rootName || defaultRoot));
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rootName || defaultRoot}.${fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {rootLabel}
        </label>
        <input
          type="text"
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          placeholder={defaultRoot}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JSON Input
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="json"
            placeholder='{"name": "John", "age": 30}'
            minHeight="28rem"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {outputLabel}
            </label>
            {output && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            )}
          </div>
          <CodeBlock code={output} language={language} minHeight="28rem" />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleConvert}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <Code2 className="w-5 h-5" />
          {buttonLabel}
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError('');
            setRootName(defaultRoot);
          }}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default CodeGenTool;
