interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const text = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
      <a
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        Twitter
      </a>
      <a
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
    </div>
  );
}

export default SocialShare;

