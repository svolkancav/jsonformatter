import { useState } from 'react';
import { Code2, FileSpreadsheet, FileText } from 'lucide-react';

export type ToolType = 'formatter' | 'excel-to-json' | 'json-to-excel';

interface ToolNavigationProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

export function ToolNavigation({ activeTool, onToolChange }: ToolNavigationProps) {
  const tools = [
    {
      id: 'formatter' as ToolType,
      label: 'JSON Formatter',
      icon: Code2,
      description: 'Format, validate, and beautify JSON'
    },
    {
      id: 'excel-to-json' as ToolType,
      label: 'Excel to JSON',
      icon: FileSpreadsheet,
      description: 'Convert Excel/CSV to JSON'
    },
    {
      id: 'json-to-excel' as ToolType,
      label: 'JSON to Excel',
      icon: FileText,
      description: 'Convert JSON to Excel'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center">
          <nav className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              
              return (
                <button
                  key={tool.id}
                  onClick={() => onToolChange(tool.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  title={tool.description}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tool.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Mobile-friendly tool descriptions */}
        <div className="py-3 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {tools.find(tool => tool.id === activeTool)?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
