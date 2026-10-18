// Post-build prerender: bakes a unique <title>, meta description/keywords,
// canonical, Open Graph / Twitter tags, a JSON-LD block AND the page's actual
// text into the raw HTML for every route, writing dist/<route>/index.html.
//
// Why: the app is a client-rendered SPA, so without this every URL ships the
// SAME homepage <title>/meta in its raw HTML — Google sees ~identical pages and
// none can rank. Worse, the body was an empty <div id="root">, so the words
// only existed after JavaScript ran and anything reading the raw HTML saw a
// blank page. This gives each route correct metadata *and* real content in the
// initial HTML. Body markup is built in prerenderContent.mjs.
//
// Pure Node string work — no headless browser, no runtime deps. Safe: if the
// web server doesn't serve these per-route files, behaviour is unchanged.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { SITE, staticRoutes, buildAlternates } from './routesSeo.mjs';
import { createBodyBuilder } from './prerenderContent.mjs';
import { writeSitemap } from './sitemap.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const templatePath = join(distDir, 'index.html');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Replace the content="" of a <meta name|property="key" ...>, or insert it
// before </head> if the tag is absent.
function setMeta(html, attr, key, content) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (re.test(html)) {
    return html.replace(re, `$1${esc(content)}$2`);
  }
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(content)}" />\n  </head>`);
}

function setLink(html, rel, href) {
  const re = new RegExp(`(<link rel="${rel}" href=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${esc(href)}$2`);
  return html.replace('</head>', `    <link rel="${rel}" href="${esc(href)}" />\n  </head>`);
}

function buildJsonLd(route) {
  const isArticle = route.path.startsWith('/blog/');
  const page = {
    '@context': 'https://schema.org',
    '@type': isArticle ? 'Article' : 'WebPage',
    name: route.title,
    headline: route.title,
    description: route.description,
    url: SITE + route.path,
    isPartOf: { '@type': 'WebSite', name: 'JSON Formatter', url: SITE },
  };
  return `<script type="application/ld+json">${JSON.stringify(page)}</script>`;
}

// Section names for breadcrumb trails. Breadcrumbs are one of the few
// structured-data types Google still renders in results — FAQ and HowTo rich
// results were withdrawn for general sites in 2023 — so this is worth emitting
// in the raw HTML rather than only client-side.
const SEGMENT_LABELS = {
  blog: 'Blog',
  tools: 'Tools',
  'sample-json': 'Sample JSON',
  'json-errors': 'JSON Errors',
  cheatsheet: 'Cheat Sheets',
  glossary: 'Glossary',
  tutorials: 'Tutorials',
  tr: 'Türkçe',
  de: 'Deutsch',
  es: 'Español',
};

function buildBreadcrumbs(route) {
  if (route.path === '/') return null;

  const segments = route.path.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: SITE + '/' }];

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const url = SITE + '/' + segments.slice(0, index + 1).join('/');
    // The leaf is named after the page itself; the SEO title carries a
    // marketing suffix after a pipe that does not belong in a breadcrumb.
    const name = isLast ? route.title.split('|')[0].trim() : SEGMENT_LABELS[segment];
    if (!name) return;
    items.push({ name, url });
  });

  if (items.length < 2) return null;

  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  })}</script>`;
}

function renderRoute(template, route, body, alternates) {
  // Trailing slash for home to match the client SEO component and sitemap.xml.
  const url = SITE + route.path;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  html = setMeta(html, 'name', 'description', route.description);
  if (route.keywords) html = setMeta(html, 'name', 'keywords', route.keywords);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);
  html = setLink(html, 'canonical', url);
  // Translations of the same page point at each other, so each language
  // version can rank on its own instead of competing as a duplicate.
  if (alternates) {
    const tags = alternates
      .map((a) => `    <link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
      .join('\n');
    html = html.replace('</head>', `${tags}\n  </head>`);
  }
  // Inject JSON-LD just before </head>.
  html = html.replace('</head>', `    ${buildJsonLd(route)}\n  </head>`);
  const crumbs = buildBreadcrumbs(route);
  if (crumbs) html = html.replace('</head>', `    ${crumbs}\n  </head>`);
  // Fill the mount point. React replaces this wholesale on load (main.tsx uses
  // createRoot().render(), not hydrateRoot), so no markup match is required.
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}

function writeRoute(template, route, body, alternates) {
  const html = renderRoute(template, route, body, alternates);
  const outDir = route.path === '/' ? distDir : join(distDir, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
}

// Read a quoted field value (single- or double-quoted, with escapes) by name.
function matchField(text, name) {
  const re = new RegExp(`${name}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`);
  const m = text.match(re);
  return m ? m[2].replace(/\\(['"\\])/g, '$1') : null;
}

// Parse top-level blog articles from the data file so new posts are prerendered
// automatically without editing routesSeo.mjs. Robust to quote style: for each
// entry we read only the header (before `content:`) so section titles inside
// content are never mistaken for the article title.
function parseBlogRoutes() {
  const src = readFileSync(join(root, 'src/data/blogArticles.ts'), 'utf8');
  const entryRe = /^ {2}'([a-z0-9-]+)':\s*\{/gm;
  const starts = [];
  let m;
  while ((m = entryRe.exec(src)) !== null) starts.push({ slug: m[1], index: m.index });

  const routes = [];
  for (let i = 0; i < starts.length; i++) {
    const block = src.slice(starts[i].index, i + 1 < starts.length ? starts[i + 1].index : src.length);
    const header = block.split(/\n {4}content:/)[0];
    const title = matchField(header, 'title');
    if (!title) continue;
    const excerpt = matchField(header, 'excerpt');
    routes.push({
      path: `/blog/${starts[i].slug}`,
      title: `${title} | JSON Formatter Blog`,
      description: excerpt || title,
      keywords: '',
    });
  }
  return routes;
}

// --- run ---
if (!existsSync(templatePath)) {
  console.error('prerender: dist/index.html not found — run "vite build" first.');
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');
const blogRoutes = parseBlogRoutes();
const allRoutes = [...staticRoutes, ...blogRoutes];

const { build, stats } = await createBodyBuilder();
const alternates = buildAlternates(SITE);

const bodies = new Map(allRoutes.map((route) => [route.path, build(route)]));

for (const route of allRoutes) writeRoute(template, route, bodies.get(route.path), alternates.get(route.path));

// Built from the routes that were actually written, so the sitemap cannot fall
// out of step with what exists.
const sitemap = writeSitemap(SITE, allRoutes, (route) => bodies.get(route.path) ?? '', distDir);

console.log(`prerender: wrote ${allRoutes.length} routes (${staticRoutes.length} static + ${blogRoutes.length} blog)`);
console.log(`prerender: bodies — ${stats.tool} tool, ${stats.blog} blog, ${stats.listing} listing, ${stats.reference} reference, ${stats.locale} locale, ${stats.page} page, ${stats.fallback} title-only`);
console.log(`prerender: hreflang on ${allRoutes.filter((r) => alternates.has(r.path)).length} routes`);
console.log(`sitemap: ${sitemap.total} urls, ${sitemap.changed} with a new lastmod`);
