import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdSlot } from '../../components/AdSlot';
import { trTools } from '../../data/trContent';

export function TrHub() {
  return (
    <>
      <SEO
        title="Ücretsiz Online JSON Araçları (Türkçe) | JSON Formatlayıcı, Çevirici"
        description="Ücretsiz Türkçe JSON araçları: JSON formatlayıcı, görüntüleyici, doğrulayıcı ve Excel/CSV çeviricileri. Her şey tarayıcınızda, güvenle çalışır."
        keywords="json araçları türkçe, json formatlayıcı, json çevirici, json doğrulama, ücretsiz json aracı"
        canonicalUrl="https://jsonformater.com/tr"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ücretsiz Türkçe JSON Araçları
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            JSON formatlama, görüntüleme, doğrulama ve dönüştürme araçları — hepsi ücretsiz ve tamamen tarayıcınızda çalışır.
          </p>
        </header>

        <AdSlot slotId="tr_hub_header" format="horizontal" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {trTools.map((t) => (
            <Link
              key={t.key}
              to={`/tr/${t.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t.h1}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{t.tagline}</p>
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Aracı aç <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <AdSlot slotId="tr_hub_footer" />
      </div>
    </>
  );
}
