import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { getHistory, clearHistory, type HistoryItem } from '../utils/history';

/** Shows the visitor's recent tool activity (from localStorage). Renders nothing when empty. */
export function RecentHistory() {
  const navigate = useNavigate();
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const load = () => setItems(getHistory());
    load();
    window.addEventListener('jf-history-changed', load);
    return () => window.removeEventListener('jf-history-changed', load);
  }, []);

  if (items.length === 0) return null;

  const open = (item: HistoryItem) => {
    navigate(item.toolPath, { state: { prefill: item.input } });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <History className="w-5 h-5" /> Recent
          </h2>
          <button
            onClick={() => clearHistory()}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Stored only in your browser — nothing is uploaded. Click an item to reopen it.
        </p>
        <ul className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => open(item)}
                className="group w-full text-left py-3 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.toolLabel}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono truncate">{item.preview}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RecentHistory;
