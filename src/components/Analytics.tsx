import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Falls back to the site's public GA id when no env override is set.
const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined) || 'G-0DBLYCS3KE';

// Module-level guard so GA is loaded at most once, even if consent changes.
let gaLoaded = false;

function loadScript(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

export function Analytics() {
  const [consent, setConsent] = useState<{ analytics: boolean; ads: boolean } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsent(detail);
    };
    window.addEventListener('cookie-consent-changed', handler as EventListener);
    return () => window.removeEventListener('cookie-consent-changed', handler as EventListener);
  }, []);

  useEffect(() => {
    if (!GA_ID || gaLoaded) return;

    let parsed: { analytics?: boolean } | null = null;
    try {
      const raw = localStorage.getItem('jf_cookie_consent_v1');
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }
    if (!parsed?.analytics) return;
    gaLoaded = true;

    // Load GA with IP anonymization
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments as unknown as never); }
    window.gtag = gtag as unknown as typeof window.gtag;
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true, cookie_flags: 'SameSite=Lax;Secure' });
  }, [consent]);

  return null;
}

export default Analytics;

