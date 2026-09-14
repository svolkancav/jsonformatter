import { useMemo, useState } from 'react';
import { GitCompare, AlertCircle, Copy, CheckCircle, Equal } from 'lucide-react';
import { textDiff, collapseUnchanged, toUnifiedText, type DiffRow } from '../utils/textDiff';
import { CodeEditor } from '../components/CodeHighlight';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

const EXAMPLE_LEFT = `id,name,role
1,Ada Lovelace,admin
2,Alan Turing,editor
3,Grace Hopper,viewer`;

const EXAMPLE_RIGHT = `id,name,role
1,Ada Lovelace,admin
2,Alan Turing,admin
4,Katherine Johnson,viewer`;

const ROW_STYLES: Record<string, { row: string; marker: string; sign: string }> = {
  add: {
    row: 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-300',
    marker: 'text-green-600 dark:text-green-400',
    sign: '+',
  },
  remove: {
    row: 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300',
    marker: 'text-red-600 dark:text-red-400',
    sign: '-',
  },
  equal: {
    row: 'text-gray-700 dark:text-gray-300',
    marker: 'text-gray-400 dark:text-gray-600',
    sign: ' ',
  },
};

export function TextDiffPage() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [compared, setCompared] = useState<{ left: string; right: string } | null>(null);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [hideUnchanged, setHideUnchanged] = useState(false);
  const [copied, setCopied] = useState(false);

  // Derived from the last comparison rather than computed in the click handler,
  // so toggling an option re-diffs the same inputs instead of going stale.
  const { result, error } = useMemo(() => {
    if (!compared) return { result: null, error: '' };
    try {
      return {
        result: textDiff(compared.left, compared.right, { ignoreCase, ignoreWhitespace }),
        error: '',
      };
    } catch (e) {
      return { result: null, error: e instanceof Error ? e.message : 'Comparison failed.' };
    }
  }, [compared, ignoreCase, ignoreWhitespace]);

  const rows: DiffRow[] = useMemo(() => {
    if (!result) return [];
    return hideUnchanged
      ? collapseUnchanged(result.lines)
      : result.lines.map((line) => ({ kind: 'line', line }));
  }, [result, hideUnchanged]);

  const tryExample = () => {
    setLeft(EXAMPLE_LEFT);
    setRight(EXAMPLE_RIGHT);
    setCompared({ left: EXAMPLE_LEFT, right: EXAMPLE_RIGHT });
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(toUnifiedText(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title="Text Diff | Free Online String & Text Compare Tool"
        description="Free online text diff tool. Compare two strings or text blocks line by line and see exactly what was added, removed, or changed. Runs entirely in your browser."
        keywords="text diff, string compare, compare two strings, text compare, diff checker, string comparison tool, compare text online, text difference"
        canonicalUrl="https://jsonformater.com/text-diff"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Text Diff &amp; String Compare
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare two strings or blocks of text line by line and see exactly what was added,
            removed, or changed.
          </p>
        </header>

        <AdSlot slotId="text_diff_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="flex justify-end mb-3">
            <button
              onClick={tryExample}
              className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded text-blue-700 dark:text-blue-300 transition-colors"
            >
              Try Example
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original (left)
              </label>
              <CodeEditor
                value={left}
                onChange={setLeft}
                language="text"
                placeholder="Paste the original text…"
                minHeight="20rem"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Changed (right)
              </label>
              <CodeEditor
                value={right}
                onChange={setRight}
                language="text"
                placeholder="Paste the changed text…"
                minHeight="20rem"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {[
              { id: 'ignore-case', label: 'Ignore case', checked: ignoreCase, set: setIgnoreCase },
              { id: 'ignore-whitespace', label: 'Ignore whitespace', checked: ignoreWhitespace, set: setIgnoreWhitespace },
              { id: 'hide-unchanged', label: 'Hide unchanged lines', checked: hideUnchanged, set: setHideUnchanged },
            ].map((option) => (
              <label key={option.id} htmlFor={option.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.checked}
                  onChange={(e) => option.set(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {option.label}
              </label>
            ))}
          </div>

          <button
            onClick={() => setCompared({ left, right })}
            disabled={!left.trim() || !right.trim()}
            className="mt-6 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <GitCompare className="w-5 h-5" />
            Compare Text
          </button>

          {error && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {result && result.identical && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <Equal className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700 dark:text-green-400">
                The two texts are identical
                {ignoreCase || ignoreWhitespace ? ' under the options you selected' : ''}.
              </p>
            </div>
          )}

          {result && !result.identical && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-medium">
                    +{result.added} added
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 font-medium">
                    −{result.removed} removed
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {result.unchanged} unchanged
                  </span>
                </div>
                <button
                  onClick={copyResult}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy diff'}
                </button>
              </div>

              <div
                className="overflow-auto rounded-lg border border-gray-300 dark:border-gray-700 font-mono text-sm leading-relaxed bg-gray-50 dark:bg-gray-900"
                style={{ maxHeight: '75vh' }}
              >
                {rows.map((row, index) =>
                  row.kind === 'gap' ? (
                    <div
                      key={`gap-${index}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 border-y border-gray-200 dark:border-gray-700"
                    >
                      ⋯ {row.count} unchanged {row.count === 1 ? 'line' : 'lines'}
                    </div>
                  ) : (
                    <div key={`line-${index}`} className={`flex ${ROW_STYLES[row.line.op].row}`}>
                      <span className="w-12 flex-shrink-0 px-2 text-right text-xs text-gray-400 dark:text-gray-600 select-none">
                        {row.line.leftNo ?? ''}
                      </span>
                      <span className="w-12 flex-shrink-0 px-2 text-right text-xs text-gray-400 dark:text-gray-600 select-none border-r border-gray-200 dark:border-gray-700">
                        {row.line.rightNo ?? ''}
                      </span>
                      <span className={`w-5 flex-shrink-0 text-center select-none ${ROW_STYLES[row.line.op].marker}`}>
                        {ROW_STYLES[row.line.op].sign}
                      </span>
                      <span className="flex-1 pr-3 whitespace-pre-wrap break-words">
                        {row.line.text || ' '}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        <AdSlot slotId="text_diff_footer" />

        <ToolContent slug="text-diff" />
      </div>
    </>
  );
}
