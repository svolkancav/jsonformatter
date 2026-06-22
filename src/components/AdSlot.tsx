import { useEffect, useRef, useState } from 'react';

// Your AdSense publisher id (matches the script in index.html and public/ads.txt).
const AD_CLIENT = 'ca-pub-5398027060352897';

/**
 * Maps each placement to its AdSense ad-unit slot id (the numeric
 * `data-ad-slot` value you get when you create a "Display ad" unit in the
 * AdSense dashboard).
 *
 * HOW TO GO LIVE:
 *   1. In AdSense > Ads > By ad unit, create a Display ad unit for a placement.
 *   2. Copy its slot id (e.g. "1234567890").
 *   3. Uncomment the matching line below and paste the id.
 *
 * Any placement left blank/commented automatically shows a dev placeholder
 * instead of a real ad, so nothing breaks before approval. You may reuse the
 * same slot id for multiple placements if you prefer fewer ad units.
 */
const AD_SLOTS: Record<string, string> = {
  // home_header: '',
  // home_in_content_1: '',
  // home_in_content_2: '',
  // blog_header: '',
  // blog_footer: '',
  // article_header: '',
  // article_footer: '',
  // json_to_toon_header: '',
  // json_to_toon_footer: '',
  // toon_to_json_header: '',
  // toon_to_json_footer: '',
  // json_to_toml_header: '',
  // json_to_toml_footer: '',
  // toml_to_json_header: '',
  // toml_to_json_footer: '',
};

type AdFormat = 'horizontal' | 'vertical' | 'rectangle' | 'responsive';

interface AdSlotProps {
  slotId: string; // stable id for placement (key into AD_SLOTS)
  format?: AdFormat;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

function hasAdsConsent(): boolean {
  try {
    const raw = localStorage.getItem('jf_cookie_consent_v1');
    const parsed = raw ? (JSON.parse(raw) as { ads?: boolean }) : null;
    return !!parsed?.ads;
  } catch {
    return false;
  }
}

function minHeight(format: AdFormat): number {
  if (format === 'horizontal') return 90;
  if (format === 'vertical') return 600;
  if (format === 'rectangle') return 280;
  return 250;
}

export function AdSlot({ slotId, format = 'responsive' }: AdSlotProps) {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  // Read consent once on mount (client-only SPA, so localStorage is available).
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    setConsent(hasAdsConsent());
  }, []);

  const adSlot = AD_SLOTS[slotId];
  const showRealAd = consent && !!adSlot;

  useEffect(() => {
    if (!showRealAd || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle not loaded yet or blocked by an ad blocker — ignore.
    }
  }, [showRealAd]);

  // No consent: render nothing (no placeholder, no ad).
  if (!consent) return null;

  // Consent given but no real slot id configured yet: show a dev placeholder.
  if (!adSlot) {
    return (
      <div className="my-4" aria-label="Advertisement">
        <div
          className="bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center"
          style={{ height: minHeight(format) }}
        >
          {`Ad placeholder: ${slotId}`}
        </div>
      </div>
    );
  }

  return (
    <div className="my-4" aria-label="Advertisement">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: minHeight(format) }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={format === 'responsive' ? 'auto' : format}
        data-full-width-responsive={format === 'responsive' ? 'true' : undefined}
      />
    </div>
  );
}

export default AdSlot;
