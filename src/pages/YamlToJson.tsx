import { TextConverter } from '../components/TextConverter';
import { yamlToJson } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function YamlToJsonPage() {
  return (
    <>
      <SEO
        title="YAML to JSON Converter | Free Online YAML to JSON Tool"
        description="Free online YAML to JSON converter. Convert YAML config files to JSON instantly — perfect for turning Kubernetes, CI, or Docker Compose YAML into JSON your code can use."
        keywords="yaml to json, yaml to json converter, convert yaml to json, yaml json converter, yaml parser, free online converter"
        canonicalUrl="https://jsonformater.com/yaml-to-json"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            YAML to JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert YAML into valid JSON instantly. Turn Kubernetes manifests, CI pipelines, or any YAML config into the JSON your application and APIs expect.
          </p>
        </header>

        <AdSlot slotId="yaml_to_json_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="YAML Input"
            outputLabel="JSON Output"
            placeholder={'name: app\nports:\n  - 80\n  - 443\ndebug: true'}
            convertLabel="Convert YAML to JSON"
            downloadName="converted.json"
            uploadAccept=".yaml,.yml,text/yaml"
            convert={yamlToJson}
          />
        </div>

        <AdSlot slotId="yaml_to_json_footer" />

        <ToolContent slug="yaml-to-json" />
      </div>
    </>
  );
}
