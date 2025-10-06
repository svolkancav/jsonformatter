import { CheckCircle } from 'lucide-react';

export function WhyUse() {
  const advantages = [
    'No installation or setup required - works directly in your browser',
    'Completely free with no hidden costs or premium tiers',
    'Privacy-focused - all data processing happens locally',
    'Fast and efficient - optimized for large JSON files',
    'Developer-friendly with intuitive interface',
    'Regular updates and improvements',
    'Supports all valid JSON formats and structures',
    'Generate C# classes with proper naming conventions',
    'Dark mode support for comfortable coding sessions',
    'Mobile responsive - use on any device',
    'No ads interrupting your workflow',
    'Open source friendly community'
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Use Our JSON Tools?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Built by developers, for developers. Here's what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{advantage}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
