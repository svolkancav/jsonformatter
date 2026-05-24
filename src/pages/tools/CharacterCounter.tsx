import { useState, useMemo } from 'react';
import { Type, Hash, AlignLeft, FileText, BarChart2, Trash2, Copy, Check } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function CharacterCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const sentences = text === '' ? 0 : (text.match(/[.!?]+/g) || []).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim() !== '').length;
    const avgWordLength = words === 0 ? 0 : (charsNoSpaces / words).toFixed(1);
    const readingTime = words === 0 ? 0 : Math.ceil(words / 200);

    const freq: Record<string, number> = {};
    for (const ch of text.toLowerCase()) {
      if (/[a-z]/.test(ch)) freq[ch] = (freq[ch] || 0) + 1;
    }
    const topChars = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { chars, charsNoSpaces, words, lines, sentences, paragraphs, avgWordLength, readingTime, topChars };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statCards = [
    { label: 'Karakterler', value: stats.chars, icon: Type, color: 'blue' },
    { label: 'Boşluksuz', value: stats.charsNoSpaces, icon: Hash, color: 'purple' },
    { label: 'Kelimeler', value: stats.words, icon: AlignLeft, color: 'green' },
    { label: 'Satırlar', value: stats.lines, icon: FileText, color: 'orange' },
    { label: 'Cümleler', value: stats.sentences, icon: BarChart2, color: 'red' },
    { label: 'Paragraflar', value: stats.paragraphs, icon: FileText, color: 'teal' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800',
  };

  return (
    <>
      <SEO
        title="Karakter Sayacı - Online Ücretsiz Metin Analizi"
        description="Ücretsiz online karakter sayacı. Karakter, kelime, satır, cümle sayısını ve daha fazlasını anında hesaplayın."
        keywords="karakter sayacı, kelime sayacı, metin analizi, character counter, word counter"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Karakter Sayacı
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Metninizi yapıştırın veya yazın — karakter, kelime, satır ve daha fazlası anında hesaplanır.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Metin Girişi
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!text}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Kopyalandı' : 'Kopyala'}
              </button>
              <button
                onClick={() => setText('')}
                disabled={!text}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Temizle
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-56 px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none transition-colors"
            placeholder="Metninizi buraya yazın veya yapıştırın..."
          />
          <p className="mt-1 text-right text-xs text-gray-400 dark:text-gray-500">
            {stats.chars} / ∞ karakter
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className={`rounded-xl border p-4 flex flex-col items-center gap-2 ${colorMap[color]}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs font-medium text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Extra stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ort. Kelime Uzunluğu</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgWordLength}</p>
            <p className="text-xs text-gray-400 mt-1">karakter / kelime</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tahmini Okuma Süresi</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.readingTime}</p>
            <p className="text-xs text-gray-400 mt-1">dakika (200 kelime/dk)</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">En Sık Harfler</p>
            {stats.topChars.length === 0 ? (
              <p className="text-sm text-gray-400">—</p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {stats.topChars.map(([ch, count]) => (
                  <span
                    key={ch}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm font-mono font-semibold text-gray-800 dark:text-gray-200"
                  >
                    {ch}
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">×{count}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Neden Karakter Sayacı Kullanmalısınız?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sosyal medya paylaşımları, SEO meta açıklamaları, SMS mesajları veya akademik yazılar için
            karakter ve kelime sınırlarını takip etmek kritik önem taşır. Bu araç metninizi anında analiz ederek
            içerik üretim sürecinizi hızlandırır.
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Twitter/X: 280 karakter sınırı</li>
            <li>Meta açıklaması: 150-160 karakter önerilir</li>
            <li>SMS: 160 karakter / mesaj</li>
            <li>LinkedIn özeti: 2.000 karakter sınırı</li>
          </ul>
        </article>
      </div>
    </>
  );
}
