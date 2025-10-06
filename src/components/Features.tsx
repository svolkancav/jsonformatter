import { Zap, Lock, Code2, Download, Eye, Smartphone } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process JSON data instantly with our optimized algorithms. No waiting, no delays.'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'All processing happens in your browser. Your data never leaves your device.'
    },
    {
      icon: Code2,
      title: 'Smart Code Generation',
      description: 'Generate clean, production-ready C# classes with proper naming conventions and types.'
    },
    {
      icon: Eye,
      title: 'Syntax Highlighting',
      description: 'Beautiful code highlighting makes it easy to read and understand your JSON structure.'
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Copy to clipboard or download as files. Multiple export formats supported.'
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      description: 'Fully responsive design. Use on desktop, tablet, or mobile devices seamlessly.'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to work with JSON data efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg inline-block">
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
