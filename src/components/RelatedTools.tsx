import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedTools } from '../data/toolsRegistry';

interface RelatedToolsProps {
  slug: string;
}

/** Renders a grid of related-tool links for internal linking and discovery. */
export function RelatedTools({ slug }: RelatedToolsProps) {
  const related = getRelatedTools(slug);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            to={`/${tool.slug}`}
            className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tool.label}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;
