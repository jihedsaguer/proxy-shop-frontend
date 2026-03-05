import { useState, useEffect } from 'react';
import type { Permission } from '../../types';
import * as api from './api';

export const usePermissions = () => {
  const [data, setData] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.fetchPermissions();
      setData(res);
    } catch (e: any) {
      setError(e.message || 'Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refetch: fetch };
};
