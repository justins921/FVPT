import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

export function useContent(section) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${API_BASE}/api/content/${section}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load content');
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [section]);

  return { data, loading, error };
}

export function useAllContent() {
  const general = useContent('general');
  const home = useContent('home');
  const about = useContent('about');
  const services = useContent('services');
  const contact = useContent('contact');

  const loading =
    general.loading ||
    home.loading ||
    about.loading ||
    services.loading ||
    contact.loading;

  return {
    loading,
    general: general.data,
    home: home.data,
    about: about.data,
    services: services.data,
    contact: contact.data,
  };
}

export const API = API_BASE;
