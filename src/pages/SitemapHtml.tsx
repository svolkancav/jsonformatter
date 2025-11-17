import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function SitemapHtml() {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/json-formatter', label: 'JSON Formatter' },
    { path: '/json-viewer', label: 'JSON Viewer' },
    { path: '/json-blob-viewer', label: 'JSON Blob Viewer' },
    { path: '/json-to-excel', label: 'JSON to Excel' },
    { path: '/excel-to-json', label: 'Excel to JSON' },
    { path: '/excel-to-xml', label: 'Excel to XML' },
    { path: '/excel-to-csv', label: 'Excel to CSV' },
    { path: '/json-to-toml', label: 'JSON to TOML' },
    { path: '/toml-to-json', label: 'TOML to JSON' },
    { path: '/json-to-csharp', label: 'JSON to C#' },
    { path: '/json-to-typescript', label: 'JSON to TypeScript' },
    { path: '/json-validator', label: 'JSON Validator' },
    { path: '/blog', label: 'Blog' },
    { path: '/tutorials', label: 'Tutorials' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy (Legacy)' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/cookie-policy', label: 'Cookie Policy' },
    { path: '/disclaimer', label: 'Disclaimer' }
  ];

  return (
    <>
      <SEO
        title="HTML Sitemap | JSON Formatter"
        description="Browse all pages and tools on JSON Formatter using our HTML sitemap for users."
        keywords="sitemap, site map, pages, navigation"
        canonicalUrl="https://jsonformater.com/sitemap"
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">HTML Sitemap</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {links.map(l => (
              <li key={l.path}>
                <Link to={l.path} className="text-blue-600 dark:text-blue-400 hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SitemapHtml;

