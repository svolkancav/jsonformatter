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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.slug.replace(/-/g, ' ').includes(q),
    ).slice(0, 8);
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

  return (
    <div className="max-w-2xl mx-auto mb-8 relative" ref={ref}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search 35+ tools — format, convert, decode, generate…"
          aria-label="Search tools"
          className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

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
