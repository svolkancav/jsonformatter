import { useMemo } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-php';

export type CodeLang =
  | 'json'
  | 'yaml'
  | 'markup'
  | 'toml'
  | 'csharp'
  | 'typescript'
  | 'go'
  | 'python'
  | 'rust'
  | 'kotlin'
  | 'php'
  | 'csv'
  | 'text';

// Above this size we skip syntax highlighting so large inputs/outputs stay fast.
const MAX_HIGHLIGHT = 100_000;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(code: string, language: CodeLang): string {
  const grammar = Prism.languages[language];
  if (!grammar || code.length > MAX_HIGHLIGHT) return escapeHtml(code);
  try {
    return Prism.highlight(code, grammar, language);
  } catch {
    return escapeHtml(code);
  }
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: CodeLang;
  placeholder?: string;
  minHeight?: string;
}

/** Large, syntax-highlighted, editable input. Falls back to a plain textarea for huge input. */
export function CodeEditor({
  value,
  onChange,
  language = 'json',
  placeholder,
  minHeight = '24rem',
}: CodeEditorProps) {
  if (value.length > MAX_HIGHLIGHT) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="code-surface w-full rounded-lg border border-gray-300 dark:border-gray-700 font-mono text-sm p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ minHeight, maxHeight: '75vh' }}
      />
    );
  }

  return (
    <div
      className="code-surface rounded-lg border border-gray-300 dark:border-gray-700 overflow-auto resize-y focus-within:ring-2 focus-within:ring-blue-500"
      style={{ minHeight, maxHeight: '75vh' }}
    >
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) => highlight(code, language)}
        placeholder={placeholder}
        padding={16}
        textareaClassName="code-input-area"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: 14,
          minHeight,
        }}
      />
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: CodeLang;
  minHeight?: string;
}

/** Large, syntax-highlighted, read-only output. */
export function CodeBlock({ code, language = 'json', minHeight = '28rem' }: CodeBlockProps) {
  const html = useMemo(() => highlight(code, language), [code, language]);
  return (
    <pre
      className="code-surface overflow-auto rounded-lg border border-gray-300 dark:border-gray-700 p-4 font-mono text-sm leading-relaxed"
      style={{ minHeight, maxHeight: '75vh' }}
    >
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: html || '' }}
      />
    </pre>
  );
}
