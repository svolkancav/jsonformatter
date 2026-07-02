import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';

type Lang = 'en' | 'tr' | 'de' | 'es';

const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'es', label: 'Español', short: 'ES' },
];

// Each group holds the equivalent path per language for the same tool.
const PAGE_GROUPS: Partial<Record<Lang, string>>[] = [
  { en: '/', tr: '/tr', de: '/de', es: '/es' },
  { en: '/json-formatter', tr: '/tr/json-formatlayici', de: '/de/json-formatierer', es: '/es/formateador-json' },
  { en: '/json-viewer', tr: '/tr/json-goruntuleyici', de: '/de/json-betrachter', es: '/es/visor-json' },
  { en: '/json-to-csv', tr: '/tr/json-csv-cevirici', de: '/de/json-zu-csv', es: '/es/json-a-csv' },
  { en: '/json-to-excel', tr: '/tr/json-excel-cevirici', de: '/de/json-zu-excel', es: '/es/json-a-excel' },
  { en: '/json-validator', tr: '/tr/json-dogrulayici' },
  { en: '/excel-to-json', tr: '/tr/excel-json-cevirici' },
];

const HUB: Record<Lang, string> = { en: '/', tr: '/tr', de: '/de', es: '/es' };

function detectLang(pathname: string): Lang {
  if (pathname === '/tr' || pathname.startsWith('/tr/')) return 'tr';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  return 'en';
}

export function LanguageSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const currentLang = detectLang(location.pathname);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchTo = (code: Lang) => {
    setOpen(false);
    if (code === currentLang) return;
    const group = PAGE_GROUPS.find((g) => Object.values(g).includes(location.pathname));
    navigate(group?.[code] ?? HUB[code]);
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
