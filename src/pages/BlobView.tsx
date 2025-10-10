import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, Download, Share2, Clock, Eye, CheckCircle, Code2, AlertCircle } from 'lucide-react';
import { getJsonBlob, getRecentBlobs, type JsonBlob } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { ShareModal } from '../components/ShareModal';

export function BlobView() {
  const { shortId } = useParams<{ shortId: string }>();
  const [blob, setBlob] = useState<JsonBlob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);
  const [relatedBlobs, setRelatedBlobs] = useState<JsonBlob[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (shortId) {
      loadBlob(shortId);
      loadRelatedBlobs();
    }
  }, [shortId]);

  const loadBlob = async (id: string) => {
    try {
      setLoading(true);
      const data = await getJsonBlob(id);
      setBlob(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blob');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedBlobs = async () => {
    try {
      const blobs = await getRecentBlobs(5);
      setRelatedBlobs(blobs);
    } catch {
      // Ignore errors for related blobs
    }
  };

  const handleCopy = async () => {
    if (!blob) return;
    const text = formatted
      ? JSON.stringify(blob.content, null, 2)
      : JSON.stringify(blob.content);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!blob) return;
    const text = formatted
      ? JSON.stringify(blob.content, null, 2)
      : JSON.stringify(blob.content);
    const blobObj = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blobObj);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blob.title || blob.short_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getJsonSize = () => {
    if (!blob) return '0 KB';
    const size = new Blob([JSON.stringify(blob.content)]).size;
    return size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`;
  };

  const getJsonLines = () => {
    if (!blob) return 0;
    return JSON.stringify(blob.content, null, 2).split('\n').length;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !blob) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Blob Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'This blob doesn\'t exist or has expired.'}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const jsonText = formatted
    ? JSON.stringify(blob.content, null, 2)
    : JSON.stringify(blob.content);

  return (
    <>
      <SEO
        title={`${blob.title || 'JSON Blob'} - JSON Formatter`}
        description={`View and share JSON blob: ${JSON.stringify(blob.content).substring(0, 150)}...`}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {blob.title || 'Untitled JSON Blob'}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {getTimeAgo(blob.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {blob.views} views
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormatted(!formatted)}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    {formatted ? 'Minify' : 'Format'}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Again
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100 max-h-[600px]">
                {jsonText}
              </pre>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                to="/json-to-csharp"
                state={{ json: jsonText }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Generate C# Classes
              </Link>
              <Link
                to="/json-to-typescript"
                state={{ json: jsonText }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Generate TypeScript
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Created</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(blob.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Views</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{blob.views}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Size</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{getJsonSize()}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Lines</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{getJsonLines()}</p>
                </div>
                {blob.expires_at && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Expires</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(blob.expires_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {relatedBlobs.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Blobs</h3>
                <div className="space-y-3">
                  {relatedBlobs.slice(0, 5).map((relatedBlob) => (
                    <Link
                      key={relatedBlob.short_id}
                      to={`/blob/${relatedBlob.short_id}`}
                      className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {relatedBlob.title || 'Untitled'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {relatedBlob.views} views • {getTimeAgo(relatedBlob.created_at)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          jsonContent={jsonText}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
