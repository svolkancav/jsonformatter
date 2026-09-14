import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { TOOLS } from '../data/toolsRegistry';

/** Big, centered tool search: type to find any tool, Enter/click to open it. */
export function ToolSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  // Every term has to match somewhere, rather than the whole query matching as
  // one contiguous substring — otherwise natural phrasings like "string
  // compare" or "json compare" find nothing even though the tool is right
  // there. Results are then ordered so a name match outranks a match that only
  // came from the description.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    const rank = (t: (typeof TOOLS)[number]) => {
      const label = t.label.toLowerCase();
      const name = t.slug.replace(/-/g, ' ');
      if (label === q || name === q) return 0;
      if (label.startsWith(q) || name.startsWith(q)) return 1;
      if (label.includes(q) || name.includes(q)) return 2;
      if (terms.every((term) => label.includes(term) || name.includes(term))) return 3;
      return 4;
    };

    return TOOLS.map((t) => ({
      tool: t,
      haystack: `${t.label} ${t.desc} ${t.slug.replace(/-/g, ' ')}`.toLowerCase(),
    }))
      .filter(({ haystack }) => terms.every((term) => haystack.includes(term)))
      .map(({ tool }) => ({ tool, rank: rank(tool) }))
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 8)
      .map(({ tool }) => tool);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => setActive(0), [query]);

  const go = (slug: string) => {
    setOpen(false);
    setQuery('');
    navigate(`/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active].slug);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const popular = ['json-formatter', 'jwt-decoder', 'json-to-csv', 'json-diff', 'base64'];

  return (
    <div className="max-w-3xl mx-auto mb-10 relative" ref={ref}>
      {/* Gradient ring wrapper makes the search bar the clear focal point */}
      <div
        className={`rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-shadow ${
          open ? 'shadow-2xl shadow-blue-500/20' : 'shadow-xl shadow-blue-500/10'
        }`}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-[14px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search 35+ JSON tools — format, convert, decode, generate…"
            aria-label="Search tools"
            className="w-full pl-14 pr-4 py-5 text-lg md:text-xl bg-transparent rounded-[14px] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Popular quick links */}
      {!query && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Popular:</span>
          {popular.map((slug) => {
            const tool = TOOLS.find((t) => t.slug === slug);
            if (!tool) return null;
            return (
              <button
                key={slug}
                onClick={() => go(slug)}
                className="px-3 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {tool.label}
              </button>
            );
          })}
        </div>
      )}

      {open && results.length > 0 && (
        <div className="absolute z-40 left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden text-left">
          {results.map((t, i) => (
            <button
              key={t.slug}
              onClick={() => go(t.slug)}
              onMouseEnter={() => setActive(i)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                i === active ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <span className="min-w-0">
                <span className="block font-medium text-gray-900 dark:text-white">{t.label}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">{t.desc}</span>
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-40 left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-left">
          No tools match “{query}”. Try “csv”, “jwt”, “yaml”, or “diff”.
        </div>
      )}
    </div>
  );
}

export default ToolSearch;
