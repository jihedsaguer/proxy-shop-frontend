import { useState, useEffect } from 'react';
import type { Role } from '../../types';
import * as api from './api';

export const useRoles = () => {
  const [data, setData] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.fetchRoles();
      setData(res);
    } catch (e: any) {
      setError(e.message || 'Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refetch: fetch };
};
