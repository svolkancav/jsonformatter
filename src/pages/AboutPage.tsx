import { Target, Users, Heart, Code2, Shield, Zap, Globe } from 'lucide-react';
import { SEO } from '../components/SEO';

export function AboutPage() {
  return (
    <>
      <SEO
        title="About JSON Formatter | Professional Developer Tools"
        description="Learn about JSON Formatter, the free online tool for formatting, validating, and converting JSON data. Built by developers for developers with Excel integration and C# class generation."
        keywords="about json formatter, developer tools, json tools, free online tools, json converter, excel to json"
        canonicalUrl="https://jsonformater.com/about"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-12 text-center">
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
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe that developers should have access to powerful, free tools that make their work easier and more efficient. 
                JSON Formatter was created to provide a comprehensive suite of JSON-related tools that are fast, secure, and easy to use. 
                Our mission is to eliminate the friction in JSON data processing and make these essential tools accessible to everyone.
              </p>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Who We Serve</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Our tools are designed for developers, data analysts, and anyone who works with JSON data:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  Frontend and backend developers
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  API developers and integrators
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  Data scientists and analysts
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  Students learning web development
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  QA engineers and testers
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  Technical writers and documentation teams
                </li>
              </ul>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    All processing happens in your browser. We never store or access your data.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast & Reliable</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Optimized for speed and performance with 99.9% uptime guarantee.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Always Free</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No subscriptions, no hidden costs, no registration required.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Tools</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">JSON Processing</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• JSON formatter and beautifier</li>
                    <li>• JSON validator with error detection</li>
                    <li>• JSON minifier for optimization</li>
                    <li>• Syntax highlighting and error reporting</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Conversion</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Excel to JSON converter</li>
                    <li>• JSON to Excel converter</li>
                    <li>• C# class generation from JSON</li>
                    <li>• TypeScript interface generation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Why Choose JSON Formatter?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Built for Developers</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Created by developers who understand the daily challenges of working with JSON data. 
                    Every feature is designed with real-world use cases in mind.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Learning Curve</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Intuitive interface that gets you started immediately. No tutorials or documentation needed - 
                    just paste your data and get results.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cross-Platform</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Works on any device with a modern web browser. No software installation required, 
                    whether you're on Windows, Mac, or Linux.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Regular Updates</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We continuously improve our tools based on user feedback and emerging technologies. 
                    New features and improvements are added regularly.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Started Today</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Join thousands of developers who trust JSON Formatter for their daily JSON processing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/json-formatter"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Try JSON Formatter
                </a>
                <a
                  href="/excel-to-json"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Convert Excel to JSON
                </a>
                <a
                  href="/json-to-excel"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Convert JSON to Excel
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
