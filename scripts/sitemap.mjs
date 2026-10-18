// Generates dist/sitemap.xml from the routes actually prerendered, with an
// honest lastmod per URL.
//
// The file used to be maintained by hand in public/, which meant it drifted:
// three routes were missing and 14 URLs still claimed 2024-01-10 after their
// content had been rewritten. lastmod is a recrawl hint, so a wrong date is
// worse than useless.
//
// Stamping every URL with the build date would be just as dishonest — Google
// learns to ignore a sitemap where everything changes daily. Instead each
// route's rendered body is hashed and the hash recorded in sitemap-lastmod.json
// (committed): the date moves only when that page's content actually changes.

import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = join(root, 'scripts/sitemap-lastmod.json');

const today = () => new Date().toISOString().slice(0, 10);

// Priority and change frequency by route shape. These are hints, not promises,
// so they stay coarse: the tools earn traffic, the legal pages do not.
function rank(path) {
  if (path === '/') return { priority: '1.0', changefreq: 'daily' };
  if (path === '/tools' || path === '/blog') return { priority: '0.9', changefreq: 'weekly' };
  if (path.startsWith('/blog/')) return { priority: '0.7', changefreq: 'monthly' };
  if (/^\/(about|contact|terms|privacy-policy|cookie-policy|disclaimer|sitemap)$/.test(path)) {
    return { priority: '0.3', changefreq: 'yearly' };
  }
  if (/^\/(tr|de|es)(\/|$)/.test(path)) return { priority: '0.6', changefreq: 'monthly' };
  if (/^\/(sample-json|json-errors|cheatsheet)\//.test(path)) return { priority: '0.6', changefreq: 'monthly' };
  return { priority: '0.8', changefreq: 'weekly' };
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * @param site   canonical origin
 * @param routes [{ path }]
 * @param bodyOf (route) => string  rendered body, hashed to detect real change
 */
export function writeSitemap(site, routes, bodyOf, distDir) {
  const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
  const manifest = {};
  const stamp = today();
  let changed = 0;

  const entries = routes.map((route) => {
    const hash = createHash('sha1').update(bodyOf(route)).digest('hex').slice(0, 16);
    const before = previous[route.path];
    const lastmod = before && before.hash === hash ? before.lastmod : stamp;
    if (!before || before.hash !== hash) changed++;
    manifest[route.path] = { hash, lastmod };

    const { priority, changefreq } = rank(route.path);
    const loc = site + (route.path === '/' ? '/' : route.path);
    return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

  writeFileSync(join(distDir, 'sitemap.xml'), xml);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

  return { total: routes.length, changed };
}
