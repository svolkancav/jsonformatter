import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { blogArticles } from '../data/blogArticles';

export function Blog() {
  // Derive the listing straight from the article data (newest first) so adding
  // a new entry to blogArticles.ts automatically lists it here — no duplication.
  const articles = Object.values(blogArticles)
    .map(({ id, title, excerpt, date, readTime, category }) => ({ id, title, excerpt, date, readTime, category }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

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
