import { useState } from 'react';
import { Code2, FileJson, Github, Linkedin } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { JsonFormatter } from './components/JsonFormatter';
import { CSharpGenerator } from './components/CSharpGenerator';

type Tab = 'format' | 'generate';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('format');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 dark:bg-blue-500 rounded-xl">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  JSON Tools
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Format JSON and Generate C# Classes
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

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

        <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-3">Professional JSON formatter and C# class generator tool</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/svolkancav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/svcavusoglu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
