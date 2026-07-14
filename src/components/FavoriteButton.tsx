import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { isFavorite, toggleFavorite } from '../utils/favorites';

interface FavoriteButtonProps {
  slug: string;
  /** Stop click from bubbling to a parent link/card. */
  stopPropagation?: boolean;
  className?: string;
}

/** Star toggle that pins/unpins a tool (localStorage-backed, reactive). */
export function FavoriteButton({ slug, stopPropagation, className = '' }: FavoriteButtonProps) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const sync = () => setFav(isFavorite(slug));
    sync();
    window.addEventListener('jf-favorites-changed', sync);
    return () => window.removeEventListener('jf-favorites-changed', sync);
  }, [slug]);

  return (
    <button
      type="button"
      onClick={(e) => {
        if (stopPropagation) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggleFavorite(slug);
      }}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      title={fav ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-1 rounded transition-colors ${
        fav ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'
      } ${className}`}
    >
      <Star className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} />
    </button>
  );
}

export default FavoriteButton;
