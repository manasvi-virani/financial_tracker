import { useState, useEffect } from 'react';
import { getHttpsWithAuth } from '../utils/api';

function useFetch<T  = unknown>(url: string,  dependancy?:unknown) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response : T = await getHttpsWithAuth(url);
        setData(response );
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dependancy]);

  return { data, loading, error };
}

export default useFetch;
