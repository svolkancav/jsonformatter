import { Star, Code, Database, Zap } from 'lucide-react';

export function Testimonials() {
  const useCases = [
    {
      icon: Code,
      title: 'API Development',
      description: 'Perfect for developers working with REST APIs. Quickly format API responses and generate C# models for your client applications.',
      user: 'Backend Developer'
    },
    {
      icon: Database,
      title: 'Database Migration',
      description: 'Essential tool for migrating data between systems. Validate JSON exports and generate C# entities for ORM frameworks.',
      user: 'Data Engineer'
    },
    {
      icon: Zap,
      title: 'Quick Debugging',
      description: 'Invaluable during debugging sessions. Format minified JSON responses to quickly identify data structure issues.',
      user: 'Full Stack Developer'
    }
  ];

  const testimonials = [
    {
      text: 'This tool has become an essential part of my daily workflow. The C# class generator saves me at least an hour every week!',
      author: 'Sarah M.',
      role: '.NET Developer'
    },
    {
      text: 'Clean, fast, and reliable. No more wrestling with malformed JSON or manually creating model classes.',
      author: 'Michael K.',
      role: 'Software Engineer'
    },
    {
      text: 'The privacy-first approach is fantastic. I can work with client data without worrying about security.',
      author: 'Jennifer L.',
      role: 'Consultant'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Use Cases & Testimonials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See how developers are using our tools in real-world scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg inline-block">
                <useCase.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {useCase.description}
              </p>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {useCase.user}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
