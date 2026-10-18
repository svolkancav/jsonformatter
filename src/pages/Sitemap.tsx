import { useEffect } from 'react';

/**
 * Client-side route for /sitemap.xml. A direct request never reaches this —
 * nginx serves the generated dist/sitemap.xml file — so this only catches an
 * in-app navigation and hands it to the real file.
 *
 * It used to build a second sitemap inline from a hand-written list of URLs,
 * assign it to an unused Response and redirect anyway. That copy was already
 * out of date; the sitemap is now generated at build time from the routes that
 * were actually prerendered (scripts/sitemap.mjs).
 */
export function Sitemap() {
  useEffect(() => {
    window.location.href = '/sitemap.xml';
  }, []);

  return null;
}

export default Sitemap;
