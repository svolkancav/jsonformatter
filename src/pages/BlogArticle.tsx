import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';

export function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const article = id ? blogArticles[id] : null;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          {article.excerpt}
        </p>
      </header>

      <div className="space-y-8">
        {article.content.sections.map((section, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-4">
              {section.content}
            </div>
            {section.code && (
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{section.code}</pre>
              </div>
            )}
            {section.subsections?.map((subsection, subIndex) => (
              <div key={subIndex} className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {subsection.title}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-4">
                  {subsection.content}
                </div>
                {subsection.code && (
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{subsection.code}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {article.relatedArticles.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.relatedArticles.map((relatedId) => {
              const related = blogArticles[relatedId];
              return related ? (
                <Link
                  key={relatedId}
                  to={`/blog/${relatedId}`}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {related.excerpt.substring(0, 100)}...
                  </p>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}
    </article>
  );
}
