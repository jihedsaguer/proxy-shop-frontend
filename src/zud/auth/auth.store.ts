import { create } from 'zustand';
import type { AuthResponse, User } from '../../types';
import type { AuthState } from './types';
import { request } from '../../lib/api-client';

export const useAuthStore = create<AuthState>((
  set,
  get,
) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitialized: false,

  login: async (email: string, password: string) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    set({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      user: res.user,
      isAuthenticated: true,
      isInitialized: true,
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  },

  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitialized: true,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  refresh: async () => {
    const state = get();
    if (!state.refreshToken) {
      throw new Error('no refresh token');
    }

    const url = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '') + '/auth/refresh';
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: state.refreshToken }),
    });

    if (!resp.ok) {
      throw new Error('refresh failed');
    }

    const res = (await resp.json()) as AuthResponse;
    set({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      user: res.user,
      isAuthenticated: true,
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  },

  initializeFromStorage: async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
      });
      try {
        await get().refresh();
        const me = (await request('/auth/me')) as User;
        set({ user: me, isAuthenticated: true });
      } catch {
        get().logout();
      }
    }

    set({ isInitialized: true });
  },
}));
