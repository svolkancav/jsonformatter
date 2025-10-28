import { Link, useLocation } from 'react-router-dom';

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs = segments.map((seg, idx) => {
    const path = '/' + segments.slice(0, idx + 1).join('/');
    const label = decodeURIComponent(seg).replace(/-/g, ' ');
    return { path, label: label.charAt(0).toUpperCase() + label.slice(1) };
  });

  if (crumbs.length === 0) return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 py-3 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            <span>/</span>
            {i < crumbs.length - 1 ? (
              <Link to={c.path} className="hover:underline">{c.label}</Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-200">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

