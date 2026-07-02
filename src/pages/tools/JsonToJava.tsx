import { CodeGenTool } from '../../components/CodeGenTool';
import { generateJavaClasses } from '../../utils/generators';
import { SEO } from '../../components/SEO';
import { ToolContent } from '../../components/ToolContent';
import { AdSlot } from '../../components/AdSlot';

export function JsonToJava() {
  return (
    <>
      <SEO
        title="JSON to Java Converter | Generate Java Classes from JSON"
        description="Convert JSON to Java classes instantly. Free online JSON to Java POJO generator with correct types and nested class support. Runs entirely in your browser."
        keywords="json to java, json to java class, json to pojo, generate java classes, java class generator, json to java object"
        canonicalUrl="https://jsonformater.com/json-to-java"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to Java Class Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into Java classes (POJOs) instantly, with correct types and nested classes for objects and arrays.
          </p>
        </header>

        <AdSlot slotId="json_to_java_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <CodeGenTool
            language="csharp"
            generate={generateJavaClasses}
            outputLabel="Java Classes"
            buttonLabel="Generate Java Classes"
            rootLabel="Root Class Name"
            fileExtension="java"
            example={'{"id": 1, "name": "Ada", "active": true, "tags": ["admin"], "address": {"city": "London"}}'}
          />
        </div>

        <AdSlot slotId="json_to_java_footer" />

        <ToolContent slug="json-to-java" />
      </div>
    </>
  );
}
