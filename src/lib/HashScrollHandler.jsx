import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router's client-side navigation (both <Link> and useNavigate()) skips
 * the browser's native "jump to #anchor" behaviour, since the click/navigate
 * never triggers a real document load. This restores it: whenever the hash
 * changes, scroll the matching element into view (CSS already sets
 * scroll-margin-top on every [id] to clear the sticky header).
 */
export default function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // Wait a frame so the target page has actually rendered its content first.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  return null;
}
