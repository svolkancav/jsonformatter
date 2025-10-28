import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

export function Blog() {
  const articles = [
    {
      id: 'understanding-json-guide',
      title: 'Understanding JSON: A Complete Guide for Developers',
      excerpt: 'Learn everything about JSON from basics to advanced concepts. Understand syntax, data types, best practices, and common use cases in modern web development.',
      date: '2025-01-15',
      readTime: '8 min read',
      category: 'Tutorial'
    },
    {
      id: 'json-best-practices',
      title: 'Best Practices for JSON Data Structure Design',
      excerpt: 'Discover proven patterns and anti-patterns for designing efficient, maintainable JSON structures. Learn about naming conventions, nesting strategies, and performance optimization.',
      date: '2025-01-20',
      readTime: '10 min read',
      category: 'Best Practices'
    },
    {
      id: 'json-to-csharp-tutorial',
      title: 'How to Convert JSON to C# Classes: Step by Step Tutorial',
      excerpt: 'Complete guide to converting JSON data into C# classes. Learn about data type mapping, handling nullable values, nested objects, and arrays with practical examples.',
      date: '2025-01-25',
      readTime: '12 min read',
      category: 'Tutorial'
    },
    {
      id: 'common-json-errors',
      title: 'Common JSON Formatting Errors and How to Fix Them',
      excerpt: 'Troubleshoot the most common JSON errors developers encounter. Learn to identify and fix syntax errors, trailing commas, quote issues, and invalid data types.',
      date: '2025-02-01',
      readTime: '7 min read',
      category: 'Troubleshooting'
    },
    {
      id: 'nested-json-csharp',
      title: 'Working with Nested JSON Objects in C#',
      excerpt: 'Master the art of handling complex, deeply nested JSON structures in C#. Learn about deserialization, navigation, and best practices for working with hierarchical data.',
      date: '2025-02-10',
      readTime: '15 min read',
      category: 'Advanced'
    }
  ];

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const query = (params.get('q') || '').toLowerCase();
  const filtered = query
    ? articles.filter(a => a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query) || a.category.toLowerCase().includes(query))
    : articles;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tutorials, guides, and best practices for working with JSON and C#
        </p>
      </header>
      <AdSlot slotId="blog_header" format="horizontal" />

      <div className="mb-6">
        <form action="/blog" method="get" className="flex gap-2">
          <input name="q" defaultValue={query} placeholder="Search blog..." className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Search</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.id}`}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                Read more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <AdSlot slotId="blog_footer" />
    </div>
  );
}
