import { Shield, Eye, Lock, Database, Globe, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | JSON Formatter - Your Data is Safe"
        description="Learn how JSON Formatter protects your privacy. All data processing happens locally in your browser. No data collection, no tracking, no storage of your information."
        keywords="privacy policy, data protection, json formatter privacy, secure json tools, no data collection"
        canonicalUrl="https://jsonformater.com/privacy-policy"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your privacy is our priority. Learn how we protect your data.
            </p>
          </header>

          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Processing</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong>All data processing happens locally in your browser.</strong> When you use JSON Formatter, 
                your data never leaves your device. We don't have servers that process your JSON files, 
                Excel files, or any other data you upload or paste into our tools.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-300 mb-1">100% Client-Side Processing</h3>
                    <p className="text-green-800 dark:text-green-400 text-sm">
                      Your files and data are processed entirely in your browser using JavaScript. 
                      No data is transmitted to our servers or any third-party services.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Collection</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We do not collect, store, or have access to any of your personal data or files. 
                Here's what we don't collect:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Your JSON data or files
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Your Excel or CSV files
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Personal information or contact details
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  IP addresses or device identifiers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  Usage patterns or analytics data
                </li>
              </ul>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Tracking</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use Google Analytics to understand how our website is used, but this data is completely anonymous:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What We Track</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                    <li>• Page views and navigation patterns</li>
                    <li>• Browser type and version</li>
                    <li>• General geographic location (country level)</li>
                    <li>• Time spent on pages</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What We Don't Track</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                    <li>• Personal identification information</li>
                    <li>• Specific file contents or data</li>
                    <li>• Individual user behavior</li>
                    <li>• Cross-site tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use minimal third-party services to provide our tools:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Used for anonymous website analytics. No personal data is shared.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    You can opt-out using browser extensions or by disabling JavaScript.
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">CDN Services</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Static assets (CSS, JavaScript) are served from content delivery networks for faster loading.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    No personal data is processed by CDN services.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact & Support</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Email:</strong> privacy@jsonformater.com
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Response Time:</strong> We typically respond within 24-48 hours.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Your Rights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Control</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Since we don't collect your data, you have complete control over your information. 
                    Your data never leaves your device.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Account Required</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    You can use all our tools without creating an account or providing any personal information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Open Source</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Our code is open source, so you can verify our privacy claims and even run the tools locally.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Regular Updates</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This privacy policy is updated regularly to reflect our current practices and any changes.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Last Updated</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This privacy policy was last updated on January 10, 2025.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                We reserve the right to update this privacy policy at any time. 
                Changes will be posted on this page with an updated "Last Updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
