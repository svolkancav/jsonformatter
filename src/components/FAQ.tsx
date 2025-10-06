import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is JSON and why is it important?',
      answer: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format that\'s easy for humans to read and write, and easy for machines to parse and generate. It\'s the standard format for data exchange in web APIs, configuration files, and data storage. JSON is language-independent and widely supported across all programming languages.'
    },
    {
      question: 'Is my JSON data safe when using your formatter?',
      answer: 'Absolutely! All JSON processing happens entirely in your browser using client-side JavaScript. Your data never leaves your device or gets sent to any server. We don\'t store, log, or transmit any of your JSON data. This makes our tool completely safe for working with sensitive or proprietary data.'
    },
    {
      question: 'Can I format large JSON files?',
      answer: 'Yes! Our formatter is optimized to handle large JSON files efficiently. While the exact limit depends on your device\'s memory, we\'ve successfully tested files up to several megabytes in size. For extremely large files (100MB+), processing might take a few seconds, but the tool will handle it.'
    },
    {
      question: 'How does the C# class generator work?',
      answer: 'Our C# class generator analyzes your JSON structure and automatically creates corresponding C# classes with appropriate data types, properties, and attributes. It handles nested objects, arrays, and complex data structures. The generated code follows C# naming conventions and includes JSON serialization attributes for seamless integration with libraries like Newtonsoft.Json or System.Text.Json.'
    },
    {
      question: 'What if my JSON has errors?',
      answer: 'Our formatter includes built-in validation that will detect and highlight JSON syntax errors. When you paste invalid JSON, you\'ll see specific error messages indicating what\'s wrong and where the issue is located. This helps you quickly identify and fix problems like missing commas, unclosed brackets, or invalid values.'
    },
    {
      question: 'Can I use this tool for commercial projects?',
      answer: 'Yes! Our JSON formatter and C# class generator are completely free to use for both personal and commercial projects. There are no restrictions, licenses, or attribution requirements. Feel free to use it in your development workflow, whether you\'re building a hobby project or enterprise software.'
    },
    {
      question: 'Does the tool work offline?',
      answer: 'Once the page is loaded, the core functionality works without an internet connection since all processing happens in your browser. However, you\'ll need an internet connection to initially load the website. For true offline use, you can bookmark the page, and modern browsers will cache the necessary files.'
    },
    {
      question: 'What JSON formatting options are available?',
      answer: 'We offer multiple formatting options: Pretty Print with customizable indentation (2 or 4 spaces), Minify to remove all whitespace for smaller file sizes, and Validate to check for syntax errors. You can also sort object keys alphabetically and choose between different quote styles.'
    },
    {
      question: 'How accurate is the C# class generation?',
      answer: 'The C# class generator is highly accurate and handles most JSON structures correctly. It properly infers data types (string, int, bool, double, DateTime, etc.), handles nullable values, and creates nested classes for complex objects. However, for ambiguous cases (like numeric strings), you may need to manually adjust the generated code.'
    },
    {
      question: 'Can I suggest features or report bugs?',
      answer: 'Absolutely! We welcome feedback and suggestions. You can reach out through our contact page or connect with us on GitHub. We regularly update the tool based on user feedback and are always looking to improve the experience for developers.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about our JSON tools
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
