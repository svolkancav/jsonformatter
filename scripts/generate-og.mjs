// Generates the 1200x630 Open Graph card in public/.
//
// Run with `npm run generate:og` when the wording changes — the PNG is
// committed rather than built in CI on purpose: rendering SVG text needs a
// font on the build machine, and a missing font fails silently into a blank
// image rather than erroring.

import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-image.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="55%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="8" fill="url(#accent)"/>

  <text x="90" y="250" font-family="DejaVu Sans, Helvetica, Arial, sans-serif"
        font-size="86" font-weight="bold" fill="#ffffff">JSON Formatter</text>

  <text x="90" y="330" font-family="DejaVu Sans, Helvetica, Arial, sans-serif"
        font-size="38" fill="#94a3b8">Format, validate and convert JSON — free,</text>
  <text x="90" y="384" font-family="DejaVu Sans, Helvetica, Arial, sans-serif"
        font-size="38" fill="#94a3b8">in your browser, nothing uploaded.</text>

  <rect x="90" y="446" width="460" height="3" fill="url(#accent)"/>

  <text x="90" y="520" font-family="DejaVu Sans, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="bold" fill="#60a5fa">jsonformater.com</text>
  <text x="90" y="572" font-family="DejaVu Sans, Helvetica, Arial, sans-serif"
        font-size="27" fill="#64748b">36 developer tools · no sign-up</text>

  <g opacity="0.16" transform="translate(815, 150)">
    <text x="0" y="60" font-family="DejaVu Sans Mono, Courier New, monospace" font-size="46" fill="#60a5fa">{</text>
    <text x="40" y="130" font-family="DejaVu Sans Mono, Courier New, monospace" font-size="38" fill="#a5b4fc">"id": 1,</text>
    <text x="40" y="192" font-family="DejaVu Sans Mono, Courier New, monospace" font-size="38" fill="#a5b4fc">"ok": true</text>
    <text x="0" y="258" font-family="DejaVu Sans Mono, Courier New, monospace" font-size="46" fill="#60a5fa">}</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('wrote public/og-image.png (1200x630)');
