import { useState } from 'react';
import { X } from 'lucide-react';
import { ProductHuntBadge } from './ProductHuntBadge';

const DISMISS_KEY = 'ph_bar_dismissed_v1';

/** Slim announcement bar under the header so every visitor sees the launch. Dismissible. */
export function ProductHuntBar() {
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });

  if (hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setHidden(true);
  };

  return (
    <div className="w-full bg-[#da552f]/10 dark:bg-[#da552f]/15 border-b border-[#da552f]/20">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 relative">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          🎉 We&apos;re live on Product Hunt — your support &amp; feedback mean a lot!
        </span>
        <ProductHuntBadge width={180} />
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ProductHuntBar;
