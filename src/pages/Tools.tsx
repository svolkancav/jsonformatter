import { useState } from 'react';
import { Code2, FileJson } from 'lucide-react';
import { JsonFormatter } from '../components/JsonFormatter';
import { CSharpGenerator } from '../components/CSharpGenerator';

type Tab = 'format' | 'generate';

export function Tools() {
  const [activeTab, setActiveTab] = useState<Tab>('format');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          JSON Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Professional tools for formatting, validating, and converting JSON data
        </p>

        <div className="flex gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setActiveTab('format')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'format'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <FileJson className="w-5 h-5" />
            Format JSON
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'generate'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Code2 className="w-5 h-5" />
            Generate C# Classes
          </button>
        </div>
      </header>

      <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-colors">
        {activeTab === 'format' ? <JsonFormatter /> : <CSharpGenerator />}
      </main>
    </div>
  );
}
