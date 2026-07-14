import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { getFavorites } from '../utils/favorites';
import { TOOLS } from '../data/toolsRegistry';

const BY_SLUG = new Map(TOOLS.map((t) => [t.slug, t]));

/** Quick-access grid of the user's pinned tools. Renders nothing when empty. */
export function FavoriteTools() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const load = () => setSlugs(getFavorites());
    load();
    window.addEventListener('jf-favorites-changed', load);
    return () => window.removeEventListener('jf-favorites-changed', load);
  }, []);

  const tools = slugs.map((s) => BY_SLUG.get(s)).filter(Boolean);
  if (tools.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
          <Star className="w-5 h-5 text-amber-500" fill="currentColor" /> Your favorite tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tools.map((t) => (
            <Link
              key={t!.slug}
              to={`/${t!.slug}`}
              className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {t!.label}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FavoriteTools;
