import { TextConverter } from '../components/TextConverter';
import { jsonToYaml } from '../utils/dataConverters';
import { SEO } from '../components/SEO';
import { ToolContent } from '../components/ToolContent';
import { AdSlot } from '../components/AdSlot';

export function JsonToYamlPage() {
  return (
    <>
      <SEO
        title="JSON to YAML Converter | Free Online JSON to YAML Tool"
        description="Free online JSON to YAML converter. Convert JSON data to clean, readable YAML instantly — perfect for config files, Kubernetes, CI pipelines, and Docker Compose."
        keywords="json to yaml, json to yaml converter, convert json to yaml, yaml converter, json yaml, free online converter"
        canonicalUrl="https://jsonformater.com/json-to-yaml"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            JSON to YAML Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Convert JSON to clean, readable YAML instantly. Ideal for Kubernetes manifests, CI/CD pipelines, Docker Compose, and any human-edited configuration.
          </p>
        </header>

        <AdSlot slotId="json_to_yaml_header" format="horizontal" />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <TextConverter
            inputLabel="JSON Input"
            outputLabel="YAML Output"
            placeholder='{"name": "app", "ports": [80, 443], "debug": true}'
            convertLabel="Convert JSON to YAML"
            downloadName="converted.yaml"
            uploadAccept=".json,application/json"
            inputLanguage="json"
            outputLanguage="yaml"
            example={'{"name": "app", "ports": [80, 443], "debug": true}'}
            convert={jsonToYaml}
          />
        </div>

        <AdSlot slotId="json_to_yaml_footer" />

        <ToolContent slug="json-to-yaml" />
      </div>
    </>
  );
}
