import { request } from '../../lib/api-client';
import type { AuthResponse } from '../../types';

export const login = (email: string, password: string): Promise<AuthResponse> =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (data: { email: string; password: string }): Promise<AuthResponse> =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const me = () => request('/auth/me');
