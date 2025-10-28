import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <>
      <SEO title="Page Not Found (404) | JSON Formatter" description="The page you are looking for does not exist. Find the right tool or visit the homepage." keywords="404, not found" />
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Sorry, we couldn't find that page.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">Go to Homepage</Link>
          <Link to="/sitemap" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">View HTML Sitemap</Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;

