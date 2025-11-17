import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();
  const toolsRef = useRef<HTMLDivElement>(null);

  const mainNavItems = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const toolsItems = [
    { path: '/json-formatter', label: 'JSON Formatter' },
    { path: '/json-viewer', label: 'JSON Viewer' },
    { path: '/json-blob-viewer', label: 'JSON Blob Viewer' },
    { path: '/json-validator', label: 'JSON Validator' },
    { path: '/json-to-excel', label: 'JSON to Excel' },
    { path: '/excel-to-json', label: 'Excel to JSON' },
    { path: '/excel-to-xml', label: 'Excel to XML' },
    { path: '/excel-to-csv', label: 'Excel to CSV' },
    { path: '/json-to-toml', label: 'JSON to TOML' },
    { path: '/toml-to-json', label: 'TOML to JSON' },
    { path: '/json-to-toon', label: 'JSON to TOON' },
    { path: '/toon-to-json', label: 'TOON to JSON' },
    { path: '/json-to-csharp', label: 'JSON to C#' },
    { path: '/json-to-typescript', label: 'JSON to TypeScript' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = toolsItems.some(item => isActive(item.path));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    if (toolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toolsOpen]);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg w-10 h-10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="whitespace-nowrap">JSON Formatter</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                  isToolsActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 max-h-96 overflow-y-auto">
                  {toolsItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setToolsOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-2 w-10 h-10 flex items-center justify-center">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Tools Section */}
            <div className="mt-2">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                  isToolsActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-200 ${
                toolsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-4 pt-2 space-y-1">
                  {toolsItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        setToolsOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
