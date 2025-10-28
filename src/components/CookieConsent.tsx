import { useEffect, useState } from 'react';

type Consent = {
  analytics: boolean;
  ads: boolean;
};

const CONSENT_KEY = 'jf_cookie_consent_v1';

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) as Consent : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: consent }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>(() => loadConsent() ?? { analytics: false, ads: false });

  useEffect(() => {
    if (!loadConsent()) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener('open-cookie-consent', onOpen as EventListener);
    return () => window.removeEventListener('open-cookie-consent', onOpen as EventListener);
  }, []);

  const acceptAll = () => {
    const c = { analytics: true, ads: true };
    setConsent(c);
    saveConsent(c);
    setOpen(false);
  };

  const rejectAll = () => {
    const c = { analytics: false, ads: false };
    setConsent(c);
    saveConsent(c);
    setOpen(false);
  };

  const save = () => {
    saveConsent(consent);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-4 md:p-6">
        <div className="md:flex md:items-center md:justify-between gap-4">
          <div className="md:max-w-3xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">We value your privacy</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We use necessary cookies to make our site work. With your consent, we also use analytics and advertising cookies to improve your experience and fund our free tools.
              Read our <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a> and <a href="/cookie-policy" className="text-blue-600 dark:text-blue-400 underline">Cookie Policy</a>.
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <input type="checkbox" checked disabled className="accent-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Strictly necessary (always on)</span>
              </label>
              <label className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <input type="checkbox" checked={consent.analytics} onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })} className="accent-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Analytics</span>
              </label>
              <label className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <input type="checkbox" checked={consent.ads} onChange={(e) => setConsent({ ...consent, ads: e.target.checked })} className="accent-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Advertising</span>
              </label>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex-shrink-0 flex gap-2">
            <button onClick={rejectAll} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Reject all</button>
            <button onClick={save} className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">Save</button>
            <button onClick={acceptAll} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Accept all</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;

