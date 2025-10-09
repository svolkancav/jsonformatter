import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { Blog } from './pages/Blog';
import { BlogArticle } from './pages/BlogArticle';
import { Tutorials } from './pages/Tutorials';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { JsonToCSharp } from './pages/tools/JsonToCSharp';
import { JsonToTypeScript } from './pages/tools/JsonToTypeScript';
import { JsonValidator } from './pages/tools/JsonValidator';

function App() {
  return (
    <Router>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/json-to-csharp" element={<JsonToCSharp />} />
            <Route path="/json-to-typescript" element={<JsonToTypeScript />} />
            <Route path="/json-validator" element={<JsonValidator />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
