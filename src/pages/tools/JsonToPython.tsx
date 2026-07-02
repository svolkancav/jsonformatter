import { CodeGenTool } from '../../components/CodeGenTool';
import { generatePythonClasses } from '../../utils/generators';
import { SEO } from '../../components/SEO';
import { ToolContent } from '../../components/ToolContent';
import { AdSlot } from '../../components/AdSlot';

export function JsonToPython() {
  return (
    <>
      <SEO
        title="JSON to Python Converter | Generate Python Classes from JSON"
        description="Convert JSON to Python classes instantly. Free online JSON to Python dataclass generator with type hints and nested class support. Runs in your browser."
        keywords="json to python, json to python class, json to dataclass, generate python classes, python class generator, json to pydantic"
        canonicalUrl="https://jsonformater.com/json-to-python"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to Python Class Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into Python classes instantly, with type hints and nested classes for objects and arrays.
          </p>
        </header>

        <AdSlot slotId="json_to_python_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <CodeGenTool
            language="python"
            generate={generatePythonClasses}
            outputLabel="Python Classes"
            buttonLabel="Generate Python Classes"
            rootLabel="Root Class Name"
            fileExtension="py"
            example={'{"id": 1, "name": "Ada", "active": true, "tags": ["admin"], "address": {"city": "London"}}'}
          />
        </div>

        <AdSlot slotId="json_to_python_footer" />

        <ToolContent slug="json-to-python" />
      </div>
    </>
  );
}
