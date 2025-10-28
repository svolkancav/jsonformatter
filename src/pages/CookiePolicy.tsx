import { SEO } from '../components/SEO';

export function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy | JSON Formatter"
        description="Learn how JSON Formatter uses cookies and how you can control your cookie preferences in compliance with GDPR/CCPA."
        keywords="cookie policy, GDPR, CCPA, privacy, cookie consent"
        canonicalUrl="https://jsonformater.com/cookie-policy"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: October 28, 2025</p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cookies are small text files stored on your device that help websites function and improve your experience. We use cookies to remember preferences and, with your consent, to measure usage to improve our tools.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Strictly Necessary</strong>: Required for basic site functionality (e.g., theme, consent preferences). These cannot be disabled.</li>
              <li><strong>Analytics (Optional)</strong>: Help us understand how the site is used so we can improve it. Loaded only if you consent.</li>
              <li><strong>Advertising (Optional)</strong>: Used by Google AdSense to show relevant ads. Loaded only if you consent.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Managing Your Preferences</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              You can manage your cookie preferences at any time using the cookie banner or your browser settings. Disabling optional cookies will not affect access to the core tools.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-cookie-consent')); }} className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">Review Cookie Preferences</a>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you consent, we may load Google Analytics and Google AdSense, which set cookies according to their policies. Please review Google’s Privacy & Terms for details. We anonymize IP addresses in Analytics when enabled.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">Questions about this policy? Email privacy@jsonformater.com or use our <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">contact form</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default CookiePolicy;

