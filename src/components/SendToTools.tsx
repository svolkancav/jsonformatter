import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export interface SendTarget {
  path: string;
  label: string;
}

interface SendToToolsProps {
  /** The value to hand off (prefilled into the target tool). */
  value: string;
  targets: SendTarget[];
  label?: string;
}

/** Renders "open this result in another tool" buttons that carry the value via router state. */
export function SendToTools({ value, targets, label = 'Send to' }: SendToToolsProps) {
  const navigate = useNavigate();
  if (!value || targets.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}:</span>
      {targets.map((t) => (
        <button
          key={t.path}
          onClick={() => navigate(t.path, { state: { prefill: value } })}
          className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {t.label}
          <ArrowUpRight className="w-3 h-3" />
        </button>
      ))}
    </div>
  );
}

export default SendToTools;
