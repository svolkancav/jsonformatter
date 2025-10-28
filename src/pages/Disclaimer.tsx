import { SEO } from '../components/SEO';

export function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer | JSON Formatter"
        description="Disclaimer for JSON Formatter: information accuracy, no warranties, and limitation of liability."
        keywords="disclaimer, no warranty, liability, information accuracy"
        canonicalUrl="https://jsonformater.com/disclaimer"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: October 28, 2025</p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Professional Advice</h2>
            <p className="text-gray-600 dark:text-gray-400">The content and tools provided on JSON Formatter are for informational and educational purposes only and are provided “as is,” without warranties of any kind. They should not be relied upon as professional advice.</p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Warranties</h2>
            <p className="text-gray-600 dark:text-gray-400">We do not warrant that the website will be uninterrupted, error-free, secure, or free of harmful components. Use of the site is at your own risk.</p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400">To the maximum extent permitted by law, JSON Formatter and its operators are not liable for any damages arising from your use of the site or reliance on any content. This includes direct, indirect, incidental, consequential, or punitive damages.</p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">External Links</h2>
            <p className="text-gray-600 dark:text-gray-400">Our site may contain links to third-party websites. We are not responsible for their content, policies, or practices.</p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">For questions about this disclaimer, contact legal@jsonformater.com or use our <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">contact page</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Disclaimer;

