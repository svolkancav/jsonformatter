import { TextConverter } from '../components/TextConverter';
import { xmlToJson } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function XmlToJsonPage() {
  return (
    <>
      <SEO
        title="XML to JSON Converter | Free Online XML to JSON Tool"
        description="Free online XML to JSON converter. Convert XML documents to JSON instantly — turn SOAP responses, RSS feeds, and legacy XML into JSON your code can use."
        keywords="xml to json, xml to json converter, convert xml to json, xml json converter, xml parser, free online converter"
        canonicalUrl="https://jsonformater.com/xml-to-json"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            XML to JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert XML into clean JSON instantly. Turn SOAP responses, RSS feeds, and legacy XML documents into the JSON your application and APIs expect.
          </p>
        </header>

        <AdSlot slotId="xml_to_json_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="XML Input"
            outputLabel="JSON Output"
            placeholder={'<note>\n  <to>Ada</to>\n  <from>Linus</from>\n</note>'}
            convertLabel="Convert XML to JSON"
            downloadName="converted.json"
            uploadAccept=".xml,text/xml,application/xml"
            inputLanguage="markup"
            outputLanguage="json"
            convert={xmlToJson}
          />
        </div>

        <AdSlot slotId="xml_to_json_footer" />

        <ToolContent slug="xml-to-json" />
      </div>
    </>
  );
}
