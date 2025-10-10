import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Tools = lazy(() => import('./pages/Tools').then(module => ({ default: module.Tools })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogArticle = lazy(() => import('./pages/BlogArticle').then(module => ({ default: module.BlogArticle })));
const Tutorials = lazy(() => import('./pages/Tutorials').then(module => ({ default: module.Tutorials })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const JsonToCSharp = lazy(() => import('./pages/tools/JsonToCSharp').then(module => ({ default: module.JsonToCSharp })));
const JsonToTypeScript = lazy(() => import('./pages/tools/JsonToTypeScript').then(module => ({ default: module.JsonToTypeScript })));
const JsonValidator = lazy(() => import('./pages/tools/JsonValidator').then(module => ({ default: module.JsonValidator })));
const BlobView = lazy(() => import('./pages/BlobView').then(module => ({ default: module.BlobView })));

function App() {
  return (
    <Router>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/json-to-csharp" element={<JsonToCSharp />} />
              <Route path="/json-to-typescript" element={<JsonToTypeScript />} />
              <Route path="/json-validator" element={<JsonValidator />} />
              <Route path="/blob/:shortId" element={<BlobView />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogArticle />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
