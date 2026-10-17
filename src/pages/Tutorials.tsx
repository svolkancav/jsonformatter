import { BookOpen, Code, Layers, Zap } from 'lucide-react';
import {
  tutorials,
  TUTORIALS_CTA_BODY,
  TUTORIALS_CTA_HEADING,
  TUTORIALS_HEADING,
  TUTORIALS_TAGLINE,
  type TutorialIcon,
} from '../data/tutorials';

const ICONS: Record<TutorialIcon, typeof BookOpen> = { BookOpen, Code, Layers, Zap };

export function Tutorials() {

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {TUTORIALS_HEADING}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {TUTORIALS_TAGLINE}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tutorials.map((tutorial, index) => {
          const Icon = ICONS[tutorial.iconKey];
          return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                    {tutorial.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                    {tutorial.duration}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {tutorial.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {tutorial.description}
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  What you'll learn:
                </h3>
                <ul className="space-y-2">
                  {tutorial.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {TUTORIALS_CTA_HEADING}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {TUTORIALS_CTA_BODY}
        </p>
        <a
          href="/tools"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Try Tools Now
        </a>
      </div>
    </div>
  );
}
