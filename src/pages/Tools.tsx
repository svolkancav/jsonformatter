import { useState } from 'react';
import { JsonFormatter } from '../components/JsonFormatter';
import { CSharpGenerator } from '../components/CSharpGenerator';
import { ExcelToJsonConverter } from '../components/ExcelToJsonConverter';
import { JsonToExcelConverter } from '../components/JsonToExcelConverter';
import { ToolNavigation, ToolType } from '../components/ToolNavigation';
import { SEO } from '../components/SEO';

export function Tools() {
  const [activeTool, setActiveTool] = useState<ToolType>('formatter');
  const [sharedJson, setSharedJson] = useState('');

  const handleJsonGenerated = (json: string) => {
    setSharedJson(json);
  };

  const getSEOData = () => {
    switch (activeTool) {
      case 'formatter':
        return {
          title: 'Online JSON Formatter & Validator | Format and Beautify JSON',
          description: 'Free online JSON formatter and validator. Beautify, validate, and convert your JSON data easily with our fast and secure web tool.',
          keywords: 'json formatter online, json validator, json beautifier, format json, json minifier',
          canonicalUrl: 'https://jsonformater.com/tools'
        };
      case 'excel-to-json':
        return {
          title: 'Excel to JSON Converter | Convert XLSX or CSV to JSON Online',
          description: 'Easily convert Excel or CSV files to JSON online. Upload your Excel sheet, preview JSON output, and download it instantly.',
          keywords: 'excel to json converter, convert excel to json online, csv to json, xlsx to json, free converter',
          canonicalUrl: 'https://jsonformater.com/tools?tool=excel-to-json'
        };
      case 'json-to-excel':
        return {
          title: 'JSON to Excel Converter | Export JSON to XLSX Online',
          description: 'Convert JSON data to Excel (.xlsx) instantly. Paste JSON, validate it, and download as Excel file — simple, secure, and free.',
          keywords: 'json to excel converter, convert json to excel online, export json to xlsx, json to spreadsheet',
          canonicalUrl: 'https://jsonformater.com/tools?tool=json-to-excel'
        };
      default:
        return {
          title: 'JSON Tools | Formatter, Validator & Converter',
          description: 'Professional JSON tools for formatting, validation, and conversion. Free online JSON formatter, Excel converter, and C# class generator.',
          keywords: 'json tools, json formatter, json converter, excel to json, json to excel',
          canonicalUrl: 'https://jsonformater.com/tools'
        };
    }
  };

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'formatter':
        return <JsonFormatter />;
      case 'excel-to-json':
        return <ExcelToJsonConverter onJsonGenerated={handleJsonGenerated} />;
      case 'json-to-excel':
        return <JsonToExcelConverter initialJson={sharedJson} />;
      default:
        return <JsonFormatter />;
    }
  };

  const seoData = getSEOData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={seoData.canonicalUrl}
      />
      
      <ToolNavigation activeTool={activeTool} onToolChange={setActiveTool} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTool === 'formatter' && 'Online JSON Formatter & Validator'}
            {activeTool === 'excel-to-json' && 'Excel to JSON Converter'}
            {activeTool === 'json-to-excel' && 'JSON to Excel Converter'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            {activeTool === 'formatter' && 'Free online JSON formatter and validator. Beautify, validate, and convert your JSON data easily with our fast and secure web tool.'}
            {activeTool === 'excel-to-json' && 'Easily convert Excel or CSV files to JSON online. Upload your Excel sheet, preview JSON output, and download it instantly. Perfect for developers and data analysts who need to convert spreadsheet data to JSON format for web applications, APIs, or data processing.'}
            {activeTool === 'json-to-excel' && 'Convert JSON data to Excel (.xlsx) instantly. Paste JSON, validate it, and download as Excel file — simple, secure, and free. Ideal for exporting API responses, configuration data, or any JSON structure into a readable spreadsheet format.'}
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-colors">
          {renderActiveTool()}
        </main>
      </div>
    </div>
  );
}
