// Builds the static HTML body that prerender.mjs bakes into each route.
//
// Why this exists: the app is client-rendered, so without it every prerendered
// file shipped an empty <div id="root"> — the page's actual words only appeared
// after JavaScript ran. Anything reading the raw HTML saw a blank page, which
// is exactly what a "low value content" review looks for.
//
// The markup here is a plain, readable rendering of the same data the React
// components use (src/data/*.ts is the single source of truth). It carries the
// app's Tailwind classes so the first paint is not jarring, and main.tsx uses
// createRoot().render() — not hydration — so React simply replaces it.

import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// The data files are standalone (no imports), so stripping the types is enough
// to import them here — no bundling, and no second copy of the content.
async function loadData(relPath) {
  const { code } = transformSync(readFileSync(join(root, relPath), 'utf8'), {
    loader: 'ts',
    format: 'esm',
    target: 'node18',
  });
  const file = join(mkdtempSync(join(tmpdir(), 'prerender-')), 'mod.mjs');
  writeFileSync(file, code);
  return import(pathToFileURL(file).href);
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SECTION = 'class="mt-10"';
const H2 = 'class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"';
const H3 = 'class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2"';
const P = 'class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"';
const PRE =
  'class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-gray-700 mb-4"';

const paragraphs = (text) =>
  String(text)
    .split(/\n{2,}|\n(?=[•\-])/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p ${P}>${esc(p)}</p>`)
    .join('');

function toolBody(tool, content) {
  const out = [];
  out.push(`<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(tool.label)}</h1>`);
  out.push(`<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(tool.desc)}</p>`);

  if (content) {
    out.push(`<section ${SECTION}><h2 ${H2}>${esc(content.intro.heading)}</h2>`);
    out.push(content.intro.paragraphs.map((p) => `<p ${P}>${esc(p)}</p>`).join(''));
    out.push('</section>');

    out.push(`<section ${SECTION}><h2 ${H2}>${esc(content.steps.heading)}</h2><ol class="list-decimal pl-6 space-y-2 ${'text-gray-600 dark:text-gray-400'}">`);
    out.push(content.steps.items.map((i) => `<li>${esc(i)}</li>`).join(''));
    out.push('</ol></section>');

    if (content.example) {
      const ex = content.example;
      out.push(`<section ${SECTION}><h2 ${H2}>${esc(ex.heading)}</h2><p ${P}>${esc(ex.description)}</p>`);
      out.push(`<h3 ${H3}>${esc(ex.inputLabel ?? 'Input')}</h3><pre ${PRE}><code>${esc(ex.input)}</code></pre>`);
      out.push(`<h3 ${H3}>${esc(ex.outputLabel ?? 'Output')}</h3><pre ${PRE}><code>${esc(ex.output)}</code></pre>`);
      out.push('</section>');
    }

    if (content.tips) {
      out.push(`<section ${SECTION}><h2 ${H2}>${esc(content.tips.heading)}</h2>`);
      out.push(content.tips.items.map((t) => `<h3 ${H3}>${esc(t.title)}</h3><p ${P}>${esc(t.text)}</p>`).join(''));
      out.push('</section>');
    }

    if (content.faqs?.length) {
      out.push(`<section ${SECTION}><h2 ${H2}>Frequently Asked Questions</h2>`);
      out.push(content.faqs.map((f) => `<h3 ${H3}>${esc(f.question)}</h3><p ${P}>${esc(f.answer)}</p>`).join(''));
      out.push('</section>');
    }
  }
  return out.join('');
}

function blogBody(article) {
  const out = [];
  out.push(`<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(article.title)}</h1>`);
  out.push(`<p class="text-xl text-gray-600 dark:text-gray-400 mb-2">${esc(article.excerpt)}</p>`);
  out.push(`<p class="text-sm text-gray-500 dark:text-gray-500 mb-8">${esc(article.category)} · ${esc(article.date)} · ${esc(article.readTime)}</p>`);

  for (const section of article.content?.sections ?? []) {
    out.push(`<section ${SECTION}><h2 ${H2}>${esc(section.title)}</h2>`);
    out.push(paragraphs(section.content));
    if (section.code) out.push(`<pre ${PRE}><code>${esc(section.code)}</code></pre>`);
    for (const sub of section.subsections ?? []) {
      out.push(`<h3 ${H3}>${esc(sub.title)}</h3>`);
      out.push(paragraphs(sub.content));
      if (sub.code) out.push(`<pre ${PRE}><code>${esc(sub.code)}</code></pre>`);
    }
    out.push('</section>');
  }
  return out.join('');
}

// Routes with no structured data still get their heading and lead paragraph,
// so no prerendered file ships a completely empty body.
function fallbackBody(route) {
  const heading = route.title.split('|')[0].trim();
  return (
    `<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(heading)}</h1>` +
    `<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(route.description)}</p>`
  );
}

function listBody(heading, lead, items) {
  const out = [`<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(heading)}</h1>`];
  if (lead) out.push(`<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(lead)}</p>`);
  for (const group of items) {
    if (group.heading) out.push(`<h2 ${H2}>${esc(group.heading)}</h2>`);
    if (group.blurb) out.push(`<p ${P}>${esc(group.blurb)}</p>`);
    out.push('<ul class="space-y-2 mb-8">');
    for (const entry of group.entries) {
      out.push(
        `<li><a class="font-medium text-blue-600 dark:text-blue-400" href="${esc(entry.href)}">${esc(entry.label)}</a>` +
          (entry.desc ? ` — <span class="text-gray-600 dark:text-gray-400">${esc(entry.desc)}</span>` : '') +
          '</li>',
      );
    }
    out.push('</ul>');
  }
  return out.join('');
}

function sampleBody(sample) {
  const notes = (sample.notes ?? []).map((n) => `<p ${P}>${esc(n)}</p>`).join('');
  const fields = (sample.fields ?? [])
    .map(
      (f) =>
        `<dt class="font-mono text-sm font-semibold text-gray-900 dark:text-white">${esc(f.name)}</dt>` +
        `<dd class="text-gray-600 dark:text-gray-400 mb-2">${esc(f.note)}</dd>`,
    )
    .join('');
  return (
    `<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(sample.title)}</h1>` +
    `<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(sample.description)}</p>` +
    `<section ${SECTION}><h2 ${H2}>What is this sample for?</h2><p ${P}>${esc(sample.useCase)}</p>${notes}` +
    `<p ${P}>Category: ${esc(sample.category)}</p></section>` +
    `<section ${SECTION}><h2 ${H2}>The JSON</h2><pre ${PRE}><code>${esc(sample.json)}</code></pre></section>` +
    (fields ? `<section ${SECTION}><h2 ${H2}>Fields in this dataset</h2><dl>${fields}</dl></section>` : '')
  );
}

function errorBody(err) {
  return (
    `<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(err.title)}</h1>` +
    `<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(err.description)}</p>` +
    `<section ${SECTION}><h2 ${H2}>The error</h2><pre ${PRE}><code>${esc(err.errorMessage)}</code></pre>` +
    `<p ${P}>Language or runtime: ${esc(err.language)}</p></section>` +
    `<section ${SECTION}><h2 ${H2}>What causes it</h2><p ${P}>${esc(err.cause)}</p></section>` +
    `<section ${SECTION}><h2 ${H2}>How to fix it</h2><p ${P}>${esc(err.fix)}</p>` +
    `<h3 ${H3}>Broken</h3><pre ${PRE}><code>${esc(err.badExample)}</code></pre>` +
    `<h3 ${H3}>Fixed</h3><pre ${PRE}><code>${esc(err.goodExample)}</code></pre></section>` +
    ((err.details ?? []).length
      ? `<section ${SECTION}><h2 ${H2}>Reading the message</h2>` +
        err.details.map((d) => `<p ${P}>${esc(d)}</p>`).join('') +
        '</section>'
      : '')
  );
}

function cheatBody(sheet) {
  const out = [
    `<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(sheet.title)}</h1>`,
    `<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(sheet.description)}</p>`,
  ];
  for (const section of sheet.sections ?? []) {
    out.push(`<section ${SECTION}><h2 ${H2}>${esc(section.heading)}</h2><dl class="space-y-3">`);
    for (const row of section.rows ?? []) {
      out.push(
        `<dt class="font-semibold text-gray-900 dark:text-white">${esc(row.term)}</dt>` +
          `<dd class="text-gray-600 dark:text-gray-400">${esc(row.meaning)}` +
          (row.example ? ` <code>${esc(row.example)}</code>` : '') +
          '</dd>',
      );
    }
    out.push('</dl></section>');
  }
  return out.join('');
}

function glossaryBody(terms) {
  const out = [
    '<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">JSON Glossary</h1>',
    `<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">Plain-English definitions of the JSON and data-format terms you will meet in API docs and error messages.</p>`,
    '<dl class="space-y-4">',
  ];
  for (const term of terms) {
    out.push(
      `<dt class="font-semibold text-gray-900 dark:text-white" id="${esc(term.slug)}">${esc(term.term)}</dt>` +
        `<dd class="text-gray-600 dark:text-gray-400">${esc(term.definition)}</dd>`,
    );
  }
  out.push('</dl>');
  return out.join('');
}

// Section headings come from the page components so the prerendered copy is in
// the same language as what renders — an English heading above Turkish body
// text would read as machine-generated filler.
const TR_LABELS = { whatIs: 'Nedir?', howTo: 'Nasıl Kullanılır?', faq: 'Sık Sorulan Sorular', hubTitle: 'Ücretsiz JSON Araçları (Türkçe)', hubTagline: 'JSON biçimlendirin, görüntüleyin ve dönüştürün — ücretsiz ve tamamen tarayıcınızda.' };

function localeToolBody(def, labels, whatIsHeading) {
  const out = [
    `<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${esc(def.h1)}</h1>`,
    `<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">${esc(def.tagline)}</p>`,
    `<section ${SECTION}><h2 ${H2}>${esc(whatIsHeading)}</h2>`,
    (def.intro ?? []).map((para) => `<p ${P}>${esc(para)}</p>`).join(''),
    '</section>',
    `<section ${SECTION}><h2 ${H2}>${esc(labels.howTo)}</h2><ol class="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">`,
    (def.steps ?? []).map((s) => `<li>${esc(s)}</li>`).join(''),
    '</ol></section>',
  ];
  if (def.faqs?.length) {
    out.push(`<section ${SECTION}><h2 ${H2}>${esc(labels.faq)}</h2>`);
    out.push(def.faqs.map((f) => `<h3 ${H3}>${esc(f.q)}</h3><p ${P}>${esc(f.a)}</p>`).join(''));
    out.push('</section>');
  }
  return out.join('');
}

export async function createBodyBuilder() {
  const [
    { TOOLS, FAMILY_LABELS },
    { toolContent },
    { blogArticles },
    { sampleDatasets, sampleBySlug },
    { jsonErrors, errorBySlug },
    { cheatSheets, cheatBySlug },
    { glossaryTerms },
    { trTools },
    { localeTools, UI_LABELS },
  ] = await Promise.all([
    loadData('src/data/toolsRegistry.ts'),
    loadData('src/data/toolContent.ts'),
    loadData('src/data/blogArticles.ts'),
    loadData('src/data/sampleData.ts'),
    loadData('src/data/jsonErrors.ts'),
    loadData('src/data/cheatsheets.ts'),
    loadData('src/data/glossary.ts'),
    loadData('src/data/trContent.ts'),
    loadData('src/data/localeContent.ts'),
  ]);

  const localeBySlug = new Map();
  for (const def of trTools) localeBySlug.set(`/tr/${def.slug}`, { def, labels: TR_LABELS });
  for (const def of localeTools) localeBySlug.set(`/${def.locale}/${def.slug}`, { def, labels: UI_LABELS[def.locale] });

  const localeHub = (locale, labels, defs) =>
    listBody(labels.hubTitle, labels.hubTagline, [
      { entries: defs.map((d) => ({ href: `/${locale}/${d.slug}`, label: d.h1, desc: d.tagline })) },
    ]);

  const toolsBySlug = new Map(TOOLS.map((t) => [t.slug, t]));
  const stats = { tool: 0, blog: 0, listing: 0, reference: 0, locale: 0, fallback: 0 };

  const toolGroups = Object.entries(FAMILY_LABELS).map(([family, meta]) => ({
    heading: meta.title,
    blurb: meta.blurb,
    entries: TOOLS.filter((t) => t.family === family).map((t) => ({
      href: `/${t.slug}`,
      label: t.label,
      desc: t.desc,
    })),
  }));

  // Hub pages: the listing *is* the content, so render the same entries the
  // page shows rather than leaving them as a bare heading.
  const LISTINGS = {
    '/': () => listBody('Free Online JSON Tools', 'Format, validate, convert and inspect JSON — plus everyday developer utilities. Everything runs in your browser.', toolGroups),
    '/tools': () => listBody('All Tools', 'Every tool on the site, grouped by what it does.', toolGroups),
    '/blog': () =>
      listBody('Blog', 'Guides and deep dives on JSON, data formats and the tools around them.', [
        {
          entries: Object.entries(blogArticles).map(([slug, a]) => ({
            href: `/blog/${slug}`,
            label: a.title,
            desc: a.excerpt,
          })),
        },
      ]),
    '/sample-json': () =>
      listBody('Sample JSON Data', 'Copy-paste-ready JSON datasets for testing, demos and documentation.', [
        { entries: sampleDatasets.map((s) => ({ href: `/sample-json/${s.slug}`, label: s.title, desc: s.description })) },
      ]),
    '/json-errors': () =>
      listBody('JSON Error Reference', 'What each common JSON parser error means, why it happens and how to fix it.', [
        { entries: jsonErrors.map((e) => ({ href: `/json-errors/${e.slug}`, label: e.title, desc: e.description })) },
      ]),
    '/cheatsheet': () =>
      listBody('Cheat Sheets', 'Quick reference tables for JSON and related formats.', [
        { entries: cheatSheets.map((c) => ({ href: `/cheatsheet/${c.slug}`, label: c.title, desc: c.description })) },
      ]),
    '/glossary': () => glossaryBody(glossaryTerms),
    '/tr': () => localeHub('tr', TR_LABELS, trTools),
    '/de': () => localeHub('de', UI_LABELS.de, localeTools.filter((d) => d.locale === 'de')),
    '/es': () => localeHub('es', UI_LABELS.es, localeTools.filter((d) => d.locale === 'es')),
  };

  const build = (route) => {
    const slug = route.path.replace(/^\//, '');
    let inner;

    if (LISTINGS[route.path]) {
      inner = LISTINGS[route.path]();
      stats.listing++;
    } else if (route.path.startsWith('/blog/')) {
      const article = blogArticles[route.path.slice('/blog/'.length)];
      if (article) {
        inner = blogBody(article);
        stats.blog++;
      }
    } else if (route.path.startsWith('/sample-json/')) {
      const sample = sampleBySlug[route.path.slice('/sample-json/'.length)];
      if (sample) {
        inner = sampleBody(sample);
        stats.reference++;
      }
    } else if (route.path.startsWith('/json-errors/')) {
      const err = errorBySlug[route.path.slice('/json-errors/'.length)];
      if (err) {
        inner = errorBody(err);
        stats.reference++;
      }
    } else if (route.path.startsWith('/cheatsheet/')) {
      const sheet = cheatBySlug[route.path.slice('/cheatsheet/'.length)];
      if (sheet) {
        inner = cheatBody(sheet);
        stats.reference++;
      }
    } else if (localeBySlug.has(route.path)) {
      const { def, labels } = localeBySlug.get(route.path);
      inner = localeToolBody(def, labels, labels === TR_LABELS ? `${def.h1} Nedir?` : labels.whatIs);
      stats.locale++;
    } else if (toolsBySlug.has(slug)) {
      inner = toolBody(toolsBySlug.get(slug), toolContent[slug]);
      stats.tool++;
    }

    if (!inner) {
      inner = fallbackBody(route);
      stats.fallback++;
    }
    return `<main class="max-w-6xl mx-auto px-4 py-8">${inner}</main>`;
  };

  return { build, stats };
}
