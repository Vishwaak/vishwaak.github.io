import { useState, useEffect } from 'react';
import { getPoems, Poem } from '@/lib/notion';

export function usePoems() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPoems() {
      try {
        setLoading(true);
        const data = await getPoems();
        setPoems(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch poems');
        console.error('Error fetching poems:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPoems();
  }, []);

  return { poems, loading, error };
}
