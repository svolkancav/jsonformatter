import { Target, Users, Heart, Code2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export function About() {
  return (
    <>
      <SEO
        title="About JSON Formatter | Professional Developer Tools"
        description="Learn about JSON Formatter, the free online tool for formatting, validating, and converting JSON data. Built by developers for developers with Excel integration and C# class generation."
        keywords="about json formatter, developer tools, json tools, free online tools, json converter"
        canonicalUrl="https://jsonformater.com/about"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About JSON Formatter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional tools for developers, built by developers
          </p>
        </header>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We created JSON Formatter to solve a common problem developers face every day: working with messy, unformatted JSON data. Whether you're debugging an API response, validating configuration files, or generating C# classes from JSON schemas, our tools make your workflow faster and more efficient.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our mission is to provide free, high-quality development tools that respect your privacy and help you write better code. We believe essential developer tools should be accessible to everyone, without paywalls or feature restrictions.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Who We Serve</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            JSON Formatter is designed for developers of all skill levels:
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Backend Developers</strong> working with REST APIs and microservices who need to quickly format and validate JSON responses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Frontend Developers</strong> integrating with APIs and needing to understand complex data structures</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>.NET Developers</strong> who frequently need to generate C# model classes from JSON data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Students and Learners</strong> exploring web development and API integration</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>DevOps Engineers</strong> working with configuration files and deployment manifests</span>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why We Built This</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            As professional developers, we found ourselves constantly switching between multiple tools and services to format JSON, validate syntax, and generate C# classes. Many existing tools had issues:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-4 list-disc list-inside">
            <li>Required creating accounts or signing in</li>
            <li>Sent data to remote servers, raising privacy concerns</li>
            <li>Limited free tiers with premium features locked behind paywalls</li>
            <li>Cluttered interfaces with excessive ads</li>
            <li>Poor mobile experience</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We built JSON Formatter to address all these pain points. All processing happens in your browser, your data never leaves your device, and every feature is completely free. No accounts, no tracking, no limits.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Commitment</h2>
          </div>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Privacy First:</strong> We never collect, store, or transmit your JSON data. Everything runs locally in your browser.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Always Free:</strong> All features are free and will remain free. No premium tiers, no feature restrictions.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Continuous Improvement:</strong> We regularly update our tools based on user feedback and emerging best practices.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Open to Feedback:</strong> We welcome suggestions, bug reports, and feature requests from our community.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have questions, suggestions, or just want to say hi? We'd love to hear from you! Connect with us through our contact page or social media.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://github.com/svolkancav"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 transition-colors"
            >
              GitHub
            </a>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
