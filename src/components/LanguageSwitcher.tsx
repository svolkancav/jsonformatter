import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';

// Languages the site offers. Add more here as localized pages are created.
const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
];

// English path -> Turkish path for pages that exist in both languages.
const EN_TO_TR: Record<string, string> = {
  '/': '/tr',
  '/json-formatter': '/tr/json-formatlayici',
  '/json-viewer': '/tr/json-goruntuleyici',
  '/json-validator': '/tr/json-dogrulayici',
  '/json-to-excel': '/tr/json-excel-cevirici',
  '/excel-to-json': '/tr/excel-json-cevirici',
  '/json-to-csv': '/tr/json-csv-cevirici',
};
const TR_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_TR).map(([en, tr]) => [tr, en]),
);

export function LanguageSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const currentLang = location.pathname === '/tr' || location.pathname.startsWith('/tr/') ? 'tr' : 'en';

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchTo = (code: string) => {
    setOpen(false);
    if (code === currentLang) return;
    const path = location.pathname;
    if (code === 'tr') {
      navigate(EN_TO_TR[path] ?? '/tr');
    } else {
      navigate(TR_TO_EN[path] ?? '/');
    }
  };

  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span>{current.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchTo(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                lang.code === currentLang
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
