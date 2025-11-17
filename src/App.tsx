import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { CookieConsent } from './components/CookieConsent';
import { Analytics } from './components/Analytics';
import { Breadcrumbs } from './components/Breadcrumbs';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogArticle = lazy(() => import('./pages/BlogArticle').then(module => ({ default: module.BlogArticle })));
const Tutorials = lazy(() => import('./pages/Tutorials').then(module => ({ default: module.Tutorials })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const JsonToCSharp = lazy(() => import('./pages/tools/JsonToCSharp').then(module => ({ default: module.JsonToCSharp })));
const JsonToTypeScript = lazy(() => import('./pages/tools/JsonToTypeScript').then(module => ({ default: module.JsonToTypeScript })));
const JsonValidator = lazy(() => import('./pages/tools/JsonValidator').then(module => ({ default: module.JsonValidator })));
const BlobView = lazy(() => import('./pages/BlobView').then(module => ({ default: module.BlobView })));
const Sitemap = lazy(() => import('./pages/Sitemap').then(module => ({ default: module.Sitemap })));

// New dedicated pages
const JsonFormatter = lazy(() => import('./pages/JsonFormatter').then(module => ({ default: module.JsonFormatterPage })));
const JsonViewer = lazy(() => import('./pages/JsonViewer').then(module => ({ default: module.JsonViewerPage })));
const JsonBlobViewer = lazy(() => import('./pages/JsonBlobViewer').then(module => ({ default: module.JsonBlobViewerPage })));
const JsonToExcel = lazy(() => import('./pages/JsonToExcel').then(module => ({ default: module.JsonToExcelPage })));
const ExcelToJson = lazy(() => import('./pages/ExcelToJson').then(module => ({ default: module.ExcelToJsonPage })));
const ExcelToXml = lazy(() => import('./pages/ExcelToXml').then(module => ({ default: module.ExcelToXmlPage })));
const ExcelToCsv = lazy(() => import('./pages/ExcelToCsv').then(module => ({ default: module.ExcelToCsvPage })));
const JsonToToml = lazy(() => import('./pages/JsonToToml').then(module => ({ default: module.JsonToTomlPage })));
const TomlToJson = lazy(() => import('./pages/TomlToJson').then(module => ({ default: module.TomlToJsonPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicyPage })));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy').then(module => ({ default: module.CookiePolicy })));
const Disclaimer = lazy(() => import('./pages/Disclaimer').then(module => ({ default: module.Disclaimer })));
const SitemapHtml = lazy(() => import('./pages/SitemapHtml').then(module => ({ default: module.SitemapHtml })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
  return (
    <Router>
      <SEO />
      <Analytics />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
        <Navigation />
        <Breadcrumbs />
        <main className="flex-1">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tools" element={<Navigate to="/json-formatter" replace />} />
                  
                  {/* Dedicated tool pages */}
                  <Route path="/json-formatter" element={<JsonFormatter />} />
                  <Route path="/json-viewer" element={<JsonViewer />} />
                  <Route path="/json-blob-viewer" element={<JsonBlobViewer />} />
                  <Route path="/json-to-excel" element={<JsonToExcel />} />
                  <Route path="/excel-to-json" element={<ExcelToJson />} />
                  <Route path="/excel-to-xml" element={<ExcelToXml />} />
                  <Route path="/excel-to-csv" element={<ExcelToCsv />} />
                  <Route path="/json-to-toml" element={<JsonToToml />} />
                  <Route path="/toml-to-json" element={<TomlToJson />} />
                  
                  {/* Legacy tool routes */}
                  <Route path="/json-to-csharp" element={<JsonToCSharp />} />
                  <Route path="/json-to-typescript" element={<JsonToTypeScript />} />
                  <Route path="/json-validator" element={<JsonValidator />} />
                  
                  {/* Other pages */}
                  <Route path="/blob/:shortId" element={<BlobView />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogArticle />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/sitemap" element={<SitemapHtml />} />
                  <Route path="/sitemap.xml" element={<Sitemap />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </Router>
  );
}

export default App;
