import { BookOpen, Code, Layers, Zap } from 'lucide-react';

export function Tutorials() {
  const tutorials = [
    {
      icon: BookOpen,
      title: 'Getting Started with JSON',
      description: 'Learn the basics of JSON syntax, data types, and structure. Perfect for beginners.',
      content: [
        'Understanding JSON syntax and structure',
        'Working with objects and arrays',
        'Valid data types in JSON',
        'Common JSON use cases',
        'Tools and resources for JSON development'
      ],
      level: 'Beginner',
      duration: '15 min'
    },
    {
      icon: Code,
      title: 'Advanced JSON Formatting Techniques',
      description: 'Master advanced formatting options, validation, and optimization strategies.',
      content: [
        'Pretty printing with custom indentation',
        'Minifying JSON for production',
        'Validating JSON structure and syntax',
        'Handling large JSON files efficiently',
        'Performance optimization techniques',
        'Using JSON schemas for validation'
      ],
      level: 'Advanced',
      duration: '25 min'
    },
    {
      icon: Layers,
      title: 'C# Class Generation Best Practices',
      description: 'Learn how to generate clean, maintainable C# classes from JSON data.',
      content: [
        'Understanding type mapping between JSON and C#',
        'Handling nullable types correctly',
        'Working with nested objects and collections',
        'Using JSON attributes for serialization',
        'Implementing INotifyPropertyChanged for binding',
        'Choosing between classes and records',
        'Data validation and error handling'
      ],
      level: 'Intermediate',
      duration: '30 min'
    },
    {
      icon: Zap,
      title: 'Working with Complex JSON Structures',
      description: 'Handle deeply nested objects, polymorphic data, and dynamic structures.',
      content: [
        'Navigating deeply nested JSON hierarchies',
        'Working with polymorphic data types',
        'Handling dynamic property names',
        'Flattening and restructuring JSON',
        'Merging multiple JSON objects',
        'Extracting specific data from large documents',
        'Converting between JSON and other formats'
      ],
      level: 'Advanced',
      duration: '35 min'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Tutorials
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Step-by-step guides to master JSON formatting and C# class generation
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tutorials.map((tutorial, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <tutorial.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                    {tutorial.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                    {tutorial.duration}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {tutorial.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {tutorial.description}
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  What you'll learn:
                </h3>
                <ul className="space-y-2">
                  {tutorial.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Practice?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try out these tutorials using our free JSON formatter and C# class generator tools. No registration required!
        </p>
        <a
          href="/tools"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Try Tools Now
        </a>
      </div>
    </div>
  );
}
