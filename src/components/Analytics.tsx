import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

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
    if (!GA_ID) return;

    const raw = localStorage.getItem('jf_cookie_consent_v1');
    const parsed = raw ? JSON.parse(raw) as { analytics: boolean; ads: boolean } : null;
    const allowAnalytics = !!parsed?.analytics;

    if (!allowAnalytics) return;

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

