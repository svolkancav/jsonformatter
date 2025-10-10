import { useState, useCallback } from 'react';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import * as XLSX from 'xlsx';

interface JsonToExcelConverterProps {
  initialJson?: string;
}

export function JsonToExcelConverter({ initialJson = '' }: JsonToExcelConverterProps) {
  const [jsonInput, setJsonInput] = useState(initialJson);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('converted-data.xlsx');

  const validateAndConvert = useCallback(() => {
    setError('');
    setLoading(true);

    try {
      if (!jsonInput.trim()) {
        setError('Please enter JSON data to convert');
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(jsonInput);
      
      // Ensure data is an array
      let dataArray: any[];
      if (Array.isArray(parsedData)) {
        dataArray = parsedData;
      } else if (typeof parsedData === 'object' && parsedData !== null) {
        dataArray = [parsedData];
      } else {
        setError('JSON must be an object or array of objects');
        setLoading(false);
        return;
      }

      if (dataArray.length === 0) {
        setError('JSON array is empty');
        setLoading(false);
        return;
      }

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataArray);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      // Generate Excel file
      XLSX.writeFile(workbook, fileName);
      
      setLoading(false);
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [jsonInput, fileName]);

  const handleFileUpload = useCallback(async (file: File) => {
    setError('');
    setLoading(true);

    try {
      const text = await file.text();
      setJsonInput(text);
      setFileName(`${file.name.split('.')[0]}.xlsx`);
    } catch (err) {
      setError(`Error reading file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleCopy = async () => {
    if (jsonInput) {
      await navigator.clipboard.writeText(jsonInput);
    }
  };

  const loadExample = () => {
    const exampleJson = JSON.stringify([
      {
        "Name": "John Doe",
        "Age": 30,
        "Email": "john@example.com",
        "Department": "Engineering"
      },
      {
        "Name": "Jane Smith",
        "Age": 28,
        "Email": "jane@example.com",
        "Department": "Marketing"
      },
      {
        "Name": "Bob Johnson",
        "Age": 35,
        "Email": "bob@example.com",
        "Department": "Sales"
      }
    ], null, 2);
    setJsonInput(exampleJson);
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* JSON Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            JSON Input
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={loadExample}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              Load Example
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>

        {/* File Upload Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 mb-4 transition-colors ${
            loading
              ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Upload className="w-4 h-4" />
            <span>Drag and drop JSON file here, or</span>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
              id="json-file-upload"
            />
            <label
              htmlFor="json-file-upload"
              className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
            >
              browse
            </label>
          </div>
        </div>

        {/* JSON Textarea */}
        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setError('');
          }}
          placeholder="Paste your JSON data here or upload a JSON file..."
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Convert Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Convert to Excel
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download your JSON data as an Excel (.xlsx) file
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
              placeholder="filename.xlsx"
            />
            <button
              onClick={validateAndConvert}
              disabled={loading || !jsonInput.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              {loading ? 'Converting...' : 'Download Excel'}
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
              Conversion Tips
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• JSON objects will become rows in Excel</li>
              <li>• Object keys will become column headers</li>
              <li>• Arrays of objects work best for tabular data</li>
              <li>• Complex nested objects will be flattened</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
