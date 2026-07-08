// Product Hunt "Featured" badge.
// Fill these two from your live launch page (Product Hunt > your post > Embed / badges):
//   PH_POST_ID  — the numeric post id (e.g. "123456")
//   PH_POST_URL — the full URL to the launch (e.g. "https://www.producthunt.com/posts/your-slug")
const PH_POST_ID = '';
const PH_POST_URL = '';

const ALT = 'JSON Blob Viewer & Tools - Every JSON tool in your browser | Product Hunt';

export function ProductHuntBadge() {
  if (!PH_POST_ID || !PH_POST_URL) return null;

  const href = `${PH_POST_URL}?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge`;
  const img = (theme: 'light' | 'dark') =>
    `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${PH_POST_ID}&theme=${theme}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Featured on Product Hunt">
      {/* Light badge in light mode, dark badge in dark mode */}
      <img src={img('light')} alt={ALT} width={200} height={43} className="block dark:hidden" loading="lazy" />
      <img src={img('dark')} alt={ALT} width={200} height={43} className="hidden dark:block" loading="lazy" />
    </a>
  );
}

export default ProductHuntBadge;
