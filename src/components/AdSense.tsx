import { useEffect, useState } from 'react';

// AdSense publisher id (matches public/ads.txt and AdSlot.tsx).
const AD_CLIENT = 'ca-pub-5398027060352897';

// Module-level guard so the script is injected at most once.
let adsenseLoaded = false;

function hasAdsConsent(): boolean {
  try {
    const raw = localStorage.getItem('jf_cookie_consent_v1');
    const parsed = raw ? (JSON.parse(raw) as { ads?: boolean }) : null;
    return !!parsed?.ads;
  } catch {
    return false;
  }
}

/**
 * Loads the Google AdSense script only after the user has consented to
 * advertising cookies. Mounted once at the app root. The actual ad units are
 * rendered by AdSlot, which also checks consent before pushing an ad.
 */
export function AdSense() {
  const [consent, setConsent] = useState<{ ads: boolean } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => setConsent((e as CustomEvent).detail);
    window.addEventListener('cookie-consent-changed', handler as EventListener);
    return () => window.removeEventListener('cookie-consent-changed', handler as EventListener);
  }, []);

  useEffect(() => {
    if (adsenseLoaded || !hasAdsConsent()) return;
    adsenseLoaded = true;

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }, [consent]);

  return null;
}

export default AdSense;
