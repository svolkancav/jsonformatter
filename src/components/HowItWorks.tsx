import { Upload, Wand2, Download, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Paste Your JSON',
      description: 'Copy and paste your JSON data into our editor. Works with any valid JSON format.'
    },
    {
      icon: Wand2,
      title: 'Choose Your Action',
      description: 'Format, validate, minify your JSON or generate C# classes automatically.'
    },
    {
      icon: CheckCircle,
      title: 'Get Results Instantly',
      description: 'See formatted output or generated code immediately with syntax highlighting.'
    },
    {
      icon: Download,
      title: 'Copy or Download',
      description: 'Copy results to clipboard or download as a file. Ready to use in your projects.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Simple, fast, and efficient. Get your results in 4 easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg inline-block">
                  <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
