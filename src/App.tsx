import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { CookieConsent } from './components/CookieConsent';
import { Analytics } from './components/Analytics';
import { AdSense } from './components/AdSense';
import { Breadcrumbs } from './components/Breadcrumbs';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogArticle = lazy(() => import('./pages/BlogArticle').then(module => ({ default: module.BlogArticle })));
const Tutorials = lazy(() => import('./pages/Tutorials').then(module => ({ default: module.Tutorials })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const JsonToCSharp = lazy(() => import('./pages/tools/JsonToCSharp').then(module => ({ default: module.JsonToCSharp })));
const JsonToTypeScript = lazy(() => import('./pages/tools/JsonToTypeScript').then(module => ({ default: module.JsonToTypeScript })));
const JsonToGo = lazy(() => import('./pages/tools/JsonToGo').then(module => ({ default: module.JsonToGo })));
const JsonToPython = lazy(() => import('./pages/tools/JsonToPython').then(module => ({ default: module.JsonToPython })));
const JsonToJava = lazy(() => import('./pages/tools/JsonToJava').then(module => ({ default: module.JsonToJava })));
const ToolsHub = lazy(() => import('./pages/ToolsHub').then(module => ({ default: module.ToolsHub })));
const SampleJsonHub = lazy(() => import('./pages/SampleJson').then(module => ({ default: module.SampleJsonHub })));
const SampleJsonDetail = lazy(() => import('./pages/SampleJson').then(module => ({ default: module.SampleJsonDetail })));
const JsonErrorsHub = lazy(() => import('./pages/JsonErrors').then(module => ({ default: module.JsonErrorsHub })));
const JsonErrorDetail = lazy(() => import('./pages/JsonErrors').then(module => ({ default: module.JsonErrorDetail })));
const TrHub = lazy(() => import('./pages/tr/TrHub').then(module => ({ default: module.TrHub })));
const TrJsonFormatlayici = lazy(() => import('./pages/tr/TrJsonFormatlayici').then(module => ({ default: module.TrJsonFormatlayici })));
const TrJsonGoruntuleyici = lazy(() => import('./pages/tr/TrJsonGoruntuleyici').then(module => ({ default: module.TrJsonGoruntuleyici })));
const TrJsonDogrulayici = lazy(() => import('./pages/tr/TrJsonDogrulayici').then(module => ({ default: module.TrJsonDogrulayici })));
const TrJsonExcel = lazy(() => import('./pages/tr/TrJsonExcel').then(module => ({ default: module.TrJsonExcel })));
const TrExcelJson = lazy(() => import('./pages/tr/TrExcelJson').then(module => ({ default: module.TrExcelJson })));
const TrJsonCsv = lazy(() => import('./pages/tr/TrJsonCsv').then(module => ({ default: module.TrJsonCsv })));
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
const JsonToToon = lazy(() => import('./pages/JsonToToon').then(module => ({ default: module.JsonToToonPage })));
const ToonToJson = lazy(() => import('./pages/ToonToJson').then(module => ({ default: module.ToonToJsonPage })));
const JsonToCsv = lazy(() => import('./pages/JsonToCsv').then(module => ({ default: module.JsonToCsvPage })));
const CsvToJson = lazy(() => import('./pages/CsvToJson').then(module => ({ default: module.CsvToJsonPage })));
const JsonToYaml = lazy(() => import('./pages/JsonToYaml').then(module => ({ default: module.JsonToYamlPage })));
const YamlToJson = lazy(() => import('./pages/YamlToJson').then(module => ({ default: module.YamlToJsonPage })));
const JsonToXml = lazy(() => import('./pages/JsonToXml').then(module => ({ default: module.JsonToXmlPage })));
const XmlToJson = lazy(() => import('./pages/XmlToJson').then(module => ({ default: module.XmlToJsonPage })));
const JwtDecoder = lazy(() => import('./pages/JwtDecoder').then(module => ({ default: module.JwtDecoderPage })));
const Base64Tool = lazy(() => import('./pages/Base64Tool').then(module => ({ default: module.Base64ToolPage })));
const UuidGenerator = lazy(() => import('./pages/UuidGenerator').then(module => ({ default: module.UuidGeneratorPage })));
const TimestampConverter = lazy(() => import('./pages/TimestampConverter').then(module => ({ default: module.TimestampConverterPage })));
const JsonDiff = lazy(() => import('./pages/JsonDiff').then(module => ({ default: module.JsonDiffPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicyPage })));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy').then(module => ({ default: module.CookiePolicy })));
const Disclaimer = lazy(() => import('./pages/Disclaimer').then(module => ({ default: module.Disclaimer })));
const SitemapHtml = lazy(() => import('./pages/SitemapHtml').then(module => ({ default: module.SitemapHtml })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const CharacterCounter = lazy(() => import('./pages/tools/CharacterCounter').then(module => ({ default: module.CharacterCounter })));

function App() {
  return (
    <Router>
      <SEO />
      <Analytics />
      <AdSense />
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
                  <Route path="/tools" element={<ToolsHub />} />
                  
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
                  <Route path="/json-to-toon" element={<JsonToToon />} />
                  <Route path="/toon-to-json" element={<ToonToJson />} />
                  <Route path="/json-to-csv" element={<JsonToCsv />} />
                  <Route path="/csv-to-json" element={<CsvToJson />} />
                  <Route path="/json-to-yaml" element={<JsonToYaml />} />
                  <Route path="/yaml-to-json" element={<YamlToJson />} />
                  <Route path="/json-to-xml" element={<JsonToXml />} />
                  <Route path="/xml-to-json" element={<XmlToJson />} />
                  <Route path="/jwt-decoder" element={<JwtDecoder />} />
                  <Route path="/base64" element={<Base64Tool />} />
                  <Route path="/uuid-generator" element={<UuidGenerator />} />
                  <Route path="/timestamp-converter" element={<TimestampConverter />} />
                  <Route path="/json-diff" element={<JsonDiff />} />
                  
                  {/* Text tools */}
                  <Route path="/character-counter" element={<CharacterCounter />} />

                  {/* Legacy tool routes */}
                  <Route path="/json-to-csharp" element={<JsonToCSharp />} />
                  <Route path="/json-to-typescript" element={<JsonToTypeScript />} />
                  <Route path="/json-to-go" element={<JsonToGo />} />
                  <Route path="/json-to-python" element={<JsonToPython />} />
                  <Route path="/json-to-java" element={<JsonToJava />} />
                  <Route path="/sample-json" element={<SampleJsonHub />} />
                  <Route path="/sample-json/:slug" element={<SampleJsonDetail />} />
                  <Route path="/json-errors" element={<JsonErrorsHub />} />
                  <Route path="/json-errors/:slug" element={<JsonErrorDetail />} />
                  <Route path="/tr" element={<TrHub />} />
                  <Route path="/tr/json-formatlayici" element={<TrJsonFormatlayici />} />
                  <Route path="/tr/json-goruntuleyici" element={<TrJsonGoruntuleyici />} />
                  <Route path="/tr/json-dogrulayici" element={<TrJsonDogrulayici />} />
                  <Route path="/tr/json-excel-cevirici" element={<TrJsonExcel />} />
                  <Route path="/tr/excel-json-cevirici" element={<TrExcelJson />} />
                  <Route path="/tr/json-csv-cevirici" element={<TrJsonCsv />} />
                  <Route path="/json-validator" element={<JsonValidator />} />
                  
                  {/* Other pages */}
                  <Route path="/blob/:shortId" element={<BlobView />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogArticle />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
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
