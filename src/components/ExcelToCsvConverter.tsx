import { useState, useCallback } from 'react';
import { Upload, Download, Copy, CheckCircle2, AlertCircle, FileCode, Settings } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExcelToCsvConverterProps {
  onCsvGenerated?: (csv: string) => void;
}

type Delimiter = ',' | ';' | '\t' | ' ' | '|';
type QuoteChar = '"' | "'" | 'none';
type Encoding = 'UTF-8' | 'UTF-16' | 'ISO-8859-1';
type LineEnding = 'CRLF' | 'LF';

interface CsvOptions {
  delimiter: Delimiter;
  quoteChar: QuoteChar;
  includeHeader: boolean;
  encoding: Encoding;
  lineEnding: LineEnding;
}

export function ExcelToCsvConverter({ onCsvGenerated }: ExcelToCsvConverterProps) {
  const [csvOutput, setCsvOutput] = useState('');
  const [csvPreview, setCsvPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [sheets, setSheets] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState(0);
  const [workbookData, setWorkbookData] = useState<XLSX.WorkBook | null>(null);

  const [options, setOptions] = useState<CsvOptions>({
    delimiter: ',',
    quoteChar: '"',
    includeHeader: true,
    encoding: 'UTF-8',
    lineEnding: 'CRLF',
  });

  const escapeValue = (value: any, quoteChar: QuoteChar, delimiter: Delimiter): string => {
    if (value === null || value === undefined) return '';
    
    const strValue = String(value);
    
    // If no quotes, return as is (but escape delimiter if present)
    if (quoteChar === 'none') {
      return strValue.replace(new RegExp(delimiter, 'g'), `\\${delimiter}`);
    }
    
    // Always quote all values when quote character is specified
    // Escape quote characters by doubling them
    const escaped = strValue.replace(new RegExp(quoteChar === '"' ? '"' : "'", 'g'), 
                                     quoteChar === '"' ? '""' : "''");
    return `${quoteChar}${escaped}${quoteChar}`;
  };

  const convertToCSV = (data: any[][], opts: CsvOptions): string => {
    if (data.length === 0) return '';

    const lineEnd = opts.lineEnding === 'CRLF' ? '\r\n' : '\n';
    const startRow = opts.includeHeader ? 0 : 1;

    const csvLines = data.slice(startRow).map(row => {
      return row.map(cell => escapeValue(cell, opts.quoteChar, opts.delimiter)).join(opts.delimiter);
    });

    return csvLines.join(lineEnd);
  };

  const processWorkbook = useCallback((workbook: XLSX.WorkBook, sheetIndex: number, opts: CsvOptions) => {
    try {
      const sheetName = workbook.SheetNames[sheetIndex];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to array of arrays
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
        header: 1,
        defval: '',
        blankrows: false 
      }) as any[][];
      
      if (jsonData.length === 0) {
        setError('The selected sheet appears to be empty');
        return;
      }

      const csvString = convertToCSV(jsonData, opts);
      setCsvOutput(csvString);
      onCsvGenerated?.(csvString);

      // Generate preview (first 5 rows)
      const previewData = jsonData.slice(0, 5);
      const previewCsv = convertToCSV(previewData, opts);
      setCsvPreview(previewCsv);
    } catch (err) {
      setError(`Error processing sheet: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [onCsvGenerated]);

  const handleFileUpload = useCallback(async (file: File) => {
    setLoading(true);
    setError('');
    setFileName(file.name);

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size exceeds 10MB limit. Please upload a smaller file.');
      setLoading(false);
      return;
    }

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (!['xlsx', 'xls', 'csv'].includes(fileExtension || '')) {
        setError('Please upload a valid Excel (.xlsx, .xls) or CSV file');
        setLoading(false);
        return;
      }

      // Handle CSV files
      if (fileExtension === 'csv') {
        const text = await file.text();
        setCsvOutput(text);
        onCsvGenerated?.(text);
        
        // Generate preview
        const lines = text.split('\n').slice(0, 5);
        setCsvPreview(lines.join('\n'));
        setLoading(false);
        return;
      }

      // Handle Excel files
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      setWorkbookData(workbook);
      setSheets(workbook.SheetNames);
      setSelectedSheet(0);
      
      processWorkbook(workbook, 0, options);
      setLoading(false);
    } catch (err) {
      setError(`Error processing file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [options, processWorkbook, onCsvGenerated]);

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
    if (csvOutput) {
      await navigator.clipboard.writeText(csvOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (csvOutput) {
      const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName.split('.')[0] || 'converted'}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleOptionsChange = (newOptions: Partial<CsvOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    setOptions(updatedOptions);
    
    // Reprocess if we have data
    if (workbookData && sheets.length > 0) {
      processWorkbook(workbookData, selectedSheet, updatedOptions);
    }
  };

  const handleSheetChange = (sheetIndex: number) => {
    setSelectedSheet(sheetIndex);
    if (workbookData) {
      processWorkbook(workbookData, sheetIndex, options);
    }
  };

  const getDelimiterLabel = (delimiter: Delimiter): string => {
    switch (delimiter) {
      case ',': return 'Comma (,)';
      case ';': return 'Semicolon (;)';
      case '\t': return 'Tab';
      case ' ': return 'Space';
      case '|': return 'Pipe (|)';
      default: return delimiter;
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            loading
              ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              ) : (
                <Upload className="w-8 h-8 text-blue-600" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {loading ? 'Processing file...' : 'Upload Excel or CSV File'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Supports .xlsx, .xls, and .csv files (max 10MB)
              </p>
            </div>

            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
              id="file-upload-csv"
            />
            <label
              htmlFor="file-upload-csv"
              className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Choose File
            </label>
          </div>
        </div>
      </div>

      {/* Sheet Selection (if multiple sheets) */}
      {sheets.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Sheet
          </label>
          <select
            value={selectedSheet}
            onChange={(e) => handleSheetChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            {sheets.map((sheet, index) => (
              <option key={index} value={index}>
                {sheet}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* CSV Format Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              CSV Format Settings
            </h3>
          </div>
          <span className="text-gray-500">
            {showSettings ? '▼' : '▶'}
          </span>
        </button>

        {showSettings && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* Delimiter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delimiter
              </label>
              <select
                value={options.delimiter}
                onChange={(e) => handleOptionsChange({ delimiter: e.target.value as Delimiter })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value={"\t"}>Tab</option>
                <option value=" ">Space</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>

            {/* Quote Character */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quote Character
              </label>
              <select
                value={options.quoteChar}
                onChange={(e) => handleOptionsChange({ quoteChar: e.target.value as QuoteChar })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value={'"'}>Double Quote (")</option>
                <option value="'">Single Quote (')</option>
                <option value="none">None</option>
              </select>
            </div>

            {/* Include Header */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="include-header"
                checked={options.includeHeader}
                onChange={(e) => handleOptionsChange({ includeHeader: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="include-header" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Include Header Row
              </label>
            </div>

            {/* Encoding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Encoding
              </label>
              <select
                value={options.encoding}
                onChange={(e) => handleOptionsChange({ encoding: e.target.value as Encoding })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="UTF-8">UTF-8</option>
                <option value="UTF-16">UTF-16</option>
                <option value="ISO-8859-1">ISO-8859-1</option>
              </select>
            </div>

            {/* Line Ending */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Line Ending
              </label>
              <select
                value={options.lineEnding}
                onChange={(e) => handleOptionsChange({ lineEnding: e.target.value as LineEnding })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="CRLF">CRLF (Windows)</option>
                <option value="LF">LF (Unix/Mac)</option>
              </select>
            </div>

            {/* Current Settings Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Current Settings:</strong> {getDelimiterLabel(options.delimiter)} delimiter, 
                {options.quoteChar === 'none' ? ' no quotes' : ` ${options.quoteChar} quotes`}, 
                {options.includeHeader ? ' with' : ' without'} header, 
                {options.encoding} encoding, 
                {options.lineEnding} line endings
              </p>
            </div>
          </div>
        )}
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

      {/* CSV Preview */}
      {csvPreview && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                CSV Preview (First 5 Rows)
              </h3>
            </div>
          </div>
          
          <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100 max-h-[200px] bg-gray-50 dark:bg-gray-900">
            {csvPreview}
          </pre>
        </div>
      )}

      {/* CSV Output */}
      {csvOutput && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                CSV Output
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {csvOutput.split('\n').length} lines
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </button>
            </div>
          </div>
          
          <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100 max-h-[400px] bg-gray-50 dark:bg-gray-900">
            {csvOutput}
          </pre>
        </div>
      )}
    </div>
  );
}

