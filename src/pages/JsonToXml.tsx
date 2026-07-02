import { TextConverter } from '../components/TextConverter';
import { jsonToXml } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function JsonToXmlPage() {
  return (
    <>
      <SEO
        title="JSON to XML Converter | Free Online JSON to XML Tool"
        description="Free online JSON to XML converter. Convert JSON data to well-formed XML instantly — ideal for SOAP services, legacy systems, and XML-based integrations."
        keywords="json to xml, json to xml converter, convert json to xml, json xml converter, free online converter"
        canonicalUrl="https://jsonformater.com/json-to-xml"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to XML Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON into well-formed XML instantly. Perfect for SOAP services, legacy enterprise systems, and any integration that consumes XML.
          </p>
        </header>

        <AdSlot slotId="json_to_xml_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="JSON Input"
            outputLabel="XML Output"
            placeholder='{"note": {"to": "Ada", "from": "Linus", "body": "Hello"}}'
            convertLabel="Convert JSON to XML"
            downloadName="converted.xml"
            uploadAccept=".json,application/json"
            inputLanguage="json"
            outputLanguage="markup"
            example={'{"note": {"to": "Ada", "from": "Linus", "body": "Hello"}}'}
            convert={jsonToXml}
          />
        </div>

        <AdSlot slotId="json_to_xml_footer" />

        <ToolContent slug="json-to-xml" />
      </div>
    </>
  );
}
