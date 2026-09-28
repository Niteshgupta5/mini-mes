import { useCallback, useEffect, useState } from 'react';

import { getApiError } from '../api/client';

export function useApi<T>(request: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await request();

      setData(result);
    } catch (error) {
      setError(getApiError(error));
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    void run();
  }, [run]);

  return {
    data,
    loading,
    error,
    refetch: run,
  };
}
