import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
        <Zap className="w-4 h-4" />
        Fast, Free, and Reliable JSON Tools
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
        Professional JSON Formatter<br />
        <span className="text-blue-600 dark:text-blue-500">& C# Class Generator</span>
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
        Transform your JSON data instantly with our powerful formatting and validation tools.
        Generate production-ready C# classes in seconds. No registration required.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/tools"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
        >
          Try Tools Now
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          to="/tutorials"
          className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 transition-colors"
        >
          View Tutorials
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">500K+</div>
          <div className="text-gray-600 dark:text-gray-400">JSON Files Formatted</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">50K+</div>
          <div className="text-gray-600 dark:text-gray-400">C# Classes Generated</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">100%</div>
          <div className="text-gray-600 dark:text-gray-400">Free Forever</div>
        </div>
      </div>
    </div>
  );
}
